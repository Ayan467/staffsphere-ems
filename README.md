# Employee Management System (Full-Stack)

React + Bootstrap  ->  Spring Boot REST API  ->  MySQL

## Features
Add, view, update, delete employees - search - form validation (React + Spring) - REST API.

## Folder structure
```
employee-management-system/
├── backend/      Spring Boot (Java 17, Maven)
├── frontend/     React (Vite) + Bootstrap
├── database/     schema.sql, sample_data.sql
└── legacy-console/   (optional) your old console project
```

## Run
1. **Database**
   ```bash
   mysql -u root -p < database/schema.sql
   mysql -u root -p < database/sample_data.sql   # optional
   ```
2. **Backend** (http://localhost:8080)
   ```bash
   cd backend
   export DB_PASSWORD="your_password"      # Windows PowerShell: $env:DB_PASSWORD="your_password"
   mvn spring-boot:run
   ```
3. **Frontend** (http://localhost:5173)
   ```bash
   cd frontend
   npm install
   npm run dev
   ```

## REST API
| Method | URL | Purpose |
|---|---|---|
| GET | /api/employees | list all |
| GET | /api/employees?search=text | search name / email / department / designation |
| GET | /api/employees/{id} | one employee |
| POST | /api/employees | add |
| PUT | /api/employees/{id} | update |
| DELETE | /api/employees/{id} | delete |

Errors return `{ "message": "...", "errors": { "field": "reason" } }` with 400 / 404 / 409.
