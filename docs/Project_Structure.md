# Project Structure

---

# Overview

ArenaOS AI follows a scalable, enterprise-grade monorepo architecture. The project is organized into clear modules to separate the frontend, backend, AI agents, shared utilities, infrastructure, and documentation.

This structure improves maintainability, scalability, collaboration, and deployment.

---

# Project Directory Structure

```text
arenaos-ai/
│
├── apps/
│   ├── web/                     # Next.js Frontend
│   └── api/                     # FastAPI Backend
│
├── agents/                      # Google ADK Multi-Agent System
│   ├── orchestrator/
│   ├── navigation/
│   ├── crowd/
│   ├── emergency/
│   ├── concierge/
│   ├── accessibility/
│   ├── transportation/
│   ├── operations/
│   ├── notifications/
│   ├── shared/
│   └── prompts/
│
├── database/
│   ├── migrations/
│   ├── schemas/
│   ├── seed/
│   └── policies/
│
├── docs/
│
├── assets/
│   ├── icons/
│   ├── images/
│   ├── illustrations/
│   ├── logos/
│   ├── fonts/
│   └── videos/
│
├── infrastructure/
│   ├── docker/
│   ├── deployment/
│   ├── monitoring/
│   └── scripts/
│
├── shared/
│   ├── constants/
│   ├── types/
│   ├── utils/
│   ├── config/
│   └── hooks/
│
├── tests/
│   ├── frontend/
│   ├── backend/
│   ├── agents/
│   └── integration/
│
├── .env.example
├── docker-compose.yml
├── README.md
├── LICENSE
└── .gitignore
```

---

# Frontend Structure

Location

```
apps/web/
```

```text
web/
│
├── app/
│
├── components/
│   ├── ui/
│   ├── dashboard/
│   ├── stadium/
│   ├── ai/
│   ├── maps/
│   ├── charts/
│   ├── navigation/
│   ├── emergency/
│   └── common/
│
├── features/
│
├── services/
│
├── hooks/
│
├── lib/
│
├── store/
│
├── styles/
│
├── types/
│
└── public/
```

---

# Backend Structure

Location

```
apps/api/
```

```text
api/
│
├── app/
│
├── routers/
│
├── controllers/
│
├── services/
│
├── repositories/
│
├── models/
│
├── schemas/
│
├── middleware/
│
├── auth/
│
├── websocket/
│
├── core/
│
├── config/
│
└── main.py
```

---

# AI Agent Structure

```
agents/
```

```text
agents/
│
├── orchestrator/
│
├── navigation/
│
├── crowd/
│
├── emergency/
│
├── concierge/
│
├── accessibility/
│
├── transportation/
│
├── operations/
│
├── notifications/
│
├── shared/
│
└── prompts/
```

Each agent contains:

```text
agent/
│
├── agent.py
├── tools.py
├── prompts.py
├── memory.py
├── schemas.py
├── config.py
└── tests.py
```

---

# Database Structure

```text
database/
│
├── migrations/
├── schemas/
├── seed/
├── policies/
└── backups/
```

---

# Documentation Structure

```text
docs/
│
├── 01_Project_Overview.md
├── 02_Problem_Statement.md
├── 03_Features.md
├── 04_User_Personas.md
├── 05_User_Flows.md
├── 06_System_Architecture.md
├── 07_AI_Agent_Architecture.md
├── 08_AI_Workflows.md
├── 09_Database_Design.md
├── 10_API_Architecture.md
├── 11_Tech_Stack.md
├── 12_Project_Structure.md
├── 13_Development_Roadmap.md
├── 14_UI_Design_System.md
├── 15_UI_Pages_Blueprint.md
├── 16_Component_Design.md
├── 17_Animation_System.md
├── 18_Design_Tokens.md
├── 19_Backend_Architecture.md
├── 20_Agent_Tools.md
├── 21_Security_Architecture.md
├── 22_Real_Time_System.md
├── 23_Deployment.md
├── 24_Testing_Strategy.md
├── 25_Hackathon_Demo.md
```

---

# Assets Structure

```text
assets/
│
├── icons/
├── logos/
├── images/
├── illustrations/
├── backgrounds/
├── fonts/
└── videos/
```

---

# Shared Code

```
shared/
```

Contains reusable code used by both frontend and backend.

Examples:

- Types
- Constants
- Validation
- Utility Functions
- Configuration
- API Contracts

---

# Configuration Files

```
.env.example
```

Contains

- Supabase Keys
- Gemini API Key
- Google Maps API Key
- JWT Secret
- Backend URL
- Frontend URL

---

# Testing Structure

```
tests/
```

```text
tests/
│
├── frontend/
├── backend/
├── agents/
├── api/
├── integration/
└── e2e/
```

---

# Naming Conventions

Folders

```
lowercase
```

Files

```
snake_case.py
```

React Components

```
PascalCase.tsx
```

Hooks

```
useSomething.ts
```

Utilities

```
camelCase.ts
```

---

# Coding Standards

- TypeScript Strict Mode
- Python Type Hints
- ESLint
- Prettier
- Black
- Ruff
- Conventional Commits

---

# Deployment Structure

```text
deployment/
│
├── docker/
├── nginx/
├── vercel/
├── render/
└── monitoring/
```

---

# Logging

```text
logs/
│
├── api.log
├── ai.log
├── websocket.log
├── auth.log
└── system.log
```

---

# Benefits of This Structure

- Modular architecture
- Easy collaboration
- Scalable codebase
- Clear separation of concerns
- Independent AI agents
- Easier testing
- Production-ready organization
- Simplified deployments

---

# Summary

The ArenaOS AI project structure is designed to support a modern full-stack, AI-driven application with a clear separation between the frontend, backend, AI agents, database, infrastructure, and documentation. This organization enables rapid development, simplifies maintenance, and provides a solid foundation for future growth.
