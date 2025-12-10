# JARVIS-Core Mind

<div align="center">

![JARVIS Logo](https://img.shields.io/badge/JARVIS-Core%20Mind-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

**Just A Rather Very Intelligent System** - An advanced AI assistant with a multi-agent cognitive architecture inspired by Iron Man's JARVIS.

[Features](#-features) • [Installation](#-installation) • [Usage](#-usage) • [Architecture](#-architecture) • [Contributing](#-contributing)

</div>

---

## 📋 Table of Contents

- [Overview](#-overview)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Configuration](#-configuration)
- [Usage](#-usage)
- [Project Structure](#-project-structure)
- [Development](#-development)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

## 🎯 Overview

JARVIS Core Mind is a sophisticated AI assistant application that implements a multi-agent cognitive architecture. The system processes user queries through specialized agents that work together to provide intelligent, context-aware responses. The application features a modern, animated UI with real-time visualization of the cognitive processing pipeline.

### Key Highlights

- **Multi-Agent Architecture**: Five specialized agents (Router, Retriever, Reasoner, Actioner, Verifier) working in harmony
- **Real-Time Visualization**: Interactive Neural Canvas showing agent interactions
- **Memory Bank**: Vector-based knowledge storage with semantic search capabilities
- **Streaming Responses**: Real-time AI responses with smooth animations
- **Modern UI**: Beautiful, responsive interface built with shadcn/ui and Tailwind CSS

## ✨ Features

### 🤖 Multi-Agent Cognitive System

- **Cognitive Router**: Analyzes incoming queries and determines optimal processing paths
- **Retriever Agent**: Searches knowledge base for relevant context using semantic similarity
- **Reasoner Agent**: Performs deep analysis, logic chains, and inference
- **Actioner Agent**: Formulates responses and suggests actionable steps
- **Verifier Agent**: Validates outputs for accuracy and coherence

### 🎨 User Interface

- **Chat Interface**: Real-time conversation with streaming AI responses
- **Neural Canvas**: Visual representation of the cognitive architecture in action
- **Memory Bank**: Browse and search through stored knowledge vectors
- **Agent Status Panel**: Real-time monitoring of agent processing stages
- **Responsive Design**: Works seamlessly on desktop and mobile devices

### 🔧 Technical Features

- **Streaming API**: Server-sent events for real-time response streaming
- **Vector Embeddings**: Semantic search using vector similarity
- **State Management**: React hooks with TanStack Query for efficient data fetching
- **Animations**: Smooth transitions powered by Framer Motion
- **Type Safety**: Full TypeScript support throughout the codebase

## 🛠 Tech Stack

### Frontend

- **React 18** - UI library
- **TypeScript** - Type-safe development
- **Vite** - Build tool and dev server
- **React Router** - Client-side routing
- **TanStack Query** - Data fetching and caching
- **Framer Motion** - Animation library
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - High-quality component library
- **Radix UI** - Accessible component primitives

### Backend & Infrastructure

- **Supabase** - Backend-as-a-Service
  - Edge Functions (Deno runtime)
  - Authentication
  - Database
- **Lovable AI Gateway** - AI API integration
- **Google Gemini 2.5 Flash** - Large language model

### Development Tools

- **ESLint** - Code linting
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## 🏗 Architecture

### System Architecture

```
┌─────────────────┐
│   User Query    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Cognitive Router│ ◄─── Analyzes intent & routes query
└────────┬────────┘
         │
         ├─────────────────┬─────────────────┐
         ▼                 ▼                 ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│  Retriever   │  │   Reasoner   │  │   Actioner   │
│    Agent     │  │    Agent     │  │    Agent     │
└──────┬───────┘  └──────┬───────┘  └──────┬───────┘
       │                 │                 │
       └─────────────────┴─────────────────┘
                         │
                         ▼
                 ┌──────────────┐
                 │   Verifier   │
                 │    Agent     │
                 └──────┬───────┘
                        │
                        ▼
                 ┌──────────────┐
                 │   Response   │
                 └──────────────┘
```

### Component Architecture

- **Pages**: Route-level components (`Index`, `NeuralCanvas`, `MemoryBank`)
- **Components**: Reusable UI components (`jarvis/`, `ui/`)
- **Hooks**: Custom React hooks (`useJarvisChat`)
- **Integrations**: External service clients (`supabase/`)
- **Types**: TypeScript type definitions (`jarvis.ts`)

## 📦 Installation

### Prerequisites

- **Node.js** 18+ (recommended: use [nvm](https://github.com/nvm-sh/nvm))
- **npm** or **yarn** or **bun**
- **Supabase Account** (for backend services)

### Step 1: Clone the Repository

```bash
git clone (https://github.com/mukthaparam/diligent.git)
cd jarvis-core-mind-main
```

### Step 2: Install Dependencies

```bash
npm install
# or
yarn install
# or
bun install
```

### Step 3: Set Up Environment Variables

Create a `.env` file in the root directory:

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

### Step 4: Configure Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Navigate to **Edge Functions** in your Supabase dashboard
3. Deploy the `jarvis-chat` function from `supabase/functions/jarvis-chat/`
4. Set the `LOVABLE_API_KEY` environment variable in your Supabase project:
   - Go to **Project Settings** → **Edge Functions** → **Secrets**
   - Add `LOVABLE_API_KEY` with your Lovable API key

### Step 5: Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:8080`

## 📸 Screenshots

<p>
  <img src="https://raw.githubusercontent.com/mukthaparam/diligent/main/1.jpeg" width="45%" />
  <img src="https://raw.githubusercontent.com/mukthaparam/diligent/main/2.jpeg" width="45%" />
</p>




https://github.com/user-attachments/assets/17876c89-0dfc-4c97-b87e-db3f253f8792




## ⚙️ Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `VITE_SUPABASE_URL` | Your Supabase project URL | Yes |
| `VITE_SUPABASE_PUBLISHABLE_KEY` | Your Supabase anon/public key | Yes |

### Supabase Edge Function Configuration

The `jarvis-chat` Edge Function requires:

- **LOVABLE_API_KEY**: API key for Lovable AI Gateway
- **Model**: Currently configured for `google/gemini-2.5-flash`

To modify the AI model or add additional configuration, edit `supabase/functions/jarvis-chat/index.ts`.

### Customization

#### Theme Colors

Edit `src/index.css` to customize the color scheme:

```css
:root {
  --primary: 199 89% 48%;
  --neural-cyan: 185 100% 50%;
  --neural-purple: 262 83% 58%;
  /* ... */
}
```

#### Agent Configuration

Modify agent behavior in:
- `src/hooks/useJarvisChat.ts` - Agent processing logic
- `src/types/jarvis.ts` - Agent type definitions

## 🚀 Usage

### Starting the Application

```bash
# Development mode with hot reload
npm run dev

# Production build
npm run build

# Preview production build
npm run preview
```

### Using the Chat Interface

1. **Main Chat** (`/`): 
   - Type your message in the input field
   - Watch as agents process your query in real-time
   - View agent status in the right panel

2. **Neural Canvas** (`/neural-canvas`):
   - Click "Run Simulation" to visualize agent interactions
   - Observe the flow of data through the cognitive architecture
   - View architecture metrics

3. **Memory Bank** (`/memory-bank`):
   - Search through stored memories using semantic similarity
   - View vector embeddings and relevance scores
   - Explore different memory types (conversation, knowledge, context)

### API Endpoints

#### Chat Endpoint

**POST** `/functions/v1/jarvis-chat`

```json
{
  "messages": [
    {
      "role": "user",
      "content": "Your message here"
    }
  ],
  "stream": true
}
```

## 📁 Project Structure

```
jarvis-core-mind-main/
├── public/                 # Static assets
│   ├── favicon.ico
│   └── robots.txt
├── src/
│   ├── components/         # React components
│   │   ├── jarvis/         # JARVIS-specific components
│   │   │   ├── AgentCard.tsx
│   │   │   ├── AgentPanel.tsx
│   │   │   ├── ChatInput.tsx
│   │   │   ├── JarvisLayout.tsx
│   │   │   ├── MemoryPanel.tsx
│   │   │   ├── MessageBubble.tsx
│   │   │   ├── NeuralCanvas.tsx
│   │   │   └── ThinkingIndicator.tsx
│   │   └── ui/             # shadcn/ui components
│   ├── hooks/              # Custom React hooks
│   │   └── useJarvisChat.ts
│   ├── integrations/       # External service integrations
│   │   └── supabase/
│   ├── lib/                # Utility functions
│   ├── pages/              # Page components
│   │   ├── Index.tsx
│   │   ├── NeuralCanvas.tsx
│   │   ├── MemoryBank.tsx
│   │   └── NotFound.tsx
│   ├── types/              # TypeScript type definitions
│   │   └── jarvis.ts
│   ├── App.tsx             # Main app component
│   ├── main.tsx            # Application entry point
│   └── index.css           # Global styles
├── supabase/
│   ├── config.toml         # Supabase configuration
│   └── functions/
│       └── jarvis-chat/    # Edge function for chat
│           └── index.ts
├── package.json
├── vite.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 💻 Development

### Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Build for development
npm run build:dev

# Lint code
npm run lint

# Preview production build
npm run preview
```

### Code Style

- **ESLint**: Configured with React and TypeScript rules
- **TypeScript**: Strict type checking enabled
- **Prettier**: Recommended for consistent formatting

### Adding New Features

1. **New Agent**: 
   - Add agent type to `src/types/jarvis.ts`
   - Update `agentSequence` in `useJarvisChat.ts`
   - Add UI components in `components/jarvis/`

2. **New Page**:
   - Create component in `src/pages/`
   - Add route in `src/App.tsx`
   - Update navigation if needed

3. **New Component**:
   - Create in appropriate directory (`components/jarvis/` or `components/ui/`)
   - Export from component file
   - Import where needed

## 🚢 Deployment

### Deploying to Production

#### Option 1: Using Lovable (Recommended)

1. Open your project in [Lovable](https://lovable.dev)
2. Click **Share** → **Publish**
3. Follow the deployment wizard

#### Option 2: Manual Deployment

##### Vercel

```bash
npm install -g vercel
vercel
```

##### Netlify

```bash
npm run build
# Upload dist/ folder to Netlify
```

##### Supabase

```bash
# Deploy Edge Functions
supabase functions deploy jarvis-chat
```

### Environment Variables for Production

Ensure all environment variables are set in your hosting platform:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch** (`git checkout -b feature/amazing-feature`)
3. **Make your changes**
4. **Commit your changes** (`git commit -m 'Add some amazing feature'`)
5. **Push to the branch** (`git push origin feature/amazing-feature`)
6. **Open a Pull Request**

### Development Guidelines

- Follow TypeScript best practices
- Write meaningful commit messages
- Add comments for complex logic
- Ensure code passes linting
- Test your changes thoroughly

## 📄 License

This project is open source and available under the [MIT License](LICENSE).


## 📞 Support

For issues, questions, or contributions:

- **Issues**: [GitHub Issues](https://github.com/yourusername/jarvis-core-mind/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/jarvis-core-mind/discussions)

---

<div align="center">

**Built with ❤️ using React, TypeScript, and Supabase**

[⬆ Back to Top](#jarvis-core-mind)

</div>
