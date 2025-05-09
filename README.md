# FolioKit

English | [中文](./README_zh.md)

A modern portfolio and documentation management system built with Nuxt 3.

## Features

- 🌐 Multi-language support (English, Chinese)
- 📝 Markdown-based content management
- 🔍 Vector-based semantic search
- 🎨 Modern responsive interface
- 📱 Mobile-friendly design
- 🚀 Fast and SEO-friendly
- 🔒 Secure API integration

## Tech Stack

### Frontend
- [Nuxt 3](https://nuxt.com/) - Vue framework
- [Vue 3](https://vuejs.org/) - Progressive JavaScript framework
- [TailwindCSS](https://tailwindcss.com/) - Utility-first CSS framework
- [TypeScript](https://www.typescriptlang.org/) - Typed JavaScript
- [Vercel](https://vercel.com/) - Deployment platform

### Backend
- [Flask](https://flask.palletsprojects.com/) - Python Web framework
- [LlamaIndex](https://www.llamaindex.ai/) - LLM application data framework
- [OpenAI](https://openai.com/) - AI model integration
- [Docker](https://www.docker.com/) - Containerization (optional)

## Quick Start

### Frontend Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/foliokit.git
cd foliokit
```

2. Install dependencies:
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

3. Create `.env` file:
```env
BACKEND_URL=http://localhost:5000
API_TOKEN=your_api_token
```

4. Start development server:
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

### Backend Setup

1. Clone the backend repository:
```bash
git clone https://github.com/jz0ojiang/foliokit-api.git
cd foliokit-api
```

2. Create and activate virtual environment:
```bash
python -m venv env
source env/bin/activate  # Windows: env\Scripts\activate
```

3. Install dependencies:
```bash
pip install -r requirements.txt
```

4. Create `.env` file:
```env
OPENAI_API_KEY=your_api_key
OPENAI_API_BASE=https://api.openai.com/v1
OPENAI_MODEL=gpt-4-mini
ALLOWED_UPLOAD_TOKEN=your_token
CORS_ORIGINS=http://localhost:3000
RATE_LIMIT_COUNT=10
SKIP_BUILD_ON_BOOT=false
SECRET_KEY=your_secret_key
```

5. Start the backend server:
```bash
python app.py
```

## Project Structure

### Frontend
```
foliokit/
├── content/           # Markdown content files
│   ├── en/           # English content
│   └── zh/           # Chinese content
├── public/           # Static assets
├── src/              # Source code
│   ├── components/   # Vue components
│   ├── layouts/      # Page layouts
│   ├── pages/        # Page components
│   └── utils/        # Utility functions
├── script/           # Build and utility scripts
└── api/              # API integration
```

### Backend
```
foliokit-api/
├── app.py              # Main application entry
├── config.py           # Configuration file
├── requirements.txt    # Python dependencies
├── core/              # Core functionality
│   ├── auth.py        # Authentication
│   ├── corpus_manager.py  # Content management
│   ├── index_manager_pool.py  # Search index management
│   ├── limiter.py     # Rate limiting
│   ├── llama_index_manager.py  # Vector search
│   ├── openai_client.py  # OpenAI integration
│   └── prompt_builder.py  # Prompt engineering
├── router/            # API routes
├── service/           # Business logic
├── storage/           # Content storage
└── corpus/            # Content corpus
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Nuxt 3 Documentation](https://nuxt.com/docs)
- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [TailwindCSS Documentation](https://tailwindcss.com/docs)
- [Flask Documentation](https://flask.palletsprojects.com/)
- [LlamaIndex Documentation](https://docs.llamaindex.ai/)
- [OpenAI API Documentation](https://platform.openai.com/docs/api-reference)
