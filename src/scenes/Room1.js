import Phaser from "../phaser.js"
import Carrot from "../game/Carrot.js"
import Enemy from "../game/Enemy.js"
import Constants from "../constants.js"


export default class Room1 extends Phaser.Scene {
  constructor() {
    super('room1')
    this.box = [];
    this.collectibles = new Array(5);
    this.pages = 5;
    this.game_screens = new Array(5);
    this.page1 = null;
    this.collectedItems = null
  }
  preload() {
    this.load.image('background', 'assets/bg-yellow.png')
    this.load.image('background-2', 'assets/background-2.png')
    this.load.image('background-3', 'assets/background-3.png')
    // this.load.image('background-4', 'assets/background-4.png')

    this.load.image('background-5', 'assets/background-5.png')
    this.load.image('background-blue', 'assets/background01_blue.png')
    this.load.image('door-opened', 'assets/door-opened.png')
    this.load.image('door-closed', 'assets/door-closed.png')


    this.load.image('clock', 'assets/clock.png')
    this.load.image('painting-1', 'assets/painting-1.png')
    this.load.image('painting-2', 'assets/painting-2.png')
    this.load.image('painting-3', 'assets/painting-3.png')
    this.load.image('sofa', 'assets/sofa.png')
    this.load.image('table', 'assets/table.png')
    this.load.image('floor', 'assets/floor.png')
    this.load.image('pot', 'assets/pot.png')
    this.load.image('box', 'assets/treasure-box.png')
    this.load.image('box-open', 'assets/treasure-box-open.png')
    this.load.image('arrow', 'assets/arrow.png')
    this.load.image('key', 'assets/key.png')
    // this.load.image('box-open', 'assets/treasure-box-open.png')
    // this.load.audio('coin-collected', 'assets/coin.wav')


    this.load.audio('audio_bg', 'assets/bg.wav')
    this.load.audio('audio_button', 'assets/button.mp3')
    this.load.audio('audio_collect', 'assets/collect.mp3')
    this.load.audio('audio_drawopen', 'assets/drawopen.mp3')
    this.load.audio('audio_numchange', 'assets/numchange.mp3')


  }

  create() {
    this.screen2(1)
    this.screen3(2)
    this.screen4(3)
    this.screen5(4)
    this.screen1(0)
    this.collectedItems = this.add.container(0, 0)
    for (var c = 0; c < this.collectibles.length; c++) {
      this.collectedItems.add(this.makeCollectionBoard(c))
    }
  }

  screen1(screenNumber) {
    let screen = this.add.container(0, 0);
    screen.add(this.add.image(360, 300, 'background').setScrollFactor(1, 0))
    let clock = this.add.image(560, 100, 'clock').setScrollFactor(1, 0).setScale(0.9);
    clock.setInteractive()
    clock.on('pointerover', function () { clock.setTint(0xf0ff00); }, this)
    clock.on('pointerout', function () { clock.setTint(0xffffff); }, this)
    clock.on('pointerdown', function () {
      this.soundOpen();
    }, this);
    screen.add(clock)


    screen.add(this.add.image(160, 90, 'painting-1').setScrollFactor(1, 0).setScale(0.9))
    screen.add(this.add.image(360, 90, 'painting-2').setScrollFactor(1, 0).setScale(0.9))
    screen.add(this.add.image(250, 160, 'painting-3').setScrollFactor(1, 0).setScale(0.9))
    screen.add(this.add.image(340, 550, 'floor').setScrollFactor(1, 0).setScale(1.3))
    screen.add(this.add.image(340, 360, 'sofa').setScrollFactor(1, 0).setScale(0.7))
    screen.add(this.add.image(340, 450, 'table').setScrollFactor(1, 0).setScale(1))

    let pot = this.add.image(440, 280, 'pot').setScrollFactor(1, 0).setScale(1);
    pot.setInteractive()
    pot.on('pointerover', function () { pot.setTint(0xf0ff00); }, this)
    pot.on('pointerout', function () { pot.setTint(0xffffff); }, this)
    pot.on('pointerdown', function () {
      this.soundOpen();
    }, this);
    screen.add(pot)


    this.makeBox({ x: 150, y: 320 }, screen)
    // this.makeBox({ x: 350, y: 320 }, screen)

    this.navigateBetweenScreen(screenNumber, screen)
  }


  screen2(screenNumber) {
    let screen = this.add.container(0, 0);
    screen.alpha = 0;
    screen.add(this.add.image(360, 300, 'background-2'))
    let key = this.add.image(360, 300, 'key')
    key.setInteractive()
    key.on('pointerover', function () { key.setTint(0xf0ff00); }, this)
    key.on('pointerout', function () { key.setTint(0xffffff); }, this)
    key.setDepth(1);
    key.on('pointerdown', function (ele) {
      this.soundOpen();
      ele.x = 150
      key.setScale(0.5)
      key.setX(60)
      key.setY(550)
      console.log("...cllllll")
      this.collectedItems.add(key)
    }, this);
    screen.add(key)
    // if (this.collectedItems !== null)
    this.navigateBetweenScreen(screenNumber, screen)
  }

  addImageToCollectibles() {

  }


  screen3(screenNumber) {
    let screen = this.add.container(0, 0);
    screen.alpha = 0;
    screen.add(this.add.image(360, 300, 'background-3'))
    screen.add(this.add.image(340, 550, 'floor'))
    this.navigateBetweenScreen(screenNumber, screen)
  }


  navigateBetweenScreen(screenNumber, screen) {
    this.arrow("left", screenNumber == 0 ? this.game_screens.length - 1 : screenNumber - 1, screen)
    this.arrow("right", screenNumber == this.game_screens.length - 1 ? 0 : screenNumber + 1, screen)
    this.game_screens[screenNumber] = screen
  }

  screen4(screenNumber) {
    let screen = this.add.container(0, 0);
    screen.alpha = 0;
    screen.add(this.add.image(360, 300, 'background-5'))
    screen.add(this.add.image(340, 550, 'floor'))

    let door_closed = this.add.image(500, 320, 'door-closed').setScale(1.4);
    door_closed.setInteractive()
    door_closed.flipX =  true
    door_closed.on('pointerover', function () { door_closed.setTint(0xf0ff00); }, this)
    door_closed.on('pointerout', function () { door_closed.setTint(0xffffff); }, this)
    door_closed.on('pointerdown', function () {
      this.soundOpen();
      door_closed.setTexture('door-opened')
    }, this);
    screen.add(door_closed)
    this.navigateBetweenScreen(screenNumber, screen)
  }




  screen5(screenNumber) {
    let screen = this.add.container(0, 0);
    screen.alpha = 0;
    screen.add(this.add.image(360, 300, 'background-5'))
    screen.add(this.add.image(340, 550, 'floor'))

    let door_closed = this.add.image(500, 320, 'door-closed').setScale(1.4);
    door_closed.setInteractive()
    door_closed.on('pointerover', function () { door_closed.setTint(0xf0ff00); }, this)
    door_closed.on('pointerout', function () { door_closed.setTint(0xffffff); }, this)
    door_closed.on('pointerdown', function () {
      this.soundOpen();
    }, this);
    screen.add(door_closed)
    this.navigateBetweenScreen(screenNumber, screen)
  }


  update() {
    console.log("...update.....")
  }


  makeBox(position, container) {
    let box = this.add.image(position.x, position.y, 'box').setScrollFactor(1, 0).setScale(1)
    box.setInteractive()
    box.on('pointerover', function () { box.setTint(0xf0ff00); }, this)
    box.on('pointerout', function () { box.setTint(0xffffff); }, this)
    box.on('pointerdown', function () {
      console.log(this.collectedItems)
      this.soundOpen();
      box.setTexture('box-open')
    }, this);
    container.add(box)
  }

  makeCollectionBoard(c) {
    let cb = this.add.rectangle(60 + (c * 100), 554, 88, 88, 0x444444);
    cb.setStrokeStyle(4, 0xefc53f);
    return cb;
  }

  soundOpen() {
    this.sound.play('audio_button')
  }

  arrow(direction, screen, container) {
    let _this = this;
    let arrow = this.add.image(direction == "right" ? 660 : 60, 240, 'arrow').setScrollFactor(1, 0).setScale(1);
    if (direction == "right")
      arrow.flipX = true
    arrow.setInteractive()
    arrow.on('pointerover', function () { arrow.setTint(0xf0ff00); }, this)
    arrow.on('pointerout', function () { arrow.setTint(0xffffff); }, this)
    arrow.on('pointerdown', function () {
      this.soundOpen();
      console.log(screen)
      this.game_screens.forEach((f) => {
        f.alpha = 0
      })
      this.game_screens[screen].alpha = 1;
    }, this);
    container.add(arrow)

  }
}

//   player
//   platforms
//   cursor
//   carrots
//   enemies
//   carrotsCollected = 0
//   bunnySpeed = -400;
//   carrotsCollectedText;
//   latestPlatform;
//   distX;
//   upX;
//   distY;
//   upY;
//   dist;
//   pi;
//   moveThreshold = 25;
//   swipe;
//   isClicking = false;
//   swipeDirection;
//   platformVerticalDistance = [0, Constants.WIDTH]


//   grounds = ['ground_snow', 'ground_grass', 'ground_sand', 'ground_wood', 'ground_cake'];
//   constructor() {
//     super("game")
//     this.bird = null;
//   }
//   init() {
//     this.carrotsCollected = 0
//   }
//   preload() {
//     this.cursor = this.input.keyboard.createCursorKeys()

//   }
//   create() {
//     // width: WIDTH * DEVICE_PIXEL_RATIO,
//     // height: HEIGHT * DEVICE_PIXEL_RATIO,

//     this.add.image(240, 320, 'background').setScrollFactor(1, 0)
//     this.platforms = this.physics.add.staticGroup()
//     const max = 8;
//     const min = 2;
//     for (let i = 0; i < 5; ++i) {
//       const x = Phaser.Math.Between(...this.platformVerticalDistance)
//       const y = 150 * i;
//       const platform = this.platforms.create(x, y, this.grounds[Math.floor(Math.random() * this.grounds.length)])
//       platform.scale = 0.5;
//       // =
//       //   Math.floor(Math.random() * (max - min + 1) + min) / 10;
//       const body = platform.body;
//       body.updateFromGameObject();
//     }

//     // this.player = this.physics.add.sprite(240, 320, 'bunny-stand').setScale(0.3)
//     this.player = this.physics.add.sprite(240, 320, 'bird')

//     this.physics.add.collider(this.platforms, this.player)
//     this.player.body.checkCollision.up = false
//     this.player.body.checkCollision.left = false
//     this.player.body.checkCollision.right = false
//     this.cameras.main.startFollow(this.player)
//     this.cameras.main.setDeadzone(this.scale.width * 1.5)
//     this.carrots = this.physics.add.group({ classType: Carrot })
//     this.enemies = this.physics.add.group({ classType: Enemy })
//     this.carrots.get(20, 500, 'carrot')
//     this.enemies.get(200, 500, 'enemy')
//     this.physics.add.collider(this.carrots, this.platforms)
//     this.physics.add.collider(this.enemies, this.platforms)
//     this.physics.add.collider(this.player, this.carrots, this.handleCollectCarrot, undefined, this)
//     this.physics.add.collider(this.player, this.enemies, this.handleEnemy, undefined, this)
//     this.carrotsCollectedText = this.add.text(240, 10, 'Carrots : 0', { color: '#000', fontSize: 24 }).setScrollFactor(0).setOrigin(0.5, 0)
//     // this.physics.add.collider(this.bird, this.platforms)

//     this.anims.create({
//       key: 'fly', frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 9 }),
//       frameRate: 9,
//       repeat: -1
//     })

//     console.log(this.player.play('fly'));
//     // this.bird.play();


//   }
//   update(t, dt) {

//     this.platforms.children.iterate(child => {
//       const platform = child
//       const scrollY = this.cameras.main.scrollY;
//       if (platform.y >= scrollY + 700) {
//         platform.y = scrollY - Phaser.Math.Between(50, 100)
//         platform.body.updateFromGameObject()
//         this.latestPlatform = platform;
//         this.addCarrotAbove(platform)
//         if (t % 7000) {
//           // console.log(t)
//           // console.log("..enemy added")
//           this.addEnemiesAbove(platform)

//         }

//       }
//     })


//     const touchingDown = this.player.body.touching.down

//     if (touchingDown) {
//       this.player.setVelocityY(this.bunnySpeed)
//       this.sound.play('jump');
//       // this.player.setTexture('bunny-jump')
//     }
//     if (this.cursor.left.isDown && !touchingDown) {
//       this.player.setVelocityX(-200)
//     }
//     else if (this.cursor.right.isDown && !touchingDown) {
//       this.player.setVelocityX(200)
//     }

//     else if (!this.input.activePointer.isDown && !touchingDown) {
//       // console.log('...input point distance', this.input.activePointer.downX - this.input.activePointer.upX, ' input pointer duration..', this.input.activePointer.upTime - this.input.activePointer.downTime)
//       let _d = Math.abs(this.input.activePointer.downX - this.input.activePointer.upX);
//       let _t = (this.input.activePointer.upTime - this.input.activePointer.downTime) / 10
//       let calculateVelocity = _d / _t;
//       let velocityFactor = calculateVelocity && calculateVelocity > 1 ? calculateVelocity : 1;
//       if (this.input.activePointer.downX > this.input.activePointer.upX) {
//         //  swipe left
//         this.player.setVelocityX(-100 * velocityFactor)
//       } else if (this.input.activePointer.downX < this.input.activePointer.upX) {
//         //  swipe right
//         this.player.setVelocityX(100 * velocityFactor)
//       } else {
//         this.player.setVelocityX(0)
//       }
//     }
//     else {
//       this.player.setVelocityX(0)
//     }
//     this.horizontalWrap(this.player)

//     const bottomPlatform = this.findBottomMostPlatform()
//     if (this.player.y > bottomPlatform.y + 200) {
//       this.scene.start('game-over')
//     }
//     const vy = this.player.body.velocity.y
//     if (vy > 0) {
//       // this.player.setTexture('bunny-stand')
//       this.player.setVelocityX(0)
//     }





//   }

//   horizontalWrap(sprite) {
//     const halfWidth = sprite.displayWidth * 0.5;
//     const gameWidth = this.scale.width
//     if (sprite.x < -halfWidth) {
//       sprite.x = gameWidth + halfWidth
//     } else if (sprite.x > gameWidth + halfWidth) {
//       sprite.x = -halfWidth
//     }
//   }

//   addCarrotAbove(sprite) {
//     const y = sprite.y - sprite.displayHeight
//     const carrot = this.carrots.get(sprite.x, y, 'carrot')
//     carrot.setActive(true)
//     carrot.setVisible(true)
//     this.add.existing(carrot)
//     carrot.body.setSize(carrot.width, carrot.height)
//     this.physics.world.enable(carrot)
//     return carrot
//   }

//   addEnemiesAbove(sprite) {
//     const y = sprite.y - sprite.displayHeight
//     const enemy = this.enemies.get(sprite.x + (Math.random() * 100), y, 'enemy')
//     enemy.scale = 0.3
//     enemy.setActive(true)
//     enemy.setVisible(true)
//     this.add.existing(enemy)
//     enemy.body.setSize(enemy.width, enemy.height)
//     this.physics.world.enable(enemy)
//     return enemy
//   }

//   handleCollectCarrot(player, carrot) {
//     this.carrots.killAndHide(carrot)
//     this.physics.world.disableBody(carrot.body)
//     this.carrotsCollected++;
//     this.sound.play('coin-collected')
//     this.carrotsCollectedText.text = 'Carrots : ' + this.carrotsCollected
//     if (this.carrotsCollected % 20 === 0 && this.bunnySpeed > -2000) {
//       // console.log('...bunny speed...', this.bunnySpeed)
//       this.bunnySpeed = this.bunnySpeed - 200
//     }

//   }
//   handleEnemy(player, enemy) {
//     let parent = this;
//     this.scene.pause()
//     // this.player.setTexture('bunny-hurt')
//     enemy.setTexture('enemy-stuck')
//     this.sound.play('hit')
//     setTimeout(() => {
//       parent.scene.start('game-over')
//     }, 2500);

//   }


//   findBottomMostPlatform() {
//     const platforms = this.platforms.getChildren();
//     let bottomPlatform = platforms[0];
//     for (let i = 1; i < platforms.length; ++i) {
//       const platform = platforms[i]
//       if (platform.y < bottomPlatform.y) {
//         continue
//       }
//       bottomPlatform = platform
//     }
//     return bottomPlatform
//   }
// }