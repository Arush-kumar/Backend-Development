# 📝 Notes API – Express Backend (With Status Codes)

##  Overview

This is a simple REST API built using **Node.js** and **Express.js**.

The API allows you to:
- Create a note
- Get all notes
- Update a note
- Delete a note

The project demonstrates:
- Express routing
- Middleware usage
- Proper HTTP status codes
- API structure separation (`app.js` and `server.js`)

---

# 📂 Project Structure

```
/class_03
  ├── server.js
  ├── /src
       ├── app.js
  ├── package.json
  ├── package-lock.json
  ├── README.md
```

---

# ⚙️ Installation & Setup

### 1️⃣ Install Dependencies

```bash
npm install express
```

### 2️⃣ Run Server

```bash
node server.js
```

Server will run at:

```
http://localhost:3000
```

---

#  app.js (Application Logic)

```js
const express =  require('express')

const app = express()
app.use(express.json())

const notes = []

/**
 * @Route POST /notes
 * @description Add a new note in the notes array
*/
app.post('/notes', (req, res) => {

  notes.push(req.body)

  res.status(201).json({
    message: "Note Created Successfully."
  })
})

/**
 * @Route GET /notes
 * @description Get all notes
*/
app.get('/notes', (req, res) => {
  res.status(200).json({
    message: "Notes Fetched Successfully.",
    notes: notes
  })
})

/**
 * @Route DELETE /notes/:id
 * @description Delete a note 
 * @param req.params => { id }
*/
app.delete('/notes/:id', (req, res) => {
  const {id} = req.params
  notes.splice(id, 1)

  res.status(200).json({
    message: "Note Deleted Successfully."
  })
})

/**
 * @Route PATCH /notes/:id
 * @description Update a note single field
 * @param req.params => { id }
 * @param req.body => { description }
*/
app.patch('/notes/:id', (req, res) => {
  const {id} = req.params
  const {description} = req.body
  notes[id].description = description

  res.status(200).json({
    message: "Note Updated Successfully."
  })
})

module.exports = app
```

---

# 🚀 server.js (Server Entry Point)

```js
const app = require('./src/app')

app.listen(3000, () => 
  console.log("Server is running on port 3000")
)
```

---

# 📡 API Endpoints

## ➕ Create Note

**POST** `/notes`

### Request Body
```json
{
  "title": "Learn Express",
  "description": "Build CRUD API"
}
```

### Response
```json
{
  "message": "Note Created Successfully."
}
```

Status Code: **201**

---

## 📄 Get All Notes

**GET** `/notes`

### Response
```json
{
  "message": "Notes Fetched Successfully.",
  "notes": []
}
```

Status Code: **200**

---

## ❌ Delete Note

**DELETE** `/notes/:id`

Status Code: **200**

---

## ✏️ Update Note

**PATCH** `/notes/:id`

### Request Body
```json
{
  "description": "Updated description"
}
```

Status Code: **200**

---

# 🔢 Understanding HTTP Status Codes

HTTP status codes tell the client (Postman, browser, frontend app) what happened with the request.

They make your API professional and production-ready.

---

## ✅ 200 – OK

**When to use:**
- Data fetched successfully
- Data deleted successfully
- Data updated successfully

Example:
```js
res.status(200).json({...})
```

Meaning: Request was successful.

---

## 🆕 201 – Created

**When to use:**
- New resource is created (POST request)

Example:
```js
res.status(201).json({...})
```

Meaning: Something new was successfully created.

---

## ❌ 400 – Bad Request (Not used yet but important)

**When to use:**
- Missing required fields
- Invalid request data

Example:
```js
res.status(400).json({
  message: "Title is required"
})
```

---

## 🚫 404 – Not Found (Future improvement)

**When to use:**
- Resource does not exist
- Wrong route

---

## 🔥 500 – Internal Server Error

**When to use:**
- Unexpected server crash
- Database failure

---

# 🎯 Why Status Codes Are Important

- Help frontend understand success or failure
- Improve debugging
- Follow REST API standards
- Make API production-ready
- Required in real-world backend jobs

Without proper status codes, your API is not considered professional.

---

# 🧪 Testing With Postman

1. Open Postman
2. Select request method (GET, POST, DELETE, PATCH)
3. Enter:

```
http://localhost:3000/notes
```

4. For POST/PATCH:
   - Go to Body
   - Select raw
   - Choose JSON
   - Send request

---

# 🚀 Future Improvements

- [ ] Add input validation
- [ ] Add error handling
- [ ] Add MongoDB
- [ ] Add unique IDs instead of array index
- [ ] Add try/catch blocks
- [ ] Implement MVC architecture

---

# 📚 Learning Outcome

After completing this project, you understand:

- Express app structure
- Separation of app and server
- REST API design
- Middleware
- HTTP status codes
- API testing using Postman

---

Go to class_02_crud_operation.md for further reading.

class_02 link here: [class_02](./class_02_crud_operation.md)

Documentation link here:
[View All Docs](../Documents/)