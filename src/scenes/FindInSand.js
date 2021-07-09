// http://phaser.io/examples/v3/view/physics/matterjs/collision-event

// https://github.com/marcosharbs/caveman-jigsaw-puzzle
// https://github.com/flbulgarelli/headbreaker
// https://github.com/omenking/pipezania
//  https://github.com/rantt/jigsaw

import Phaser from "../phaser.js"
import screenGameData from "./screens.js"
import Constants from "../constants.js"

export default class Start extends Phaser.Scene {
  constructor() {
    super("start");
    this.square = 3;
    this.background = {}
    this.left_side = 0;
    this.mkSprite;
    this.pieces = []
    // this.gameData = {
    //   itemsToCollect: screenGameData.itemsToCollect,
    //   itemsCollected: [],
    //   gameAssets: screenGameData.assets,
    //   screens: screenGameData.screens,
    //   commonScreen: screenGameData.commonScreen,
    //   gameState: "playing"
    // }
  }

  preload() {
    this.mkSprite = this.load.spritesheet('usa', "./assets/usa.jpg", { frameWidth: 100, frameHeight: 100 });


  }

  makeBox(x, y) {

    let bmd = this.add.rectangle(0, 0, x, y, 0x6666ff);
    bmd.setStrokeStyle(4, 0xefc53f);
    return bmd;
  }

  create() {
    let y = 0;
    let x = 1;

    for (let i = 0; i < 28; i++) {
      if (i % 7 === 0) {
        y += 1
        x = 0;
      }

      let _p = this.matter.add.sprite(x * 100, y * 100, 'usa', i)
      // this.physics.add.sprite(x * 100, y * 100, 'usa', i)
      // _p.alpha = 0;
      _p.setInteractive({ draggable: true })


      // https://rexrainbow.github.io/phaser3-rex-notes/docs/site/touchevents/
      // console.log(_p.on);
      _p.on('pointerover', function () { _p.setTint(0xf0ff00); }, this)
      _p.on('pointerout', function () { _p.setTint(0xffffff); }, this)
      _p.on('pointerdown', function () { }, this)
      _p.on('dragstart', function (drag) {
        this.children.bringToTop(_p)
      }, this)


      _p.on('drag', function (drag) {
        _p.setX(drag.worldX)
        _p.setY(drag.worldY)
      }, this)

      _p.on('dragend', function () {
        console.log("..drag stop");
      }, this)


      this.pieces.push({
        position: i,
        piece: _p
      })
      x += 1;
      console.log(this.pieces);
      // this.physics.add.collider(this.pieces, _p, this.checkCollision)




    }

    this.matter.world.on('collisionstart', function (event, bodyA, bodyB) {

      console.log("...collision.....");
      bodyA.gameObject.setTint(0xff0000);
      bodyB.gameObject.setTint(0x00ff00);
    })




  }


  loaderUI() {
  }

  checkCollision(p) {
    console.log(this, p)
  }

  // onDragStart: function(sprite, pointer) {
  //   this.game.world.bringToTop(sprite);
  // },
  // onDragStop: function(piece, pointer) {

  // 	var slot = this.background[piece.j+'_'+piece.i];

  // 	if (Phaser.Rectangle.intersects(piece.getBounds(), slot.getBounds())) {
  //     //Disable and place piece
  // 		this.game.world.sendToBack(piece);
  // 		slot.visible = false;
  // 		piece.inputEnabled = false;
  // 		piece.input.enableDrag(false);
  // 		piece.x = piece.initialX;
  // 		piece.y = piece.initialY;
  // 		this.slots.forEach(function(slot) {
  // 			this.game.world.sendToBack(slot);
  // 		},this);

  // 		this.won = this.checkWin();
  // 	}

  // }



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