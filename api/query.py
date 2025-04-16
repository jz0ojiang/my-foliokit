from http.server import BaseHTTPRequestHandler
import json
from typing import Dict, Any, List
import os
import redis
from datetime import timedelta
import traceback

# 将 service 模块的代码直接导入
from .service import get_relevant_content, stream_openai_response

# 配置 Redis 连接
REDIS_URL = os.getenv('REDIS_URL', 'redis://localhost:6379/0')
REDIS_PASSWORD = os.getenv('REDIS_PASSWORD', None)

# 测试 Redis 连接
try:
    redis_client = redis.from_url(
        REDIS_URL,
        password=REDIS_PASSWORD,
        decode_responses=True  # 自动解码响应
    )
    redis_client.ping()
    print("✅ Redis 连接成功")
except Exception as e:
    print(f"❌ Redis 连接失败: {str(e)}")
    raise

def validate_request(data: Dict[str, Any]) -> tuple[bool, str]:
    """验证请求参数"""
    if not data:
        return False, "请求体不能为空"
    
    required_fields = ['query', 'language', 'use_ai']
    for field in required_fields:
        if field not in data:
            return False, f"缺少必要字段: {field}"
    
    if not isinstance(data['query'], str) or not data['query'].strip():
        return False, "查询内容不能为空"
    
    if not isinstance(data['language'], str) or not data['language'].strip():
        return False, "语言不能为空"
    
    if not isinstance(data['use_ai'], bool):
        return False, "use_ai 必须是布尔值"
    
    return True, ""

def get_rate_limit_key(endpoint: str) -> str:
    """获取限流键"""
    return f"rate_limit:{endpoint}"

def build_prompt(query: str, content: str, language: str) -> str:
    """构建提示词"""
    if language == 'zh':
        return """<msg_json>
{
    "user_message": "{query}",
    "message_info": "{content}",
    "requirements": "
    1. 回答要简洁，突出关键信息
    2. 涉及具体项目时说明技术栈和功能
    3. 比较项目时分析异同点
    4. 以用户问题为主
    5. 语料库提供的内容如果模糊不清，你可以拒绝回答或根据你的理解回答"
}
</msg_json>""".format(query=query, content=content)
    else:
        return """<msg_json>
{
    "user_message": "{query}",
    "message_info": "{content}",
    "requirements": "
    1. Be concise, highlight key points
    2. Detail tech stack and features for specific projects
    3. Compare similarities and differences when needed
    4. Prioritize user's question
    5. If the content provided by the corpus is unclear, you can refuse to answer or answer based on your understanding"
}
</msg_json>""".format(query=query, content=content)

def format_search_results(results: List[Dict], language: str) -> str:
    """格式化搜索结果"""
    if not results:
        return "未找到相关项目信息。" if language == 'zh' else "No relevant project information found."
    
    formatted = []
    for project in results:
        name = project.get('name', '')
        description = project.get('description', '')
        tags = project.get('tags', [])
        
        if language == 'zh':
            formatted.append(f"项目名称：{name}\n描述：{description}\n标签：{', '.join(tags)}\n")
        else:
            formatted.append(f"Project: {name}\nDescription: {description}\nTags: {', '.join(tags)}\n")
    
    return "\n".join(formatted)

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """处理 OPTIONS 请求"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_POST(self):
        """处理 POST 请求"""
        try:
            # 检查路径
            if self.path != '/api/query':
                self.send_response(404)
                self.end_headers()
                return
            
            # 读取请求体
            content_length = int(self.headers['Content-Length'])
            post_data = self.rfile.read(content_length)
            data = json.loads(post_data)
            
            # 验证请求
            is_valid, error_message = validate_request(data)
            if not is_valid:
                self.send_response(400)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': error_message}).encode())
                return
            
            # 检查速率限制
            rate_key = get_rate_limit_key("query")
            current = redis_client.get(rate_key)
            if current and int(current) >= 10:  # 每分钟10次限制
                self.send_response(429)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': '请求过于频繁，请稍后再试'}).encode())
                return
            
            # 设置响应头
            self.send_response(200)
            self.send_header('Content-Type', 'text/event-stream')
            self.send_header('Cache-Control', 'no-cache')
            self.send_header('Connection', 'keep-alive')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # 获取相关内容
            error, results, conversation_history = get_relevant_content(
                data['language'],
                data['query'],
                data.get('search_all', False),
                data.get('conversation_history'),
                data.get('project_name'),
                data.get('from_source')
            )
            
            if error:
                self.wfile.write(f"data: {json.dumps({'error': error})}\n\n".encode())
                return
            
            # 格式化内容
            content = format_search_results(results, data['language'])
            
            # 构建提示词
            prompt = build_prompt(data['query'], content, data['language'])
            
            # 获取系统提示词
            system_prompt = "你是一个专业的项目助手，请根据提供的项目信息回答用户的问题。"
            
            # 流式响应
            for chunk in stream_openai_response(prompt, system_prompt, conversation_history):
                self.wfile.write(f"data: {json.dumps({'text': chunk})}\n\n".encode())
                self.wfile.flush()
            
            # 更新速率限制
            redis_client.setex(rate_key, timedelta(minutes=1), 1)
            
        except Exception as e:
            print(f"处理请求时出错: {str(e)}")
            traceback.print_exc()
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode()) 