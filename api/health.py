from http.server import BaseHTTPRequestHandler
import json
import os
import redis
from datetime import timedelta

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

def get_rate_limit_key(endpoint: str) -> str:
    """获取限流键"""
    return f"rate_limit:{endpoint}"

class handler(BaseHTTPRequestHandler):
    def do_OPTIONS(self):
        """处理 OPTIONS 请求"""
        self.send_response(200)
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        self.end_headers()
    
    def do_GET(self):
        """处理 GET 请求"""
        try:
            # 检查路径
            if self.path != '/api/health':
                self.send_response(404)
                self.end_headers()
                return
            
            # 检查速率限制
            rate_key = get_rate_limit_key("health")
            current = redis_client.get(rate_key)
            if current and int(current) >= 100:  # 每分钟100次限制
                self.send_response(429)
                self.send_header('Content-Type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({'error': '健康检查请求过于频繁'}).encode())
                return
            
            # 设置响应头
            self.send_response(200)
            self.send_header('Content-Type', 'application/json')
            self.send_header('Access-Control-Allow-Origin', '*')
            self.end_headers()
            
            # 构建健康检查响应
            response = {
                'status': 'ok',
                'version': '1.0.0',
                'services': {
                    'redis': 'ok',
                    'openai': 'ok' if os.getenv('OPENAI_API_KEY') else 'not configured'
                }
            }
            
            # 发送响应
            self.wfile.write(json.dumps(response).encode())
            
            # 更新速率限制
            redis_client.setex(rate_key, timedelta(minutes=1), 1)
            
        except Exception as e:
            print(f"处理健康检查请求时出错: {str(e)}")
            self.send_response(500)
            self.send_header('Content-Type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({'error': str(e)}).encode()) 