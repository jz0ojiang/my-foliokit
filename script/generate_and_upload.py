import os
import sys
import json
import logging
import requests
from pathlib import Path
from typing import List, Dict, Optional
from dotenv import load_dotenv
from corpus_manager import CorpusManager

# 强制从项目根目录加载 .env
dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
load_dotenv(dotenv_path)

# 配置日志
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# 配置常量
DEFAULT_CONTENT_DIR = "content"
DEFAULT_OUTPUT_DIR = "corpus"
DEFAULT_BACKEND_URL = os.getenv("BACKEND_URL", "http://localhost:5000")
DEFAULT_API_TOKEN = os.getenv("ALLOWED_UPLOAD_TOKEN")

class CorpusUploader:
    def __init__(
        self,
        content_dir: str = DEFAULT_CONTENT_DIR,
        output_dir: str = DEFAULT_OUTPUT_DIR,
        backend_url: str = DEFAULT_BACKEND_URL,
        api_token: str = DEFAULT_API_TOKEN
    ):
        """
        初始化上传器
        
        Args:
            content_dir: 内容目录
            output_dir: 输出目录
            backend_url: 后端 API 地址
            api_token: API 认证 token
        """
        self.content_dir = content_dir
        self.output_dir = output_dir
        self.backend_url = backend_url
        self.api_token = api_token
        self.manager = CorpusManager(keep_frontmatter_fields=['tags', 'date', 'title'])

    def _get_language_dirs(self) -> List[str]:
        """
        获取所有语言目录
        
        Returns:
            List[str]: 语言代码列表
        """
        content_path = Path(self.content_dir)
        if not content_path.exists():
            logger.error(f"内容目录不存在: {self.content_dir}")
            return []

        # 获取所有子目录作为语言目录
        lang_dirs = [d.name for d in content_path.iterdir() if d.is_dir()]
        if not lang_dirs:
            logger.warning(f"未找到任何语言目录: {self.content_dir}")
        
        return lang_dirs

    def _upload_corpus(self, langs: Optional[List[str]] = None) -> bool:
        """
        上传语料库文件
        
        Args:
            langs: 要上传的语言列表，如果为 None 则上传所有语言
            
        Returns:
            bool: 是否上传成功
        """
        if not self.api_token:
            logger.error("❌ ALLOWED_UPLOAD_TOKEN not found in .env")
            return False

        if langs is None:
            langs = self._get_language_dirs()
            if not langs:
                langs = ["zh", "en"]  # 默认支持语言列表

        url = f"{self.backend_url}/api/upload"
        headers = {"Authorization": f"Bearer {self.api_token}"}
        files = []

        for lang in langs:
            file_path = os.path.join(self.output_dir, f"{lang}_corpus.json")
            if not os.path.exists(file_path):
                logger.warning(f"⚠️ 未找到文件: {file_path}，跳过")
                continue
            files.append(("file", open(file_path, "rb")))

        if not files:
            logger.error("❌ 没有要上传的语料文件")
            return False

        logger.info(f"📤 正在上传 {len(files)} 个语料文件到 {url}...")
        try:
            res = requests.post(url, headers=headers, files=files)
            logger.info(f"✅ 状态码: {res.status_code}")
            logger.info(f"📦 响应: {res.json()}")
            return res.status_code == 200
        except Exception as e:
            logger.error(f"❌ 上传失败: {e}")
            return False
        finally:
            for _, f in files:
                f.close()

    def process_all_languages(self, langs: Optional[List[str]] = None) -> Dict[str, bool]:
        """
        处理所有语言
        
        Args:
            langs: 要处理的特定语言列表，如果为 None 则处理所有语言
            
        Returns:
            Dict[str, bool]: 语言处理结果字典
        """
        results = {}
        if langs is None:
            langs = self._get_language_dirs()
        
        for lang in langs:
            try:
                # 生成语料库
                content_dir = os.path.join(self.content_dir, lang)
                self.manager.generate_corpus(content_dir, self.output_dir, lang)
                results[lang] = True
            except Exception as e:
                logger.error(f"处理语言 {lang} 时出错: {e}")
                results[lang] = False
        
        # 上传所有生成的语料库
        upload_success = self._upload_corpus(langs)
        if not upload_success:
            for lang in langs:
                results[lang] = False
        
        return results

def main():
    # 从环境变量获取配置
    content_dir = os.getenv("CONTENT_DIR", DEFAULT_CONTENT_DIR)
    output_dir = os.getenv("OUTPUT_DIR", DEFAULT_OUTPUT_DIR)
    backend_url = os.getenv("BACKEND_URL", DEFAULT_BACKEND_URL)
    api_token = os.getenv("ALLOWED_UPLOAD_TOKEN")
    
    # 获取命令行参数中的语言列表
    langs = sys.argv[1:] if len(sys.argv) > 1 else None
    
    # 创建上传器实例
    uploader = CorpusUploader(
        content_dir=content_dir,
        output_dir=output_dir,
        backend_url=backend_url,
        api_token=api_token
    )
    
    # 处理指定语言或所有语言
    results = uploader.process_all_languages(langs)
    
    # 打印结果统计
    success_count = sum(1 for success in results.values() if success)
    total_count = len(results)
    
    logger.info("\n处理结果统计:")
    logger.info(f"总语言数: {total_count}")
    logger.info(f"成功数: {success_count}")
    logger.info(f"失败数: {total_count - success_count}")
    
    # 如果有失败的语言，打印详细信息
    if success_count < total_count:
        logger.info("\n失败的语言:")
        for lang, success in results.items():
            if not success:
                logger.info(f"- {lang}")
    
    # 如果有失败，返回非零退出码
    if success_count < total_count:
        sys.exit(1)

if __name__ == "__main__":
    main() 