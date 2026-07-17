# API Architecture

---

# Overview

ArenaOS AI follows a RESTful API architecture built using **FastAPI**. The backend acts as the central gateway between the frontend, AI Orchestrator, specialized AI agents, the database, and external services.

Every request from the frontend passes through authentication, validation, business logic, AI orchestration (if required), and finally returns a standardized JSON response.

---

# API Design Goals

The API is designed to be:

- RESTful
- Secure
- Scalable
- Versioned
- Modular
- AI-Ready
- Well Documented
- Easy to Extend

---

# High-Level API Flow

```
Client (Next.js)

↓

HTTPS Request

↓

FastAPI Router

↓

Authentication Middleware

↓

Validation Layer

↓

Business Service

↓

AI Orchestrator (if required)

↓

Database / External APIs

↓

JSON Response
```

---

# Base URL

```
Development

http://localhost:8000/api/v1
```

```
Production

https://api.arenaos.ai/api/v1
```

---

# API Versioning

Current Version

```
v1
```

Future

```
v2

v3
```

---

# Authentication

ArenaOS AI uses JWT Authentication.

Header

```
Authorization

Bearer <JWT_TOKEN>
```

---

# Standard Response Format

Successful Response

```json
{
  "success": true,
  "message": "Request completed successfully",
  "data": {}
}
```

---

Error Response

```json
{
  "success": false,
  "message": "Validation failed",
  "errors": []
}
```

---

# Authentication APIs

## POST

```
/auth/register
```

Register new user.

Request

```json
{
  "name": "",
  "email": "",
  "password": ""
}
```

---

## POST

```
/auth/login
```

Returns JWT token.

---

## POST

```
/auth/logout
```

Invalidates session.

---

## GET

```
/auth/profile
```

Returns authenticated user profile.

---

# User APIs

## GET

```
/users/me
```

Current user.

---

## PUT

```
/users/me
```

Update profile.

---

## GET

```
/users/{id}
```

Admin only.

---

# Dashboard APIs

## GET

```
/dashboard/fan
```

Loads Fan Dashboard.

---

## GET

```
/dashboard/operations
```

Loads Operations Dashboard.

---

## GET

```
/dashboard/security
```

Loads Security Dashboard.

---

## GET

```
/dashboard/admin
```

Loads Admin Dashboard.

---

# Event APIs

## GET

```
/events
```

List events.

---

## GET

```
/events/{id}
```

Event details.

---

## POST

```
/events
```

Create event.

(Admin only)

---

## PUT

```
/events/{id}
```

Update event.

---

## DELETE

```
/events/{id}
```

Delete event.

---

# Match APIs

## GET

```
/matches
```

---

## GET

```
/matches/live
```

---

## GET

```
/matches/{id}
```

---

# Ticket APIs

## GET

```
/tickets
```

---

## GET

```
/tickets/{id}
```

---

## POST

```
/tickets/validate
```

Validate QR ticket.

---

# Navigation APIs

## POST

```
/navigation/route
```

Request

```json
{
  "source": "Current Location",
  "destination": "Seat A12"
}
```

Response

```json
{
  "route": [],
  "eta": "4 min",
  "distance": "220m"
}
```

---

# Crowd APIs

## GET

```
/crowd/live
```

Returns live crowd information.

---

## GET

```
/crowd/heatmap
```

Returns crowd heatmap.

---

## GET

```
/crowd/predictions
```

Returns AI predictions.

---

# Emergency APIs

## POST

```
/emergency/report
```

Create emergency.

---

## GET

```
/emergency/{id}
```

Emergency status.

---

## PUT

```
/emergency/{id}
```

Update incident.

---

# Food APIs

## GET

```
/food/vendors
```

Nearby vendors.

---

## GET

```
/food/menu/{vendorId}
```

---

## POST

```
/food/order
```

Future implementation.

---

# Notification APIs

## GET

```
/notifications
```

---

## PUT

```
/notifications/read/{id}
```

---

# AI APIs

## POST

```
/ai/chat
```

General AI conversation.

Request

```json
{
  "message": "Guide me to Gate B"
}
```

---

## POST

```
/ai/navigation
```

Navigation agent.

---

## POST

```
/ai/crowd
```

Crowd agent.

---

## POST

```
/ai/emergency
```

Emergency agent.

---

## POST

```
/ai/operations
```

Operations agent.

---

# Analytics APIs

## GET

```
/analytics/dashboard
```

---

## GET

```
/analytics/crowd
```

---

## GET

```
/analytics/events
```

---

# Admin APIs

## GET

```
/admin/users
```

---

## POST

```
/admin/users
```

---

## PUT

```
/admin/users/{id}
```

---

## DELETE

```
/admin/users/{id}
```

---

# AI Orchestrator Flow

```
Frontend

↓

POST /ai/chat

↓

Intent Detection

↓

Google ADK

↓

Agent Selection

↓

Tool Calling

↓

Combine Results

↓

JSON Response
```

---

# HTTP Status Codes

| Code | Meaning               |
| ---- | --------------------- |
| 200  | Success               |
| 201  | Created               |
| 204  | No Content            |
| 400  | Bad Request           |
| 401  | Unauthorized          |
| 403  | Forbidden             |
| 404  | Not Found             |
| 409  | Conflict              |
| 422  | Validation Error      |
| 500  | Internal Server Error |

---

# Validation

Every API validates:

- Authentication
- Authorization
- Required Fields
- Input Types
- Request Size
- Business Rules

---

# Rate Limiting

Default limits:

- Authentication APIs → 10 requests/minute
- AI APIs → 30 requests/minute
- General APIs → 100 requests/minute

---

# API Documentation

FastAPI automatically generates:

- Swagger UI (`/docs`)
- ReDoc (`/redoc`)
- OpenAPI Specification (`/openapi.json`)

---

# Security

Every API follows:

- JWT Authentication
- HTTPS Only
- CORS Protection
- Input Validation
- SQL Injection Protection
- XSS Protection
- Rate Limiting
- Audit Logging

---

# Future APIs

Future versions may include:

- AR Navigation API
- Smart Parking API
- Drone Monitoring API
- AI Vision API
- Digital Twin API
- Sustainability API
- IoT Sensor API

---

# Summary

ArenaOS AI exposes a modular, secure, and AI-ready REST API built with FastAPI. The API serves as the communication layer between the frontend, AI agents, database, and external services while ensuring consistency, scalability, and maintainability. Every endpoint follows standardized request and response formats, enabling seamless integration across the platform.
