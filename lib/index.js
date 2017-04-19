var io = require('socket.io-client')
var socket = io()

var form = document.getElementById('form')
var messages = document.getElementById('messages')

form.addEventListener('submit', (ev) => {
  ev.preventDefault()

  let message = document.getElementById('m')

  if (message.value === '') return false

  if (message.value === 'clear') {
    messages.innerHTML = ''
    message.value = ''
    return false
  }

  socket.emit('chat message', message.value)
  message.value = ""
  return false
})

socket.on('chat message', function (msg) {
  let message = document.createElement('li')
  let span = document.createElement('span')

  span.textContent = msg

  message.appendChild(span)
  messages.appendChild(message)

  messages.scrollTop = messages.scrollHeight
})

socket.on('snap', function (imgSrc) {
  let message = document.createElement('li')
  let image = document.createElement('img')

  image.src = imgSrc
  image.style.width = '260px'
  
  message.appendChild(image)
  messages.appendChild(message)

  messages.scrollTop = messages.scrollHeight
})
