import Phaser from "../phaser.js"
import Carrot from "../game/Carrot.js"
import Enemy from "../game/Enemy.js"
import Constants from "../constants.js"


export default class Game extends Phaser.Scene {
  player
  platforms
  cursor
  carrots
  enemies
  carrotsCollected = 0
  bunnySpeed = -400;
  carrotsCollectedText;
  latestPlatform;
  distX;
  upX;
  distY;
  upY;
  dist;
  pi;
  moveThreshold = 25;
  swipe;
  isClicking = false;
  swipeDirection;
  platformVerticalDistance = [0, Constants.WIDTH]


  grounds = ['ground_snow', 'ground_grass', 'ground_sand', 'ground_wood', 'ground_cake'];
  constructor() {
    super("game")
    this.bird= null;
  }
  init() {
    this.carrotsCollected = 0
  }
  preload() {
    this.cursor = this.input.keyboard.createCursorKeys()

  }
  create() {
    // width: WIDTH * DEVICE_PIXEL_RATIO,
    // height: HEIGHT * DEVICE_PIXEL_RATIO,

    this.add.image(240, 320, 'background').setScrollFactor(1, 0)
    this.platforms = this.physics.add.staticGroup()
    const max = 8;
    const min = 2;
    for (let i = 0; i < 5; ++i) {
      const x = Phaser.Math.Between(...this.platformVerticalDistance)
      const y = 150 * i;
      const platform = this.platforms.create(x, y, this.grounds[Math.floor(Math.random() * this.grounds.length)])
      platform.scale = 0.5;
      // =
      //   Math.floor(Math.random() * (max - min + 1) + min) / 10;
      const body = platform.body;
      body.updateFromGameObject();
    }

    // this.player = this.physics.add.sprite(240, 320, 'bunny-stand').setScale(0.3)
    this.player = this.physics.add.sprite(240, 320, 'bird')

    this.physics.add.collider(this.platforms, this.player)
    this.player.body.checkCollision.up = false
    this.player.body.checkCollision.left = false
    this.player.body.checkCollision.right = false
    this.cameras.main.startFollow(this.player)
    this.cameras.main.setDeadzone(this.scale.width * 1.5)
    this.carrots = this.physics.add.group({ classType: Carrot })
    this.enemies = this.physics.add.group({ classType: Enemy })
    this.carrots.get(20, 500, 'carrot')
    this.enemies.get(200, 500, 'enemy')
    this.physics.add.collider(this.carrots, this.platforms)
    this.physics.add.collider(this.enemies, this.platforms)
    this.physics.add.collider(this.player, this.carrots, this.handleCollectCarrot, undefined, this)
    this.physics.add.collider(this.player, this.enemies, this.handleEnemy, undefined, this)
    this.carrotsCollectedText = this.add.text(240, 10, 'Carrots : 0', { color: '#000', fontSize: 24 }).setScrollFactor(0).setOrigin(0.5, 0)
    // this.physics.add.collider(this.bird, this.platforms)

    this.anims.create({
      key: 'fly', frames: this.anims.generateFrameNumbers('bird', { start: 0, end: 9 }),
      frameRate: 9,
      repeat: -1
    })

    console.log(this.player.play('fly'));
    // this.bird.play();


  }
  update(t, dt) {

    this.platforms.children.iterate(child => {
      const platform = child
      const scrollY = this.cameras.main.scrollY;
      if (platform.y >= scrollY + 700) {
        platform.y = scrollY - Phaser.Math.Between(50, 100)
        platform.body.updateFromGameObject()
        this.latestPlatform = platform;
        this.addCarrotAbove(platform)
        if (t % 7000) {
          // console.log(t)
          // console.log("..enemy added")
          this.addEnemiesAbove(platform)

        }

      }
    })


    const touchingDown = this.player.body.touching.down

    if (touchingDown) {
      this.player.setVelocityY(this.bunnySpeed)
      this.sound.play('jump');
      // this.player.setTexture('bunny-jump')
    }
    if (this.cursor.left.isDown && !touchingDown) {
      this.player.setVelocityX(-200)
    }
    else if (this.cursor.right.isDown && !touchingDown) {
      this.player.setVelocityX(200)
    }

    else if (!this.input.activePointer.isDown && !touchingDown) {
      // console.log('...input point distance', this.input.activePointer.downX - this.input.activePointer.upX, ' input pointer duration..', this.input.activePointer.upTime - this.input.activePointer.downTime)
      let _d = Math.abs(this.input.activePointer.downX - this.input.activePointer.upX);
      let _t = (this.input.activePointer.upTime - this.input.activePointer.downTime) / 10
      let calculateVelocity = _d / _t;
      let velocityFactor = calculateVelocity && calculateVelocity > 1 ? calculateVelocity : 1;
      if (this.input.activePointer.downX > this.input.activePointer.upX) {
        //  swipe left
        this.player.setVelocityX(-100 * velocityFactor)
      } else if (this.input.activePointer.downX < this.input.activePointer.upX) {
        //  swipe right
        this.player.setVelocityX(100 * velocityFactor)
      } else {
        this.player.setVelocityX(0)
      }
    }
    else {
      this.player.setVelocityX(0)
    }
    this.horizontalWrap(this.player)

    const bottomPlatform = this.findBottomMostPlatform()
    if (this.player.y > bottomPlatform.y + 200) {
      this.scene.start('game-over')
    }
    const vy = this.player.body.velocity.y
    if (vy > 0) {
      // this.player.setTexture('bunny-stand')
      this.player.setVelocityX(0)
    }





  }

  horizontalWrap(sprite) {
    const halfWidth = sprite.displayWidth * 0.5;
    const gameWidth = this.scale.width
    if (sprite.x < -halfWidth) {
      sprite.x = gameWidth + halfWidth
    } else if (sprite.x > gameWidth + halfWidth) {
      sprite.x = -halfWidth
    }
  }

  addCarrotAbove(sprite) {
    const y = sprite.y - sprite.displayHeight
    const carrot = this.carrots.get(sprite.x, y, 'carrot')
    carrot.setActive(true)
    carrot.setVisible(true)
    this.add.existing(carrot)
    carrot.body.setSize(carrot.width, carrot.height)
    this.physics.world.enable(carrot)
    return carrot
  }

  addEnemiesAbove(sprite) {
    const y = sprite.y - sprite.displayHeight
    const enemy = this.enemies.get(sprite.x + (Math.random() * 100), y, 'enemy')
    enemy.scale = 0.3
    enemy.setActive(true)
    enemy.setVisible(true)
    this.add.existing(enemy)
    enemy.body.setSize(enemy.width, enemy.height)
    this.physics.world.enable(enemy)
    return enemy
  }

  handleCollectCarrot(player, carrot) {
    this.carrots.killAndHide(carrot)
    this.physics.world.disableBody(carrot.body)
    this.carrotsCollected++;
    this.sound.play('coin-collected')
    this.carrotsCollectedText.text = 'Carrots : ' + this.carrotsCollected
    if (this.carrotsCollected % 20 === 0 && this.bunnySpeed > -2000) {
      // console.log('...bunny speed...', this.bunnySpeed)
      this.bunnySpeed = this.bunnySpeed - 200
    }

  }
  handleEnemy(player, enemy) {
    let parent = this;
    this.scene.pause()
    // this.player.setTexture('bunny-hurt')
    enemy.setTexture('enemy-stuck')
    this.sound.play('hit')
    setTimeout(() => {
      parent.scene.start('game-over')
    }, 2500);

  }


  findBottomMostPlatform() {
    const platforms = this.platforms.getChildren();
    let bottomPlatform = platforms[0];
    for (let i = 1; i < platforms.length; ++i) {
      const platform = platforms[i]
      if (platform.y < bottomPlatform.y) {
        continue
      }
      bottomPlatform = platform
    }
    return bottomPlatform
  }
}