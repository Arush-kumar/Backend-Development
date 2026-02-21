const express = require('express')

const app = express()
//use middleware to fetch data req.body
app.use(express.json())

// Dummy data to add in notes, just for testing purposes 
// We will remove this later,we will add data form postman api
const notes = [
  // {
  //   "title": "First title",
  //   "description": "First description"
  // }
]

/**
 * @Route GET /
*/
app.get('/', (req, res) => {
  res.send('Hello from Express!')
})

/**
 * @Route POST /notes
 * req.body => { title, description }
 * 
*/
app.post('/notes', (req, res) => {
  console.log(req.body);

  notes.push(req.body)
  console.log(notes);

  res.send("Noted Added Successfully.")
  
})

/**
 * @Route GET /notes
*/
app.get('/notes', (req, res) => {
  res.send(notes)
})


/**
 * @Route DELETE /notes/:id
 * req.params => id
*/
app.delete('/notes/:id', (req, res) => {
  const { id } = req.params
  notes.splice(id, 1)
  res.send("Note Deleted Successfully.")
})

/**
 * @Route PATCH /notes/:id
 * req.body : { description: "Updated description."}
*/
app.patch('/notes/:id', (req, res) => {
  notes[req.params.id].description = req.body.description
  res.send("Note Updated Successfully.")

})

module.exports = app