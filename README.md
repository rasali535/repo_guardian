# 🛡️ Repo Guardian

**AI-Powered Repository Pattern Analysis & Code Generation**

Repo Guardian analyzes your repository's patterns and conventions, then generates new code that perfectly matches your existing codebase style.

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-19+-61DAFB)](https://reactjs.org/)

## ✨ Features

- 🔍 **Repository Analysis**: Automatically detects naming conventions, file structures, and coding patterns
- 📋 **Style Guide Generation**: Creates comprehensive style guides based on your codebase
- 💡 **Intent-Based Planning**: Describe what you want to build, get a file structure plan
- ⚡ **Code Generation**: Generates code that matches your repository's patterns
- ✅ **Verification**: Validates generated code against your standards
- 📦 **Export**: Download generated code as ZIP with README

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/repo-guardian.git
cd repo-guardian
```

2. Install dependencies:
```bash
npm install
```

3. Create environment file:
```bash
cp .env.example .env
```

4. Configure your AI provider (optional):
```env
# For OpenAI
VITE_AI_PROVIDER=openai
VITE_OPENAI_API_KEY=your_api_key_here

# For Anthropic
VITE_AI_PROVIDER=anthropic
VITE_ANTHROPIC_API_KEY=your_api_key_here

# For mock mode (no API required)
VITE_AI_PROVIDER=mock
```

5. Start the development server:
```bash
npm run dev
```

6. Open [http://localhost:5173](http://localhost:5173) in your browser

## 📖 Usage

### 1. Survey Phase
- Enter a GitHub repository URL or analyze the current repository
- Repo Guardian scans the codebase and extracts patterns

### 2. Style Guide Phase
- Review the generated style guide
- Download it for reference
- Continue to define your intent

### 3. Intent Phase
- Describe the feature you want to build
- Review the proposed file structure
- Approve the plan to generate code

### 4. Execute Phase
- Watch as code is generated file by file
- Review generated code with pattern annotations
- See how each file matches your repository's conventions

### 5. Verify Phase
- Review validation checks
- Download all generated files as ZIP
- Integrate into your project

## 🏗️ Architecture

```
repo-guardian/
├── src/
│   ├── components/
│   │   ├── common/          # Reusable components (Toast, etc.)
│   │   ├── layout/          # Layout components (Header, Navigator)
│   │   └── phases/          # Phase-specific components
│   ├── context/             # React contexts (App, Toast)
│   ├── services/            # AI and external services
│   ├── utils/               # Utility functions
│   ├── types/               # TypeScript type definitions
│   └── config/              # Configuration files
├── public/                  # Static assets
└── ...config files
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_AI_PROVIDER` | AI provider (`openai`, `anthropic`, `mock`) | `mock` |
| `VITE_OPENAI_API_KEY` | OpenAI API key | - |
| `VITE_OPENAI_MODEL` | OpenAI model | `gpt-4` |
| `VITE_ANTHROPIC_API_KEY` | Anthropic API key | - |
| `VITE_ANTHROPIC_MODEL` | Anthropic model | `claude-3-opus-20240229` |
| `VITE_GITHUB_TOKEN` | GitHub personal access token | - |

### Mock Mode

By default, Repo Guardian runs in mock mode, which doesn't require any API keys. This is perfect for:
- Testing the application
- Understanding the workflow
- Development purposes

To use real AI-powered analysis, configure an AI provider in your `.env` file.

## 🛠️ Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run linter
npm run lint

# Type check
npm run type-check
```

### Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS 4, Framer Motion
- **Build Tool**: Vite
- **State Management**: React Context API
- **Icons**: Lucide React
- **File Handling**: JSZip

## 📦 Production Deployment

### Build

```bash
npm run build
```

The build output will be in the `dist/` directory.

### Deploy to Vercel

```bash
npm install -g vercel
vercel
```

### Deploy to Netlify

```bash
npm install -g netlify-cli
netlify deploy --prod
```

### Environment Variables for Production

Make sure to set these in your hosting platform:
- `VITE_AI_PROVIDER`
- `VITE_OPENAI_API_KEY` or `VITE_ANTHROPIC_API_KEY`
- Any other required variables from `.env.example`

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Animated with [Framer Motion](https://www.framer.com/motion/)
- Icons by [Lucide](https://lucide.dev/)

## 📞 Support

For support, email support@repoguardian.dev or open an issue on GitHub.

---

**Made with ❤️ by Bob**
