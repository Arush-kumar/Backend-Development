# 📝 Notes API – Express Backend

## Overview

A simple REST API built using Node.js and Express.js to perform CRUD operations on notes.

This project helps you understand:
- Express routing
- Middleware
- REST API structure
- Testing APIs using Postman

---

## 🛠 Tech Stack

- Node.js
- Express.js
- Postman (for API testing)

---

## 📂 Project Structure

```
/class_02
  ├── src/app.js
  ├── server.js
  ├── package-lock.json
  ├── package.json
  
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Arush-kumar/Backend-Development.git
cd class_02
```

### 2️⃣ Install Dependencies

```bash
npm install
```

### 3️⃣ Run the Server

```bash
node server.js
```

Or using nodemon:

```bash
npx nodemon server.js
```

Or using script in package.json:

```bash
npm run dev
```

Server runs at:

```
http://localhost:3000
```

---

# 📡 API Endpoints

---

## 🏠 1. Test Route

### GET /

Returns a simple message.

**Response:**
```
Hello from Express!
```

---

## ➕ 2. Add a Note

### POST /notes

### 📥 Request Body (JSON)

```json
{
  "title": "Learn Express",
  "description": "Complete CRUD API"
}
```

### 📤 Response

```
Noted Added Successfully.
```

---

## 📄 3. Get All Notes

### GET /notes

### 📤 Response

```json
[
  {
    "title": "Learn Express",
    "description": "Complete CRUD API"
  }
]
```

---

##  4. Delete a Note
- here id like as array index
- notes = ["note1", "note2"]
note1 is at 0 index and note2 is at 1 index
---

### DELETE /notes/:id

Example:

```
DELETE /notes/0
```

### 📤 Response

```
Note Deleted Successfully.
```

⚠️ `id` is the array index.

---

## ✏️ 5. Update a Note

### PATCH /notes/:id

Example:

```
PATCH /notes/0
```

### 📥 Request Body

```json
{
  "description": "Updated description."
}
```

### 📤 Response

```
Note Updated Successfully.
```

---

# Testing with Postman

## Steps:

1. Open Postman  
2. Select HTTP method (GET, POST, DELETE, PATCH)  
3. Enter URL:

```
http://localhost:3000/notes
```

4. For POST and PATCH:
   - Go to Body
   - Select raw
   - Choose JSON
   - Paste your JSON data

5. Click Send

---

#  Middleware Used

```js
app.use(express.json())
```

This middleware parses incoming JSON request bodies.

Without this, `req.body` will be undefined.

---

# How Data is Stored

Currently, notes are stored in memory:

```js
const notes = []
```

⚠️ Data will reset when the server restarts because no database is connected.

---

# Future Improvements

- [ ] Add MongoDB database
- [ ] Add error handling
- [ ] Add validation
- [ ] Add unique IDs
- [ ] Return proper HTTP status codes
- [ ] Use MVC architecture

---

# app.js Code

```js
const express = require('express')

const app = express()
app.use(express.json())

const notes = []

app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

app.post('/notes', (req, res) => {
  notes.push(req.body)
  res.send("Noted Added Successfully.")
})

app.get('/notes', (req, res) => {
  res.send(notes)
})

app.delete('/notes/:id', (req, res) => {
  const { id } = req.params
  notes.splice(id, 1)
  res.send("Note Deleted Successfully.")
})

app.patch('/notes/:id', (req, res) => {
  notes[req.params.id].description = req.body.description
  res.send("Note Updated Successfully.")
})

module.exports = app
```

---

### server.js file code
```js
const app = require('./src/app')

app.listen(3000, () => console.log("Server is running on port 3000")
)
```
---

# 🎯 Learning Outcome

After completing this project, you understand:

- Express routing
- Middleware usage
- REST API structure
- Request params
- Request body
- API testing using Postman

---


Go to class_03_crud_with_status_code.md for further reading.

class_03 link here: [class_03](./class_03_crud_with_status_code.md)

Documentation link here:
[View All Docs](../Documents/)