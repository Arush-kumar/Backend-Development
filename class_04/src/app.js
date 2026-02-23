const express =  require('express')
const NoteModel = require('./models/notes.model')
const app = express()
app.use(express.json())

/** 
  * - @Route POST /notes
  * - @description Add a new note
  * - req.body => {title, description}
*/
app.post('/notes', async (req, res) => {
    const { title, description } = req.body

    const note = await NoteModel.create({
      title,
      description
    })

    res.status(201).json({
      message: "Note Created Successfully.",
      note
    })
})

/** 
  * - @Route GET /notes
  * - @description fetch all notes
*/
app.get('/notes', async (req, res) => {
  const notes = await NoteModel.find()

  res.status(200).json({
    message: "Notes Fetched Successfully.",
    notes
  })
})

/** 
  * - @Route PATCH /notes/:id
  * - @description Update a partial part of the note
  * - req.body => {description}
*/
app.patch('/notes/:id', async (req, res) => {
  const { id } = req.params
  const { description } = req.body

  const note = await NoteModel.findByIdAndUpdate(id, {
    description: description
  })

  res.status(200).json({
    message: "Note Updated Successfully.",
    note
  })
})

/** 
  * - @Route PUT /notes/:id
  * - @description Update a whole note
  * - req.body => {title, description}
*/
app.put('/notes/:id', async (req, res) => {
  const { id } = req.params

  const note = await NoteModel.findByIdAndUpdate(id, req.body)

  res.status(200).json({
    message: "Note Updated Successfully.",
    note
  })
})

/** 
  * - @Route DELETE /notes/:id
  * - @description Delete a note

*/
app.delete('/notes/:id', async (req, res) => {
  const { id } = req.params

  const note = await NoteModel.findByIdAndDelete(id)

  res.status(200).json({
    message: "Note Deleted Successfully.",
    note
  })
})

module.exports = app