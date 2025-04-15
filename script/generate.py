import os
import json
import yaml
import markdown
from pathlib import Path
from datetime import date, datetime

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (date, datetime)):
            return obj.isoformat()
        return super().default(obj)

def extract_frontmatter(content):
    """从 Markdown 内容中提取 frontmatter"""
    if not content.startswith('---'):
        return None, content
    
    # 分割 frontmatter 和内容
    parts = content.split('---', 2)
    if len(parts) < 3:
        return None, content
    
    frontmatter_str = parts[1].strip()
    markdown_content = parts[2].strip()
    
    try:
        # 解析 YAML frontmatter
        frontmatter = yaml.safe_load(frontmatter_str)
        return frontmatter, markdown_content
    except yaml.YAMLError:
        return None, content

# 读取 markdown 文件并解析为文本，保留 frontmatter 作为元数据
def markdown_to_text(md_file_path):
    with open(md_file_path, 'r', encoding='utf-8') as file:
        content = file.read()
        
        # 提取 frontmatter 和内容
        frontmatter, markdown_content = extract_frontmatter(content)
        
        # 将 markdown 转换为 HTML
        html = markdown.markdown(markdown_content)
        return frontmatter, html

# 生成语言版本的语料库
def generate_corpus(markdown_dir, output_dir, lang):
    if not os.path.exists(output_dir):
        os.makedirs(output_dir)

    corpus_data = []
    for file in Path(markdown_dir).rglob('*.md'):
        file_name = file.stem  # 使用文件名作为 ID
        frontmatter, content = markdown_to_text(file)
        
        # 创建每篇文档的语料库条目
        corpus_data.append({
            "title": file_name,
            "meta": frontmatter if frontmatter else {},  # 添加元数据
            "content": content,
        })
        
        print(f"已处理文件: {file}")

    # 保存为 JSON 格式的语料库文件
    corpus_file = os.path.join(output_dir, f"{lang}_corpus.json")
    with open(corpus_file, 'w', encoding='utf-8') as output_file:
        json.dump(corpus_data, output_file, ensure_ascii=False, indent=4, cls=CustomJSONEncoder)
    
    print(f"\n{lang} 语料库已生成: {corpus_file}")
    print(f"共处理 {len(corpus_data)} 个文档")

if __name__ == "__main__":
    # 获取当前脚本所在目录的父目录
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    langs = ['en', 'zh']  # 支持的语言
    for lang in langs:
        markdown_dir = os.path.join(project_root, "content", lang)  # 使用绝对路径
        output_dir = os.path.join(project_root, "api", "output", "corpus")  # 使用绝对路径
        generate_corpus(markdown_dir, output_dir, lang)
