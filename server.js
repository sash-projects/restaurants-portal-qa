const express = require('express')
const jsonServer = require('json-server')
const path = require('path')

const app = express()
const port = process.env.PORT || 3000

// Pliki statyczne
app.use(express.static(path.join(__dirname, 'public')))

// JSON Server
const apiRouter = jsonServer.router('db.json')
const middlewares = jsonServer.defaults()

//  dane JSON 
app.use(middlewares)
app.use(apiRouter)

app.get('*', (req, res) => {
  const filePath = path.join(__dirname, 'public', req.path)

  // wysyłamy plik
  res.sendFile(filePath, err => {
    if (err) {
     
      res.sendFile(path.join(__dirname, 'public', 'index.html'))
    }
  })
})

app.listen(port, () => {
  console.log(`Serwer działa na http://localhost:${port}`)
})
