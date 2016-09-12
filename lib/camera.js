var Webcam = require('webcamjs')

var modal = document.querySelector('.modal-trigger')

document.getElementById('o-camera').addEventListener('click', open_modal, false)
document.getElementById('close-modal').addEventListener('click', close_modal, false)

function open_modal() {
  modal.style.display = 'block'
  Webcam.attach('#my_camera')
}

function take_snapshot() {
  Webcam.snap(function (data_uri) {
    document.getElementById('my_result').innerHTML = '<img src="' + data_uri + '"/>'
  })
}

function close_modal() {
  modal.style.display = 'none'
  Webcam.reset()
}
