# 📚 Book Management System (MERN + TypeScript)

A full-featured **Book Management System** built with **Node.js, Express, MongoDB, TypeScript**, and a **React + Tailwind CSS frontend**.

This project supports **CRUD operations**, **search**, **filtering**, **sorting**, **pagination**, and **bulk delete**.

---

## 🚀 Features

### Backend
- Create, Read, Update, Delete (CRUD) books
- Search by:
  - Name
  - Author
  - Description
- Filter by **publish year**:
  - Equal
  - Greater than (`gt`)
  - Less than (`lt`)
  - Range (`gte`, `lte`)
- Sorting (ascending / descending)
- Field selection
- Pagination
- Delete:
  - Single book (by ID)
  - All books by name
  - Multiple selected books by name
- Type-safe APIs using TypeScript
- Proper error handling

### Frontend
- React + TypeScript
- Tailwind CSS UI
- Card-based book display
- Search input
- Pagination controls
- Responsive design

---

## 🛠 Tech Stack

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- TypeScript

### Frontend
- React
- TypeScript
- Tailwind CSS
- Axios
- Vite

---

## 📂 Project Structure

### Backend
```
backend/
│── src/
│   ├── controllers/
│   │   └── book.controller.ts
│   ├── models/
│   │   └── Book.ts
│   ├── routes/
│   │   └── book.routes.ts
│   ├── config/
│   │   └── db.ts
│   ├── app.ts
│   └── server.ts
│── package.json
│── tsconfig.json
│── .env
```

### Frontend
```
book-frontend/
│── src/
│   ├── components/
│   │   └── BookCard.tsx
│   ├── pages/
│   │   └── App.tsx
│   ├── services/
│   │   └── api.ts
│   ├── main.tsx
│   └── index.css
│── package.json
│── vite.config.ts
```

---

## ⚙️ Environment Variables

Create a `.env` file in the backend root:

```
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/book_db
```

---

## ▶️ Running the Project

### Backend
```
cd backend
npm install
npm run dev
```

Server runs at:
```
http://localhost:5000
```

---

### Frontend
```
cd book-frontend
npm install
npm run dev
```

Frontend runs at:
```
http://localhost:5173
```

---

## 🔗 API Endpoints

### ➕ Add Book
```
POST /api/books
```

```json
{
  "name": "Harry Potter",
  "author": "J.K. Rowling",
  "publishYear": 1997,
  "description": "Fantasy novel"
}
```

---

### 📖 Get Books (Search / Filter / Sort)

```
GET /api/books
```

#### Query Parameters
| Parameter | Example |
|--------|---------|
| name | `?name=harry` |
| author | `?author=rowling` |
| publishYear | `?publishYear=2005` |
| publishYear_gt | `?publishYear_gt=2000` |
| publishYear_lt | `?publishYear_lt=2010` |
| publishYear_gte | `?publishYear_gte=2000` |
| publishYear_lte | `?publishYear_lte=2010` |
| sort | `?sort=publishYear,-name` |
| select | `?select=name,author` |
| page | `?page=1` |
| limit | `?limit=5` |

---

### ✏️ Update Book
```
PUT /api/books/:id
```

---

### ❌ Delete Book by ID
```
DELETE /api/books/:id
```

---

### ❌ Delete Books by Name
```
DELETE /api/books/by-name?name=harry
```

---

### ❌ Delete Selected Books (Bulk)
```
DELETE /api/books/delete-selected
```

```json
{
  "names": ["Harry Potter", "Dune"]
}
```

---

## 🧪 Postman Tips

- HTTP Method: `DELETE`
- Headers:
```
Content-Type: application/json
```
- Request body must be **raw JSON**

---

## 🧠 Key Learnings

- Express query parameters are always strings
- MongoDB range filtering uses `$gt`, `$lt`, `$gte`, `$lte`
- Never `await` before chaining `.sort()`, `.select()`, `.limit()`
- Route order matters (`/by-name` before `/:id`)
- TypeScript helps catch bugs early

---

## 🔐 Future Improvements

- Authentication & Authorization
- Soft delete
- Role-based access
- Advanced frontend filters
- MongoDB indexes
- Redis caching
- Unit & integration tests

---

## 👨‍💻 Author

Built using **MERN Stack with TypeScript**  
Ideal for learning, production-ready APIs, and interview preparation.
