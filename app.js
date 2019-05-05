const express = require('express')
const path = require('path')
const fs = require('mz/fs')
const mime = require('mime')

const app = express()

app.use(express.static('movies'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.get('/', async (req, res) => {
  const movies = await fs.readdir('./movies')
  console.log(movies)

  res.render('index', {
    movies,
  })
})

app.get('/watch/:movie', function(req, res) {
  const movie = req.params.movie
  const movieType = mime.getType(movie)
  const subtitle = movie.replace(/mp4|mkv|avi/, 'smi')

  res.render('watch', {
    movie,
    movieType,
    subtitle,
  })
})

app.get('/login', function(req, res) {
  res.send('<h1>Login please</h1>')
})

app.listen(7777, function() {
  console.log('Conneted 3000 port!')
})
