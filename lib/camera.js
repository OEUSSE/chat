var Webcam = require('webcamjs')
var io = require('socket.io-client')
var socket = io()

var modal = document.querySelector('.modal-trigger')
var bloq = document.querySelector('#bloq-page')

function open_modal() {
  modal.style.display = 'block'
  bloq.style.display = 'block'

  showElements(true)

  Webcam.attach('#my_camera')
}

function take_snapshot() {
  showElements(false)

  Webcam.snap(function (data_uri) {
    document.getElementById('my_result').innerHTML = '<img id="image_snap" src="' + data_uri + '"/>'
  })
}

function send_file () {
  close_modal()
  let image = document.getElementById('image_snap')
  socket.emit('snap', image.src)
}

function delete_file () {
  showElements(true)
}

function showElements (show) {
  if (show) {
    document.querySelector('#my_camera').style.display = 'block'
    document.querySelector('#snap_button').style.display = 'block'

    document.querySelector('#my_result').style.display = 'none'
    document.querySelector('#send_button').style.display = 'none'
    document.querySelector('#delete_button').style.display = 'none'
  } else {
    document.querySelector('#my_camera').style.display = 'none'
    document.querySelector('#snap_button').style.display = 'none'

    document.querySelector('#my_result').style.display = 'block'
    document.querySelector('#send_button').style.display = 'block'
    document.querySelector('#delete_button').style.display = 'block'
  }
}

function close_modal() {
  modal.style.display = 'none'
  bloq.style.display = 'none'
  Webcam.reset()
}

document.getElementById('o-camera').addEventListener('click', open_modal, false)
document.getElementById('close-modal').addEventListener('click', close_modal, false)

document.getElementById('snap_button').addEventListener('click', take_snapshot, false)
document.getElementById('send_button').addEventListener('click', send_file, false)
document.getElementById('delete_button').addEventListener('click', delete_file, false)