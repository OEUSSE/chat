/**
*
*/

var express = require('express')
var app = express()

var http = require('http').Server(app)
var io = require('socket.io')(http)

app.set('view engine', 'pug')

app.use(express.static('public'))

app.use('*', (req, res) => {
  //app.get('/', (req, res) => {
    res.render('index')
  //})
})

io.on('connection', function (socket) {
  var date = new Date()
  var now = date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds()
  console.log('User connected ' + now)

  socket.on('disconnect', function () {
    console.log('Socket disconnected ' + now)
  })

  socket.on('chat message', function (msg) {
    io.emit('chat message', msg)
  })

  socket.on('snap', function (imgSrc) {
    io.emit('snap', imgSrc)
  })
})

http.listen(8080, (err) => {
  if (err) return console.log('Hubo un error al tratar de montar el servidor.'), process.exit(1)
  console.log('Sevidor corriendo en el puerto 8080')
})
