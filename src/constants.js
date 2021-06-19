
//  window.innerWidth,
let _width = window.innerWidth * window.devicePixelRatio
let _height = window.innerHeight * window.devicePixelRatio
export default {
  WIDTH: _width > 720 ? 720 : _width,
  HEIGHT: _height > 600 ? 600 : _height,
  DEVICE_PIXEL_RATIO: window.devicePixelRatio,
  BACKGROUND: "#feca26"
}
// window.innerHeight,

//  window.innerWidth,
// export default {
//   WIDTH: 720,
//   HEIGHT: 600,
//   DEVICE_PIXEL_RATIO: window.devicePixelRatio
// }
