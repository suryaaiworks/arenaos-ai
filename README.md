# ArenaOS AI – The Agentic AI Operating System for Smart Stadiums

ArenaOS AI is a next-generation **Agentic AI Operating System** designed to manage large-scale sporting and entertainment events (such as FIFA World Cup, Olympics, concerts) by coordinating specialized autonomous AI agents in real time.

---

## 🏗️ Project Architecture

```text
arenaos-ai/
│
├── apps/
│   ├── web/                     # Next.js 15 Frontend
│   └── api/                     # FastAPI Backend (Sprint 2+)
│
├── agents/                      # Google ADK Multi-Agent System (Sprint 2+)
├── database/                    # PostgreSQL/Supabase Schemas (Sprint 2+)
├── docs/                        # Specifications and UI/UX Blueprints
├── assets/                      # Shared static elements and icons
├── infrastructure/              # Docker, deployment, and monitoring
├── shared/                      # Monorepo utilities, types, and constants
└── tests/                       # Automated testing suites
```

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: FastAPI, Python (Sprint 2+)
- **AI Engine**: Google Gemini LLM, Google Agent Development Kit (ADK) (Sprint 2+)
- **Database**: Supabase PostgreSQL (Sprint 2+)

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation & Run

1. Navigate to the web app:

   ```bash
   cd apps/web
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the Landing Page.
