# Notes WebApp

Applicazione web collaborativa per la gestione e condivisione di note

## Team di Sviluppo

- Nabil Bouziane - [@nab3322](https://github.com/nab3322)
- Mattia Veroni - [@mattiaveroniunibo](https://github.com/mattiaveroniunibo)
- Nome Cognome - [@Si039mo](https://github.com/Si039mo)
- Nome Cognome - [@kryst4e](https://github.com/kryst4e)

## Descrizione Progetto

Applicazione web che permette agli utenti di:

- Creare e gestire note testuali (max 280 caratteri)
- Organizzare note in cartelle o con tag
- Condividere note con altri utenti
- Collaborare in tempo reale
- Mantenere versioning delle modifiche
- Cercare e filtrare contenuti

## Stack Tecnologico

### Backend

- Java 17+ - Linguaggio di programmazione
- Quarkus - Framework per applicazioni cloud-native
- PostgreSQL - Database relazionale
- JWT - Autenticazione basata su token
- Maven - Gestione dipendenze

### Frontend

- Angular 17 - Framework SPA
- TypeScript - Linguaggio tipizzato
- Node.js 20.19.0 - Runtime JavaScript
- Angular Material - Componenti UI

### DevOps

- Docker - Containerizzazione
- Docker Compose - Orchestrazione container
- GitHub Actions - CI/CD Pipeline
- JUnit 5 - Testing backend
- Karma/Jasmine - Testing frontend

## Quick Start

### Prerequisiti

- Java JDK 17 o superiore
- Node.js 20.19.0+
- Docker e Docker Compose
- Maven 3.8+
- Angular CLI (`npm install -g @angular/cli`)

### Installazione

1. Clona il repository

```bash
git clone https://github.com/nab3322/notes-webapp.git
cd notes-webapp
```

2. Avvia i servizi con Docker Compose

```bash
docker-compose up -d
```

3. Setup Backend

```bash
cd backend
./mvnw quarkus:dev
```

4. Setup Frontend

```bash
cd frontend
npm install
ng serve
```

5. Accedi all'applicazione

- Frontend: http://localhost:4200
- Backend API: http://localhost:8080
- Swagger UI: http://localhost:8080/q/swagger-ui

## Struttura Progetto

```
notes-webapp/
├── backend/                 # Applicazione Quarkus
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/       # Codice sorgente Java
│   │   │   └── resources/  # Configurazioni
│   │   └── test/           # Test unitari e integrazione
│   └── pom.xml
│
├── frontend/               # Applicazione Angular
│   ├── src/
│   │   ├── app/           # Componenti e servizi
│   │   ├── assets/        # Risorse statiche
│   │   └── environments/  # Configurazioni ambiente
│   └── package.json
│
├── docker/                 # Configurazioni Docker
│   ├── backend.Dockerfile
│   ├── frontend.Dockerfile
│   └── postgres/
│
├── docs/                   # Documentazione
│   ├── inception/         # Casi d'uso, modello dominio
│   ├── sprint-reports/    # Report degli sprint
│   └── manuals/          # Manuali utente/sviluppatore
│
├── .github/
│   ├── workflows/         # GitHub Actions CI/CD
│   └── ISSUE_TEMPLATE/    # Template per issues
│
└── docker-compose.yml     # Orchestrazione servizi
```

## Workflow di Sviluppo

### Branch Strategy

- `main` - Codice in produzione
- `develop` - Branch di sviluppo
- `feature/[sprint]-[nome]` - Feature branches
- `bugfix/[issue-number]` - Bug fixes
- `release/[version]` - Release preparation

### Processo di Sviluppo

1. Crea un issue nella board
2. Crea feature branch da `develop`
3. Sviluppa e testa localmente
4. Push e crea Pull Request
5. Code review (minimo 1 approval)
6. Merge in `develop` dopo CI pass

## Project Board

Utilizziamo GitHub Projects per gestire il lavoro:

- [Product Backlog](https://github.com/nab3322/notes-webapp/projects/1)
- [Sprint Attuale](https://github.com/nab3322/notes-webapp/projects/2)

### Colonne Board

- Product Backlog - User stories da implementare
- Sprint Backlog - Task dello sprint corrente
- In Progress - Task in lavorazione
- Review - In attesa di code review
- Testing - In fase di test
- Done - Completati

## Testing

### Backend Tests

```bash
cd backend
./mvnw test                    # Unit tests
./mvnw verify                  # Integration tests
./mvnw jacoco:report          # Coverage report
```

### Frontend Tests

```bash
cd frontend
npm test                       # Unit tests
npm run test:coverage         # Con coverage
npm run e2e                   # E2E tests
```

## CI/CD Pipeline

La pipeline automatica esegue:

1. Build del progetto
2. Esecuzione test unitari
3. Analisi coverage (minimo 70%)
4. Checkstyle e linting
5. Build immagini Docker
6. Deploy automatico (per branch main)

## Documentazione

- [Casi d'Uso](docs/inception/use-cases.md)
- [Modello di Dominio](docs/inception/domain-model.md)
- [API Documentation](http://localhost:8080/q/swagger-ui)
- [Manuale Utente](docs/manuals/user-manual.md)
- [Manuale Sviluppatore](docs/manuals/developer-manual.md)
- [GitHub Wiki](https://github.com/nab3322/notes-webapp/wiki)

## Contributing

1. Leggi le [linee guida per contribuire](CONTRIBUTING.md)
2. Controlla gli [issue aperti](https://github.com/nab3322/notes-webapp/issues)
3. Segui il nostro [code of conduct](CODE_OF_CONDUCT.md)

## Sprint Schedule

| Sprint   | Periodo  | Focus                    | Sprint Review |
| -------- | -------- | ------------------------ | ------------- |
| Sprint 0 | Sett 1   | Inception & Setup        | -             |
| Sprint 1 | Sett 2-3 | Auth & CRUD Base         | Data          |
| Sprint 2 | Sett 4-5 | Organizzazione & Ricerca | Data          |
| Sprint 3 | Sett 6-7 | Condivisione & Permessi  | Data          |
| Sprint 4 | Sett 8-9 | Conflitti & Polish       | Data          |

## Contatti

- Email Team: team@example.com
- Discord: [Link Discord Server]

## License

Questo progetto è rilasciato sotto licenza MIT - vedi il file [LICENSE](LICENSE) per i dettagli.

---

Progetto per il corso di Ingegneria del Software - A.A. 2024/2025  
Università di Bologna

