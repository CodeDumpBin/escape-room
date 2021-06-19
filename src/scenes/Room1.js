import Phaser from "../phaser.js"
import screenGameData from "./screens.js"


export default class Room1 extends Phaser.Scene {

  constructor() {
    super('room1')
    this.box = [];
    this.collectibles = new Array(5);
    this.pages = 5;
    this.game_screens = new Array(5);
    this.page1 = null;
    this.collectedItems = null
    this.gameData = {
      itemsToCollect: screenGameData.itemsToCollect,
      itemsCollected: [],
      gameAssets: screenGameData.assets,
      screens: screenGameData.screens,
      gameState: "playing"
    }
  }

  preload() {
    let imageList = this.gameData.gameAssets.image
    let audioList = this.gameData.gameAssets.sound
    for (let i = 0; i < imageList.length; i++) {
      this.load.svg(imageList[i].name, imageList[i].url)
    }

    for (let i = 0; i < audioList.length; i++) {
      this.load.audio(audioList[i].name, audioList[i].url)
    }
  }

  create() {
    let screens = this.gameData.screens
    for (let i = 0; i < screens.length; i++) {
      this.screen({
        screenNumber: i,
        screenData: screens[i].items,
        alpha: screens[i].alpha
      })
    }
    this.collectedItems = this.add.container(0, 0)
    for (var c = 0; c < this.collectibles.length; c++) {
      this.collectedItems.add(this.makeCollectionBoard(c))
    }
  }

  /**
   * @param {Object} param 
   * @param Number param.screenNumber 
   * @param Array param.screenData 
   * @param Number param.alpha 
   */
  screen(param) {
    let screen = this.add.container(0, 0);
    screen.alpha = param.alpha
    for (let s = 0; s < param.screenData.length; s++) {
      if (param.screenData[s].type === "image" || param.screenData[s].type === "svg") {
        let obj = this.addObjectToScreen(param.screenData[s])
        screen.add(obj);
      }
    }
    this.navigateBetweenScreen(param.screenNumber, screen)
  }








  addToItemsCollected(item) {
    console.log("...***", item, this.gameData.itemsCollected.indexOf(item))
    if (this.gameData.itemsCollected.indexOf(item) === -1) {
      this.gameData.itemsCollected.push(item)
      console.log(this.gameData.itemsCollected)
      if (this.checkGameFinished()) {
        this.gameData.gameState = "completed"
      }
    }

  }

  checkGameFinished() {
    let _res = false;
    if (!Array.isArray(this.gameData.itemsCollected) || !Array.isArray(this.gameData.itemsToCollect) || this.gameData.itemsCollected.length !== this.gameData.itemsToCollect.length) {
      return _res;
    }
    for (let i = 0; i < this.gameData.itemsToCollect.length; i++) {
      if (!this.gameData.itemsCollected.includes(this.gameData.itemsToCollect[i]))
        return _res;
    }
    return true;
  }


  addObjectToScreen(data) {
    let obj = this.add.image(data.position.x, data.position.y, data.name).setScale(data.scale)
    // action
    console.log(Array.isArray(data.action), data.action);
    if (data.action !== null && Array.isArray(data.action)) {
      for (let a = 0; a < data.action.length; a++) {
        let _dAction = data.action[a];
        obj.on(_dAction.event, function (ele) {
          this.soundOpen();
          // Object.ene

          // obj.
        }, this)

      }
      console.log('array action.......');
    }
    else if (data.action !== null && data.action.type && data.action.type == "addToCollection") {
      obj.setInteractive()
      obj.on('pointerover', function () { obj.setTint(0xf0ff00); }, this)
      obj.on('pointerout', function () { obj.setTint(0xffffff); }, this)
      obj.setDepth(1);
      obj.on('pointerdown', function (ele) {
        this.soundOpen();
        obj.setScale(0.8)
        obj.setX(160)
        obj.setY(550)
        this.collectedItems.add(obj)
        this.addToItemsCollected(obj.texture.obj)
      }, this);
    } else if (data.action !== null && data.action.type && data.action.type == "open-drawer") {
      obj.setInteractive()
      obj.on('pointerover', function () { obj.setTint(0xf0ff00); }, this)
      obj.on('pointerout', function () { obj.setTint(0xffffff); }, this)
      obj.setDepth(1);
      obj.on('pointerdown', function (ele) {
        this.soundOpen();
        obj.setTexture(obj.texture.key === 'white-drawer' ? 'white-drawer-open' : 'white-drawer')
      }, this);
    }


    else if (data.action !== null) {
      obj.setInteractive()
      obj.on('pointerover', function () { obj.setTint(0xf0ff00); }, this)
      obj.on('pointerout', function () { obj.setTint(0xffffff); }, this)
      obj.on('pointerdown', function () {
        this.soundOpen();
      }, this);
    }
    return obj;
  }

  navigateBetweenScreen(screenNumber, screen) {
    this.arrow("left", screenNumber == 0 ? this.game_screens.length - 1 : screenNumber - 1, screen)
    this.arrow("right", screenNumber == this.game_screens.length - 1 ? 0 : screenNumber + 1, screen)
    this.game_screens[screenNumber] = screen
  }


  update() {
    if (this.gameData.gameState === "completed") {
      alert("..congratulations you solved the puzzle")
    }
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
    let arrow = this.add.image(direction == "right" ? 660 : 60, 240, 'arrow-blue').setScrollFactor(1, 0).setScale(1);
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
