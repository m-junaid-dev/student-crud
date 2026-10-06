# Student CRUD (Node.js + Express + MongoDB + Mongoose + React)

## Requirements
- Node.js 18+
- MongoDB running locally (or a MongoDB Atlas URI)

## Run

### 1) Backend (terminal 1)
    cd backend
    npm install
    npm start          # http://localhost:5000

Edit `backend/.env` if your MongoDB URI is different.

### 2) Frontend (terminal 2)
    cd frontend
    npm install
    npm run dev        # http://localhost:5173

## API
| Method | URL                    | Action            |
|--------|------------------------|-------------------|
| POST   | /api/students          | Add new record    |
| GET    | /api/students          | Get all records   |
| GET    | /api/students/:id      | Get single record |
| PUT    | /api/students/:id      | Update record     |
| DELETE | /api/students/:id      | Delete record     |

Import `Student-CRUD.postman_collection.json` into Postman to test.
