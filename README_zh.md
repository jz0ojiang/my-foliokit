> 📌 本项目采用非商业授权协议，禁止任何形式的商业使用（包括模板转售、SaaS 服务等）。如需商业授权，请联系：[https://im0o.top](https://im0o.top)

# FolioKit

[English](./README.md) | 中文

FolioKit 是一个基于 Nuxt 3 构建的现代化作品集与文档管理系统，支持多语言、Markdown 内容、语义搜索和现代响应式界面。

## 功能亮点

- 🌐 多语言支持（中英）
- 📝 Markdown 内容管理
- 🔍 语义向量搜索
- 🎨 现代响应式 UI
- 📱 移动端友好
- 🚀 SEO 友好与高性能
- 🔒 安全 API 集成

## 技术栈

### 前端
- [Nuxt 3](https://nuxt.com/) — 现代 Vue 框架
- [Vue 3](https://vuejs.org/) — 渐进式 JavaScript 框架
- [TailwindCSS](https://tailwindcss.com/) — 实用优先 CSS
- [TypeScript](https://www.typescriptlang.org/) — 类型安全
- [Vercel](https://vercel.com/) — 云部署平台

### 后端
- [Flask](https://flask.palletsprojects.com/) — Python Web 框架
- [LlamaIndex](https://www.llamaindex.ai/) — LLM 数据框架
- [OpenAI](https://openai.com/) — AI 集成
- [Docker](https://www.docker.com/) — 容器化（可选）

## 快速开始

### 前端
1. 克隆仓库
   ```bash
   git clone https://github.com/yourusername/foliokit.git
   cd foliokit
   ```
2. 安装依赖
   ```bash
   npm install # 或 yarn/pnpm/bun
   ```
3. 配置环境变量 `.env`
   ```env
   API_BASE_URL=http://localhost:5000
   BACKEND_URL=http://localhost:5000
   ALLOWED_UPLOAD_TOKEN=your_token
   ```
4. 启动开发服务器
   ```bash
   npm run dev
   ```

### 后端
1. 克隆后端仓库
   ```bash
   git clone https://github.com/jz0ojiang/foliokit-api.git
   cd foliokit-api
   ```
2. 创建虚拟环境并安装依赖
   ```bash
   python -m venv env
   source env/bin/activate  # Windows: env\Scripts\activate
   pip install -r requirements.txt
   ```
3. 配置 `.env`
   ```env
   OPENAI_API_KEY=sk-xxx
   OPENAI_API_BASE=https://api.openai.com/v1
   OPENAI_MODEL=gpt-4-mini
   ALLOWED_UPLOAD_TOKEN=your_token
   RATE_LIMIT_COUNT=60
   REDIS_URL=
   CORS_ORIGINS=*
   ```
4. 启动后端
   ```bash
   python app.py
   ```

## 目录结构

### 前端
```
foliokit/
├── content/           # Markdown 内容
│   ├── en/           # 英文
│   └── zh/           # 中文
├── public/           # 静态资源
├── src/              # 源码
│   ├── components/   # 组件
│   ├── layouts/      # 布局
│   ├── pages/        # 页面
│   ├── utils/        # 工具
│   └── i18n/         # 国际化
├── script/           # 脚本
└── api/              # API 集成
```

### 后端
```
foliokit-api/
├── app.py              # 主入口
├── config.py           # 配置
├── requirements.txt    # 依赖
├── core/               # 核心功能
├── router/             # 路由
├── service/            # 业务
├── storage/            # 存储
└── corpus/             # 语料库
```

## 贡献指南

1. Fork 本仓库
2. 新建分支 (`git checkout -b feature/xxx`)
3. 提交更改 (`git commit -m 'feat: xxx'`)
4. 推送分支 (`git push origin feature/xxx`)
5. 提交 Pull Request

## 许可证

📄 本项目采用 [CC BY-NC 4.0 国际许可协议](https://creativecommons.org/licenses/by-nc/4.0/deed.zh) 授权，允许个人或非商业用途下自由使用、修改和再分发。

详见 [LICENSE](LICENSE) 文件了解完整条款。

## 致谢

- [Nuxt 3 文档](https://nuxt.com/docs)
- [Vue 3 文档](https://vuejs.org/guide/introduction.html)
- [TailwindCSS 文档](https://tailwindcss.com/docs)
- [Flask 文档](https://flask.palletsprojects.com/)
- [LlamaIndex 文档](https://docs.llamaindex.ai/)
- [OpenAI API 文档](https://platform.openai.com/docs/api-reference) 