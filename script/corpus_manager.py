import os
import json
import yaml
import markdown
from pathlib import Path
from datetime import date, datetime
from typing import List, Dict, Optional, Any
from bs4 import BeautifulSoup
import logging

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

class CustomJSONEncoder(json.JSONEncoder):
    def default(self, obj):
        if isinstance(obj, (date, datetime)):
            return obj.isoformat()
        return super().default(obj)

class CorpusManager:
    def __init__(self, keep_frontmatter_fields: Optional[List[str]] = None):
        """
        初始化 CorpusManager
        
        Args:
            keep_frontmatter_fields: 需要保留的 frontmatter 字段列表，如果为 None 则保留所有字段
        """
        self.keep_frontmatter_fields = keep_frontmatter_fields

    def _extract_frontmatter(self, content: str) -> tuple[Optional[Dict], str]:
        """
        从 Markdown 内容中提取 frontmatter
        
        Args:
            content: Markdown 文件内容
            
        Returns:
            tuple: (frontmatter字典, 正文内容)
        """
        if not content.startswith('---'):
            return None, content
        
        parts = content.split('---', 2)
        if len(parts) < 3:
            return None, content
        
        frontmatter_str = parts[1].strip()
        markdown_content = parts[2].strip()
        
        try:
            frontmatter = yaml.safe_load(frontmatter_str)
            if self.keep_frontmatter_fields and frontmatter:
                frontmatter = {
                    k: v for k, v in frontmatter.items() 
                    if k in self.keep_frontmatter_fields
                }
            return frontmatter, markdown_content
        except yaml.YAMLError as e:
            logger.error(f"解析 frontmatter 失败: {e}")
            return None, content

    def _clean_html(self, html_content: str) -> str:
        """
        清理 HTML 内容，只保留纯文本
        
        Args:
            html_content: HTML 内容
            
        Returns:
            str: 清理后的纯文本
        """
        soup = BeautifulSoup(html_content, 'html.parser')
        return soup.get_text(separator=' ', strip=True)

    def _format_document(self, title: str, frontmatter: Optional[Dict], content: str) -> str:
        """
        格式化文档内容，将 frontmatter 和正文组合成一段文本
        
        Args:
            title: 文档标题
            frontmatter: frontmatter 字典
            content: 正文内容
            
        Returns:
            str: 格式化后的文本
        """
        parts = [f"Title: {title}"]
        
        if frontmatter:
            for key, value in frontmatter.items():
                if isinstance(value, list):
                    value = ', '.join(str(v) for v in value)
                parts.append(f"{key.capitalize()}: {value}")
        
        parts.append("\n" + content)
        return "\n".join(parts)

    def _process_markdown_file(self, file_path: Path) -> Optional[Dict[str, Any]]:
        """
        处理单个 Markdown 文件
        
        Args:
            file_path: Markdown 文件路径
            
        Returns:
            Optional[Dict]: 处理后的文档数据，如果处理失败则返回 None
        """
        try:
            with open(file_path, 'r', encoding='utf-8') as file:
                content = file.read()
            
            frontmatter, markdown_content = self._extract_frontmatter(content)
            html_content = markdown.markdown(markdown_content)
            clean_text = self._clean_html(html_content)
            
            formatted_content = self._format_document(
                frontmatter.get('title', file_path.stem),
                frontmatter,
                clean_text
            )
            
            return {
                "title": frontmatter.get('title', file_path.stem),
                "meta": frontmatter if frontmatter else {},
                "content": formatted_content
            }
        except Exception as e:
            logger.error(f"处理文件 {file_path} 时出错: {e}")
            return None

    def generate_corpus(self, content_dir: str, output_dir: str, lang: str) -> None:
        """
        生成语料库
        
        Args:
            content_dir: Markdown 文件目录
            output_dir: 输出目录
            lang: 语言代码
        """
        if not os.path.exists(output_dir):
            os.makedirs(output_dir)

        corpus_data = []
        for file in Path(content_dir).rglob('*.md'):
            doc_data = self._process_markdown_file(file)
            if doc_data:
                corpus_data.append(doc_data)
                logger.info(f"已处理文件: {file}")

        corpus_file = os.path.join(output_dir, f"{lang}_corpus.json")
        with open(corpus_file, 'w', encoding='utf-8') as output_file:
            json.dump(corpus_data, output_file, ensure_ascii=False, indent=4, cls=CustomJSONEncoder)
        
        logger.info(f"\n{lang} 语料库已生成: {corpus_file}")
        logger.info(f"共处理 {len(corpus_data)} 个文档")

    def load_corpus(self, json_path: str) -> List[Dict]:
        """
        加载语料库
        
        Args:
            json_path: JSON 文件路径
            
        Returns:
            List[Dict]: 语料库数据列表
        """
        try:
            with open(json_path, 'r', encoding='utf-8') as file:
                return json.load(file)
        except Exception as e:
            logger.error(f"加载语料库失败: {e}")
            return []

if __name__ == "__main__":
    # 测试代码
    script_dir = os.path.dirname(os.path.abspath(__file__))
    project_root = os.path.dirname(script_dir)
    
    # 示例：只保留 tags 和 date 字段
    manager = CorpusManager(keep_frontmatter_fields=['tags', 'date'])
    
    langs = ['en', 'zh']
    for lang in langs:
        markdown_dir = os.path.join(project_root, "content", lang)
        output_dir = os.path.join(project_root, "corpus")
        manager.generate_corpus(markdown_dir, output_dir, lang) 