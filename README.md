# FolioKit

[中文](./README_zh.md) | English

FolioKit is a modern portfolio and documentation management system built with Nuxt 3, supporting multi-language, Markdown content, semantic search, and a modern responsive UI.

## Features

- 🌐 Multi-language support (English & Chinese)
- 📝 Markdown-based content management
- 🔍 Semantic vector search
- 🎨 Modern responsive UI
- 📱 Mobile-friendly design
- 🚀 SEO-friendly & high performance
- 🔒 Secure API integration

## Tech Stack

### Frontend
- [Nuxt 3](https://nuxt.com/) — Modern Vue framework
- [Vue 3](https://vuejs.org/) — Progressive JavaScript framework
- [TailwindCSS](https://tailwindcss.com/) — Utility-first CSS
- [TypeScript](https://www.typescriptlang.org/) — Type safety
- [Vercel](https://vercel.com/) — Cloud deployment platform

### Backend
- [Flask](https://flask.palletsprojects.com/) — Python web framework
- [LlamaIndex](https://www.llamaindex.ai/) — LLM data framework
- [OpenAI](https://openai.com/) — AI integration
- [Docker](https://www.docker.com/) — Containerization (optional)

## Quick Start

### Frontend
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/foliokit.git
   cd foliokit
   ```
2. Install dependencies
   ```bash
   npm install # or yarn/pnpm/bun
   ```
3. Configure environment variables in `.env`
   ```env
   API_BASE_URL=http://localhost:5000
   BACKEND_URL=http://localhost:5000
   ALLOWED_UPLOAD_TOKEN=your_token
   ```
4. Start the development server
   ```bash
   npm run dev
   ```

### Backend
1. Clone the backend repository
   ```bash
   git clone https://github.com/jz0ojiang/foliokit-api.git
   cd foliokit-api
   ```
2. Create a virtual environment and install dependencies
   ```bash
   python -m venv env
   source env/bin/activate  # Windows: env\Scripts\activate
   pip install -r requirements.txt
   ```
3. Configure `.env`
   ```env
   OPENAI_API_KEY=sk-xxx
   OPENAI_API_BASE=https://api.openai.com/v1
   OPENAI_MODEL=gpt-4-mini
   ALLOWED_UPLOAD_TOKEN=your_token
   RATE_LIMIT_COUNT=60
   REDIS_URL=
   CORS_ORIGINS=*
   ```
4. Start the backend server
   ```bash
   python app.py
   ```

## Directory Structure

### Frontend
```
foliokit/
├── content/           # Markdown content
│   ├── en/           # English
│   └── zh/           # Chinese
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # Components
│   ├── layouts/      # Layouts
│   ├── pages/        # Pages
│   ├── utils/        # Utilities
│   └── i18n/         # Localization
├── script/           # Scripts
└── api/              # API integration
```

### Backend
```
foliokit-api/
├── app.py              # Main entry
├── config.py           # Configuration
├── requirements.txt    # Dependencies
├── core/               # Core features
├── router/             # API routes
├── service/            # Business logic
├── storage/            # Storage
└── corpus/             # Corpus
```

## Contribution Guide

1. Fork this repository
2. Create a new branch (`git checkout -b feature/xxx`)
3. Commit your changes (`git commit -m 'feat: xxx'`)
4. Push to your branch (`git push origin feature/xxx`)
5. Submit a Pull Request

## License

📄 Licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/) — free for personal and non-commercial use.

For commercial licensing inquiries, please contact [https://im0o.top](https://im0o.top).

See [LICENSE](LICENSE) for full details.


## Acknowledgements

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [LlamaIndex Documentation](https://docs.llamaindex.ai/)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
