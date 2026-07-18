# ArenaOS AI - Backend Services Foundation

This is the Clean Architecture Python backend for the ArenaOS AI Smart Stadium console system.

## Stack & Libraries
*   **FastAPI**: Core async API router framework.
*   **SQLAlchemy [asyncio]**: Database ORM mapping layers.
*   **Loguru**: Structured logs formatter.
*   **Pydantic Settings**: Centralized environment variable manager.

## Setup & Running Local Server
1.  Initialize virtual env:
    ```bash
    python -m venv .venv
    .venv\Scripts\activate
    ```
2.  Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3.  Start FastAPI dev server:
    ```bash
    uvicorn app.main:app --reload
    ```
4.  Preview APIs:
    *   Health Check: `http://localhost:8000/health`
    *   Interactive Docs: `http://localhost:8000/docs`
