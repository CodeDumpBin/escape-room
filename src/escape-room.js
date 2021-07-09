import Phaser from "./phaser.js"
import Start from "./scenes/Start.js"
import Game from "./scenes/Game.js"
import GameOver from "./scenes/GameOver.js"
import Room1 from "./scenes/Room1.js"
import Finish from "./scenes/Finish.js"
import Constants from "./constants.js"
import Jigsaw from "./scenes/Jigsaw.js"
// import FloodFill from "./scenes/FloodFill.js"
import CustomGame from './scenes/CustomGame.js'

export default new Phaser.Game({
  type: Phaser.AUTO,
  width: Constants.WIDTH,


  pixelArt: true,
  //  * Constants.DEVICE_PIXEL_RATIO,
  height: Constants.HEIGHT,
  //  * Constants.DEVICE_PIXEL_RATIO,
  scene: [Start, Room1, Finish],
  // scene:[Jigsaw],
  // parent: 'phaser-example',
  // scene:[FloodFill],
  // scene: [CustomGame],

  // scene: [Room1],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: true
    },
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