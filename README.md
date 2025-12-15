# Notes WebApp

**Applicazione web collaborativa per la gestione di note con versionamento automatico e gestione dei conflitti.**

Progetto Universitario | Ingegneria del Software A.A. 2024/2025 | Università di Bologna

---

## Panoramica

Notes WebApp è una Single Page Application cloud-native che permette agli utenti di creare, organizzare e condividere note. Dispone di un robusto sistema di versionamento per tracciare le modifiche e di una strategia di *optimistic locking* per gestire le modifiche concorrenti.

### Funzionalità Chiave
* **Autenticazione:** Login/Registrazione sicura con JWT e BCrypt.
* **Gestione Note:** Operazioni CRUD (massimo 280 caratteri per nota).
* **Versionamento:** Tracciamento automatico della cronologia con funzionalità di ripristino (rollback).
* **Collaborazione:** Condivisione delle note con permessi granulari (LETTURA/SCRITTURA).
* **Gestione Conflitti:** Rilevamento e risoluzione delle modifiche simultanee.
* **Organizzazione:** Struttura gerarchica delle cartelle e ricerca full-text.
* **Qualità:** Copertura dei test > 70%, pipeline CI/CD, ambiente Dockerizzato.

---

## Stack Tecnologico

| Componente | Tecnologie |
| :--- | :--- |
| **Backend** | Java 17, Quarkus 3.6.4, Hibernate Panache, SmallRye JWT |
| **Frontend** | Angular 17, TypeScript 5.2, Angular Material, RxJS |
| **Database** | PostgreSQL 15 (Produzione), H2 (Testing) |
| **DevOps** | Docker, Docker Compose, GitHub Actions |
| **Testing** | JUnit 5, JaCoCo, Cypress, REST Assured |

---

## Quick Start

Il modo più veloce per eseguire l'applicazione è tramite Docker Compose.

### Prerequisiti
* Docker & Docker Compose
* Git

### Installazione
```bash
# 1. Clona il repository
git clone [https://github.com/nab3322/notes-webapp.git](https://github.com/nab3322/notes-webapp.git)
cd notes-webapp

# 2. Avvia i servizi (Postgres, Backend, Frontend)
docker-compose up -d

# 3. Accedi all'applicazione
# Frontend: http://localhost:4200
# Backend:  http://localhost:8080
# Swagger:  http://localhost:8080/q/swagger-ui
````

-----

## Sviluppo & Testing

### Backend (Quarkus)

```bash
cd backend
./mvnw quarkus:dev   # Avvia in Dev Mode (Hot Reload)
./mvnw test          # Esegui Unit Test
./mvnw verify        # Esegui Integration Test & Report Copertura
```

### Frontend (Angular)

```bash
cd frontend
npm install
ng serve             # Avvia Dev Server
npm test             # Esegui Unit Test
```

### Struttura del Progetto

```text
notes-webapp/
├── backend/                 # Applicazione Quarkus
│   ├── src/main/java/       # Codice sorgente (Controller, Service, Entity)
│   └── src/test/            # Test JUnit
├── frontend/                # Applicazione Angular
│   ├── src/app/features/    # Moduli Feature (Auth, Dashboard, Notes)
│   └── src/app/core/        # Servizi Singleton
├── docker-compose.yml       # Orchestrazione
└── .github/workflows/       # Pipeline CI
```

-----

## Documentazione API

La documentazione interattiva delle API (Swagger UI) è disponibile su `http://localhost:8080/q/swagger-ui` quando il backend è in esecuzione.

**Endpoint Principali:**

  * `POST /api/auth/login` - Ottieni Token JWT
  * `GET  /api/notes` - Lista note utente
  * `POST /api/notes` - Crea nuova nota
  * `GET  /api/notes/{id}/versions` - Ottieni cronologia nota
  * `POST /api/permissions/notes/{id}/share` - Condividi nota

-----

## Team

| Membro | Ruolo | GitHub | Responsabilità |
| :--- | :--- | :--- | :--- |
| **Nabil Bouziane** | Frontend Lead | [@nab3322](https://github.com/nab3322) | Logica Core, Routing, WebSocket |
| **Cristina Zungri** | Frontend Dev | [@kryst4e](https://github.com/kryst4e) | Componenti UI, E2E Testing |
| **Mattia Veroni** | Backend Lead | [@mattiaveroniunibo](https://github.com/mattiaveroniunibo) | Servizi, Controller, Testing |
| **Simone Amadio** | DevOps & Backend | [@Si039mo](https://github.com/Si039mo) | CI/CD, Infrastruttura |

```
```
