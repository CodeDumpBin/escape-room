import Phaser from "./phaser.js"
import Start from "./scenes/Start.js"
import Game from "./scenes/Game.js"
import GameOver from "./scenes/GameOver.js"
import Room1 from "./scenes/Room1.js"
import Constants from "./constants.js"

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: Constants.WIDTH,
  pixelArt: true,
  //  * Constants.DEVICE_PIXEL_RATIO,
  height: Constants.HEIGHT,
  //  * Constants.DEVICE_PIXEL_RATIO,
  scene: [Room1],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 200 },
      debug: false
    }
  },
  input: {
    touch: {
      capture: true
    }
  },
  plugins: {
    global: [
      {
        key: 'Phaser3Swipe',
        plugin: Phaser3Swipe,
        start: true,
      }
    ]
  }

})