import os
from typing import Dict, List
import json

def build_prompt(query: str, content: str, language: str) -> str:
    """构建提示"""
    if language == 'zh':
        return f"""基于以下信息回答问题：

{content}

问题：{query}

要求：
1. 回答要简洁，突出关键信息
2. 涉及具体项目时说明技术栈和功能
3. 比较项目时分析异同点
4. 以用户问题为主"""
    else:
        return f"""Answer based on:

{content}

Question: {query}

Requirements:
1. Be concise, highlight key points
2. Detail tech stack and features for specific projects
3. Compare similarities and differences when needed
4. Prioritize user's question"""
    
def get_system_prompt(language: str) -> str:
    """获取系统提示词"""
    if language == 'zh':
        return """你是一个专业的项目助手，负责回答用户关于项目的问题。请遵循以下规则：

1. 根据提供的项目信息回答问题，如果信息不足，请说明原因
2. 保持回答专业、准确、简洁
3. 使用中文回答
4. 如果用户询问技术细节，请尽量详细解释
5. 如果遇到不确定的问题，请说明原因并提供可能的解决方案"""
    else:
        return """You are a professional project assistant responsible for answering user questions about projects. Please follow these rules:

1. Answer questions based on the provided project information. If the information is insufficient, explain why
2. Keep answers professional, accurate, and concise
3. Use English to answer
4. If users ask about technical details, try to explain in detail
5. If you encounter uncertain questions, explain the reason and provide possible solutions"""

def format_project_info(project: Dict) -> str:
    """格式化项目信息"""
    name = project.get('name', '')
    description = project.get('description', '')
    tags = project.get('tags', [])
    tech_stack = project.get('tech_stack', [])
    features = project.get('features', [])
    
    formatted = f"项目名称：{name}\n"
    formatted += f"描述：{description}\n"
    if tags:
        formatted += f"标签：{', '.join(tags)}\n"
    if tech_stack:
        formatted += f"技术栈：{', '.join(tech_stack)}\n"
    if features:
        formatted += "功能特点：\n"
        for feature in features:
            formatted += f"- {feature}\n"
    
    return formatted

def load_projects() -> List[Dict]:
    """加载项目数据"""
    try:
        with open('projects.json', 'r', encoding='utf-8') as f:
            return json.load(f)
    except Exception as e:
        print(f"加载项目数据失败: {str(e)}")
        return []

def save_projects(projects: List[Dict]):
    """保存项目数据"""
    try:
        with open('projects.json', 'w', encoding='utf-8') as f:
            json.dump(projects, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"保存项目数据失败: {str(e)}")

def validate_project_data(project: Dict) -> tuple[bool, str]:
    """验证项目数据"""
    required_fields = ['name', 'description']
    for field in required_fields:
        if field not in project:
            return False, f"缺少必要字段: {field}"
    
    if not isinstance(project['name'], str) or not project['name'].strip():
        return False, "项目名称不能为空"
    
    if not isinstance(project['description'], str) or not project['description'].strip():
        return False, "项目描述不能为空"
    
    return True, ""
