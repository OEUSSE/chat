var io = require('socket.io-client')
var socket = io()

var form = document.getElementById('form')

form.addEventListener('submit', function (ev) {
  ev.preventDefault()
  let message = document.getElementById('m')

  if (message.value === '') return false
  
  socket.emit('chat message', message.value)
  message.value = ""
  return false
})

socket.on('chat message', function (msg) {
  let message = document.createElement('li')
  let span = document.createElement('span')
  span.textContent = msg

  let messages = document.getElementById('messages')
  message.appendChild(span)
  messages.appendChild(message)
})
