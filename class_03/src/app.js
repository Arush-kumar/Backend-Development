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