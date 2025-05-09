# FolioKit

[English](./README.md) | 中文

基于 Nuxt 3 构建的现代作品集和文档管理系统。

## 功能特点

- 🌐 多语言支持（英语、中文）
- 📝 基于 Markdown 的内容管理
- 🔍 基于向量的语义搜索
- 🎨 现代响应式界面
- 📱 移动端友好设计
- 🚀 快速且对搜索引擎友好
- 🔒 安全的 API 集成

## 技术栈

### 前端
- [Nuxt 3](https://nuxt.com/) - Vue 框架
- [Vue 3](https://vuejs.org/) - 渐进式 JavaScript 框架
- [TailwindCSS](https://tailwindcss.com/) - 实用优先的 CSS 框架
- [TypeScript](https://www.typescriptlang.org/) - 带有类型语法的 JavaScript
- [Vercel](https://vercel.com/) - 部署平台

### 后端
- [Flask](https://flask.palletsprojects.com/) - Python Web 框架
- [LlamaIndex](https://www.llamaindex.ai/) - LLM 应用数据框架
- [OpenAI](https://openai.com/) - AI 模型集成
- [Docker](https://www.docker.com/) - 容器化（可选）

## 快速开始

### 前端设置

1. 克隆仓库：
```bash
git clone https://github.com/yourusername/foliokit.git
cd foliokit
```

2. 安装依赖：
```bash
# npm
npm install

# yarn
yarn install

# pnpm
pnpm install

# bun
bun install
```

3. 创建 `.env` 文件：
```env
BACKEND_URL=http://localhost:5000
API_TOKEN=你的API令牌
```

4. 启动开发服务器：
```bash
# npm
npm run dev

# yarn
yarn dev

# pnpm
pnpm dev

# bun
bun run dev
```

### 后端设置

1. 克隆后端仓库：
```bash
git clone https://github.com/jz0ojiang/foliokit-api.git
cd foliokit-api
```

2. 创建并激活虚拟环境：
```bash
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
```

3. 安装依赖：
```bash
pip install -r requirements.txt
```

4. 创建 `.env` 文件：
```env
OPENAI_API_KEY=你的API密钥
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_MODEL=gpt-4-mini
ALLOWED_UPLOAD_TOKEN=你的密钥
CORS_ORIGINS=http://localhost:3000
RATE_LIMIT_COUNT=10
SKIP_BUILD_ON_BOOT=false
SECRET_KEY=你的密钥
```

5. 启动后端服务器：
```bash
python app.py
```

## 项目结构

### 前端
```
foliokit/
├── content/           # Markdown 内容文件
│   ├── en/           # 英文内容
│   └── zh/           # 中文内容
├── public/           # 静态资源
├── src/              # 源代码
│   ├── components/   # Vue 组件
│   ├── layouts/      # 页面布局
│   ├── pages/        # 页面组件
│   └── utils/        # 工具函数
├── script/           # 构建和工具脚本
└── api/              # API 集成
```

### 后端
```
foliokit-api/
├── app.py              # 主应用入口
├── config.py           # 配置文件
├── requirements.txt    # Python 依赖
├── core/              # 核心功能
│   ├── auth.py        # 认证
│   ├── corpus_manager.py  # 内容管理
│   ├── index_manager_pool.py  # 搜索索引管理
│   ├── limiter.py     # 限流
│   ├── llama_index_manager.py  # 向量搜索
│   ├── openai_client.py  # OpenAI 集成
│   └── prompt_builder.py  # 提示词工程
├── router/            # API 路由
├── service/           # 业务逻辑
├── storage/           # 内容存储
└── corpus/            # 内容语料库
```

## 参与贡献

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m '添加某个特性'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 提交 Pull Request

## 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 致谢

- [Nuxt 3 文档](https://nuxt.com/docs)
- [Vue 3 文档](https://vuejs.org/guide/introduction.html)
- [TailwindCSS 文档](https://tailwindcss.com/docs)
- [Flask 文档](https://flask.palletsprojects.com/)
- [LlamaIndex 文档](https://docs.llamaindex.ai/)
- [OpenAI API 文档](https://platform.openai.com/docs/api-reference) 