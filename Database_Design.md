# Database Design

---

# Overview

ArenaOS AI uses **Supabase PostgreSQL** as its primary relational database. The database is designed using a normalized schema to support scalability, security, real-time updates, and AI-powered workflows.

The design separates user management, stadium operations, AI interactions, events, navigation, incidents, and analytics into modular tables connected through foreign key relationships.

---

# Database Goals

The database is designed to achieve:

- High scalability
- Data consistency
- Secure authentication
- Real-time synchronization
- Efficient querying
- AI interaction logging
- Role-Based Access Control (RBAC)
- Future extensibility

---

# Database Technology

Database Engine

- PostgreSQL

Backend Service

- Supabase

Authentication

- Supabase Auth

Storage

- Supabase Storage

Realtime

- Supabase Realtime

---

# High-Level ER Diagram

```
Users
│
├── UserProfiles
├── Roles
├── Tickets
├── Notifications
├── AIChats
├── IncidentReports
├── NavigationHistory
├── FoodOrders
└── ActivityLogs

Events
│
├── Stadiums
├── Matches
├── CrowdMetrics
├── EmergencyReports
└── Analytics

AI
│
├── AgentLogs
├── AIRequests
├── AIResponses
└── ToolExecutions
```

---

# Core Tables

## users

Stores authentication details.

| Field         | Type      |
| ------------- | --------- |
| id            | UUID      |
| email         | TEXT      |
| password_hash | TEXT      |
| created_at    | TIMESTAMP |
| last_login    | TIMESTAMP |
| status        | TEXT      |

---

## user_profiles

Stores personal information.

| Field              | Type    |
| ------------------ | ------- |
| id                 | UUID    |
| user_id            | UUID    |
| full_name          | TEXT    |
| phone              | TEXT    |
| avatar             | TEXT    |
| role_id            | UUID    |
| language           | TEXT    |
| accessibility_mode | BOOLEAN |

---

## roles

Stores user roles.

| Role          |
| ------------- |
| Fan           |
| Volunteer     |
| Security      |
| Operations    |
| Administrator |

---

## stadiums

Stores stadium information.

| Field        | Type    |
| ------------ | ------- |
| id           | UUID    |
| stadium_name | TEXT    |
| city         | TEXT    |
| country      | TEXT    |
| capacity     | INTEGER |
| map_url      | TEXT    |

---

## events

Stores sporting events.

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| stadium_id | UUID      |
| event_name | TEXT      |
| event_type | TEXT      |
| start_time | TIMESTAMP |
| end_time   | TIMESTAMP |

---

## matches

Stores match information.

| Field     | Type |
| --------- | ---- |
| id        | UUID |
| event_id  | UUID |
| home_team | TEXT |
| away_team | TEXT |
| score     | JSON |
| status    | TEXT |

---

## tickets

Stores ticket details.

| Field    | Type |
| -------- | ---- |
| id       | UUID |
| user_id  | UUID |
| event_id | UUID |
| section  | TEXT |
| row      | TEXT |
| seat     | TEXT |
| qr_code  | TEXT |

---

## navigation_history

Stores navigation requests.

| Field       | Type      |
| ----------- | --------- |
| id          | UUID      |
| user_id     | UUID      |
| source      | TEXT      |
| destination | TEXT      |
| route       | JSON      |
| created_at  | TIMESTAMP |

---

## crowd_metrics

Stores live crowd analytics.

| Field            | Type      |
| ---------------- | --------- |
| id               | UUID      |
| zone             | TEXT      |
| crowd_density    | FLOAT     |
| congestion_level | TEXT      |
| timestamp        | TIMESTAMP |

---

## emergency_reports

Stores emergency incidents.

| Field          | Type      |
| -------------- | --------- |
| id             | UUID      |
| user_id        | UUID      |
| emergency_type | TEXT      |
| location       | TEXT      |
| priority       | TEXT      |
| status         | TEXT      |
| created_at     | TIMESTAMP |

---

## food_vendors

Stores food vendor details.

| Field       | Type  |
| ----------- | ----- |
| id          | UUID  |
| vendor_name | TEXT  |
| location    | TEXT  |
| cuisine     | TEXT  |
| rating      | FLOAT |

---

## food_orders

Stores food orders.

| Field        | Type      |
| ------------ | --------- |
| id           | UUID      |
| user_id      | UUID      |
| vendor_id    | UUID      |
| total_amount | DECIMAL   |
| status       | TEXT      |
| ordered_at   | TIMESTAMP |

---

## notifications

Stores notifications.

| Field   | Type    |
| ------- | ------- |
| id      | UUID    |
| user_id | UUID    |
| title   | TEXT    |
| message | TEXT    |
| type    | TEXT    |
| read    | BOOLEAN |

---

## ai_chats

Stores AI conversations.

| Field      | Type      |
| ---------- | --------- |
| id         | UUID      |
| user_id    | UUID      |
| prompt     | TEXT      |
| response   | TEXT      |
| created_at | TIMESTAMP |

---

## ai_requests

Stores AI requests.

| Field          | Type  |
| -------------- | ----- |
| id             | UUID  |
| request_type   | TEXT  |
| agent          | TEXT  |
| execution_time | FLOAT |
| status         | TEXT  |

---

## agent_logs

Stores AI agent activity.

| Field          | Type  |
| -------------- | ----- |
| id             | UUID  |
| agent_name     | TEXT  |
| task           | TEXT  |
| execution_time | FLOAT |
| result         | TEXT  |

---

## tool_executions

Stores external tool usage.

| Field            | Type  |
| ---------------- | ----- |
| id               | UUID  |
| tool_name        | TEXT  |
| execution_status | TEXT  |
| response_time    | FLOAT |

---

## activity_logs

Stores platform activity.

| Field     | Type      |
| --------- | --------- |
| id        | UUID      |
| user_id   | UUID      |
| action    | TEXT      |
| timestamp | TIMESTAMP |

---

# Relationships

```
Users
│
├── One → One → User Profile
├── One → Many → Tickets
├── One → Many → Notifications
├── One → Many → AI Chats
├── One → Many → Food Orders
├── One → Many → Navigation History
├── One → Many → Emergency Reports
└── One → Many → Activity Logs

Events
│
├── One → Many → Matches
├── One → Many → Tickets
└── One → Many → Crowd Metrics
```

---

# Indexing Strategy

Indexes should be created for:

- email
- user_id
- event_id
- stadium_id
- created_at
- status
- agent_name
- timestamp
- emergency_type

---

# Row-Level Security (RLS)

Supabase Row-Level Security should be enabled for all user-facing tables.

Examples:

- Fans can only access their own tickets.
- Volunteers only view assigned tasks.
- Security can access incident reports.
- Administrators have full access.

---

# Authentication Model

ArenaOS AI uses Supabase Authentication with JWT.

Flow:

```
User Login

↓

Supabase Auth

↓

JWT Generated

↓

Role Retrieved

↓

Permissions Applied

↓

Dashboard Loaded
```

---

# Realtime Tables

The following tables support real-time subscriptions:

- crowd_metrics
- notifications
- emergency_reports
- matches
- ai_requests

---

# AI Data Flow

```
User Prompt

↓

AI Orchestrator

↓

Agent

↓

Tool Execution

↓

Database Log

↓

Frontend Response
```

---

# Backup Strategy

- Daily automated backups
- Point-in-time recovery
- Encrypted storage
- Multi-region redundancy (future)

---

# Security

- JWT Authentication
- HTTPS only
- Encrypted passwords
- Role-Based Access Control
- SQL Injection protection
- Audit logs
- Row-Level Security

---

# Future Database Expansion

Future tables may include:

- Smart Parking
- Merchandise Orders
- Drone Monitoring
- Digital Twin Data
- AI Vision Events
- Sustainability Metrics
- Sensor Data
- Predictive Maintenance
- Smart Energy Analytics

---

# Summary

The ArenaOS AI database is designed as a secure, scalable, and AI-ready relational architecture using Supabase PostgreSQL. It supports authentication, real-time communication, multi-agent workflows, stadium operations, and future expansion while maintaining data integrity and high performance.
