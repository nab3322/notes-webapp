
# Notes WebApp

**Collaborative web application for note management with automatic versioning and conflict handling.**

University Project | Software Engineering A.A. 2024/2025 | University of Bologna

---

## Overview

Notes WebApp is a cloud-native Single Page Application allowing users to create, organize, and share notes. It features a robust versioning system to track changes and an optimistic locking strategy to handle concurrent edits.

### Key Features
* **Authentication:** Secure Login/Register with JWT and BCrypt.
* **Note Management:** CRUD operations (max 280 chars per note).
* **Versioning:** Automatic history tracking with rollback capabilities.
* **Collaboration:** Share notes with granular permissions (READ/WRITE).
* **Conflict Handling:** Detection and resolution of concurrent modifications.
* **Organization:** Hierarchical folder structure and full-text search.
* **Quality:** Test coverage > 70%, CI/CD pipelines, Dockerized environment.

---

## Tech Stack

| Component | Technologies |
| :--- | :--- |
| **Backend** | Java 17, Quarkus 3.6.4, Hibernate Panache, SmallRye JWT |
| **Frontend** | Angular 17, TypeScript 5.2, Angular Material, RxJS |
| **Database** | PostgreSQL 15 (Production), H2 (Testing) |
| **DevOps** | Docker, Docker Compose, GitHub Actions |
| **Testing** | JUnit 5, JaCoCo, Cypress, REST Assured |

---

## Quick Start

The fastest way to run the application is via Docker Compose.

### Prerequisites
* Docker & Docker Compose
* Git

### Installation
```bash
# 1. Clone repository
git clone [https://github.com/nab3322/notes-webapp.git](https://github.com/nab3322/notes-webapp.git)
cd notes-webapp

# 2. Start services (Postgres, Backend, Frontend)
docker-compose up -d

# 3. Access application
# Frontend: http://localhost:4200
# Backend:  http://localhost:8080
# Swagger:  http://localhost:8080/q/swagger-ui
````

-----

## Development & Testing

### Backend (Quarkus)

```bash
cd backend
./mvnw quarkus:dev   # Start in Dev Mode (Hot Reload)
./mvnw test          # Run Unit Tests
./mvnw verify        # Run Integration Tests & Coverage Report
```

### Frontend (Angular)

```bash
cd frontend
npm install
ng serve             # Start Dev Server
npm test             # Run Unit Tests
```

### Project Structure

```text
notes-webapp/
├── backend/                 # Quarkus Application
│   ├── src/main/java/       # Source code (Controller, Service, Entity)
│   └── src/test/            # JUnit Tests
├── frontend/                # Angular Application
│   ├── src/app/features/    # Feature Modules (Auth, Dashboard, Notes)
│   └── src/app/core/        # Singleton Services
├── docker-compose.yml       # Orchestration
└── .github/workflows/       # CI Pipelines
```

-----

## API Documentation

Interactive API documentation (Swagger UI) is available at `http://localhost:8080/q/swagger-ui` when the backend is running.

**Main Endpoints:**

  * `POST /api/auth/login` - Obtain JWT Token
  * `GET  /api/notes` - List user notes
  * `POST /api/notes` - Create new note
  * `GET  /api/notes/{id}/versions` - Get note history
  * `POST /api/permissions/notes/{id}/share` - Share note

-----

## Team

| Member | Role | GitHub | Responsibility |
| :--- | :--- | :--- | :--- |
| **Nabil Bouziane** | Frontend Lead | [@nab3322](https://github.com/nab3322) | Core Logic, Routing, WebSocket |
| **Cristina Zungri** | Frontend Dev | [@kryst4e](https://github.com/kryst4e) | UI Components, E2E Testing |
| **Mattia Veroni** | Backend Lead | [@mattiaveroniunibo](https://github.com/mattiaveroniunibo) | Services, Controllers, Testing |
| **Simone Amadio** | DevOps & Backend | [@Si039mo](https://github.com/Si039mo) | CI/CD, Infrastructure |
```
```
