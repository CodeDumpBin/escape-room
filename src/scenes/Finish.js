import Phaser from "../phaser.js"
import screenGameData from "./screens.js"
import Constants from "../constants.js"

export default class Start extends Phaser.Scene {
  constructor() {
    super("finish");
  }

  preload() {
    this.cameras.main.backgroundColor.setTo(241, 201, 140)
    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    // progressBox.fillRect(progressIndicatorStartAt, 270, 320, 50);
    var loadingText = this.make.text({ x: (width - 140) / 2, y: height / 2 - 50, text: 'Game Finished', style: { font: '18px monospace', fill: '#D83A56' } });

  }

  create() {

    var play = this.add.image(Constants.WIDTH / 2, Constants.HEIGHT / 2, 'button-start');
    play.setScale(0.3)
    play.setInteractive()


    play.on('pointerover', function () { play.setTint(0xf0ff00); }, this)
    play.on('pointerout', function () { play.setTint(0xffffff); }, this)
    play.on('pointerdown', function (ele) {
      // this.sound.play('audio_button')
      this.scene.start('start');
    }, this);




  }


  loaderUI() {
  }



}

//   platform
//   player
//   grounds = ['ground_snow', 'ground_grass', 'ground_sand', 'ground_wood', 'ground_cake'];
//   textProperty = {
//     fontSize: 20, color: "#0c0c36", fontWeight: 'bold', stroke: '#4e8572',
//     strokeThickness: 6,
//     fill: '#43d637',
//   };

//   constructor() {
//     super("start")
//   }
//   preload() {
//     this.load.image('background', 'assets/PNG/Background/bg_layer1.png')

//     for (let g = 0; g < this.grounds.length; g++) {
//       this.load.image(this.grounds[g], 'assets/PNG/Environment/' + this.grounds[g] + ".png")
//     }
//     this.load.image('bunny-jump', 'assets/PNG/Players/bunny1_jump.png')
//     this.load.audio('jump', 'assets/phaseJump1.ogg')
//     this.load.audio('coin-collected', 'assets/coin.wav')
//     this.load.image('bunny-stand', 'assets/PNG/Players/bunny1_stand.png')
//     this.load.image('carrot', 'assets/PNG/Items/carrot.png')
//     this.load.image('enemy', 'assets/PNG/Enemies/spikeMan_stand.png')
//     this.load.image('enemy-stuck', 'assets/PNG/Enemies/spikeMan_walk1.png')
//     this.load.image('bunny-hurt', 'assets/PNG/Players/bunny1_hurt.png')
//     this.load.audio('hit', 'assets/hit.wav')
//     // this.load.image('bird', 'assets/PngItem_1936084.png', {
//     this.load.spritesheet('bird', 'assets/player.png', {
//       frameWidth: 80, frameHeight: 110
//     })

//   }
//   create() {
//     this.add.image(400, 500, 'background').setScrollFactor(1, 0)
//     this.platform = this.physics.add.staticImage(Constants.WIDTH / 2, (Constants.HEIGHT / 2) + 100, 'ground_grass')
//     // this.platform = this.physics.add.staticImage(this.scale.width / 2, (this.scale.height / 2) + 100, 'ground_grass')
//     this.add.text((this.scale.width / 2) - 100, 10, 'Infinite Jumper', this.textProperty)
//     this.add.text((this.scale.width / 2) - 100, (this.scale.height / 2) + 200, 'Click to Play', this.textProperty)
//     this.player = this.physics.add.image(Constants.WIDTH / 2, (Constants.HEIGHT / 2) - 200, 'bunny-stand')
//     this.physics.add.collider(this.platform, this.player)

//   }

//   update() {

//     if (this.player.body.touching.down) {
//       this.player.setVelocityY(-200)
//       this.player.setTexture('bunny-jump')
//     }

//     const vy = this.player.body.velocity.y
//     if (vy > 0 && this.player.texture.key !== 'bunny-stand') {
//       this.player.setTexture('bunny-stand')
//     }

//     this.input.on('pointerup', function () {
//       this.scene.start('game')
//     }, this);

//   }
// }