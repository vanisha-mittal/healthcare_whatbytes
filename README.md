# Healthcare Management API

A RESTful backend for managing users, patients, doctors, and patient–doctor assignments. The API uses Node.js, Express, PostgreSQL, Sequelize, and JWT-based authentication.


## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** PostgreSQL
- **ORM:** Sequelize
- **Authentication:** JSON Web Tokens (`jsonwebtoken`)
- **Password hashing:** `bcryptjs`
- **Validation:** `express-validator`

## Prerequisites

Install:

- Node.js 
- npm
- A PostgreSQL database, such as a local PostgreSQL instance or a hosted provider such as Neon

## Setup

### 1. Clone the repository

```bash
git clone https://github.com/vanisha-mittal/healthcare_whatbytes
cd healthcare
```

### 2. Install dependencies

```bash
npm install
```

If your project does not already include the development dependencies, install the ones used by your implementation. For example:

```bash
npm install express sequelize pg pg-hstore dotenv cors helmet bcryptjs jsonwebtoken express-validator
npm install --save-dev nodemon
```

### 3. Configure environment variables

Create a `.env` file in the project root:

```env
PORT=5000
NODE_ENV=development

# PostgreSQL connection settings 
DB_HOST=localhost
DB_PORT=5432
DB_NAME=healthcare_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Use a long, random secret of at least 32 characters
JWT_SECRET=replace_with_a_random_secret_of_at_least_32_characters

# Frontend origin allowed by CORS
FRONTEND_URL=http://127.0.0.1:5500


### 5. Start the server

Development:

```bash
npm run dev
```
The server should start on `http://localhost:5000` unless `PORT` is changed.

## Authentication


## Example workflow

1. Register a user and log in.
2. Copy the JWT from the login response.
3. Create a patient using `POST /api/patients`.
4. Create a doctor using `POST /api/doctors`.
5. Assign the doctor using `POST /api/mappings`.
6. View assignments using `GET /api/mappings` or `GET /api/mappings/:patient_id`.
7. Remove an assignment using `DELETE /api/mappings/:id`.
