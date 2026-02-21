const express = require('express') // to config express
const app = express() // to create a server 

// to create a route 
app.get('/', (req, res) => {
  res.send('Hello, This is my first express server!')
})

app.listen(3000, () => console.log('Server is running on port 3000')) // to start the server


