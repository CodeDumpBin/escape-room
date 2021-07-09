import screenGameData from "./screens.js"
import Phaser from "../phaser.js"


export default class Room1 extends Phaser.Scene {

  constructor() {
    super('Room1')
    this.box = [];
    this.collectibles = new Array(5);
    this.pages = 5;
    this.game_screens = new Array(5);
    this.collectedItems = null
    this.gameData = {
      itemsToCollect: screenGameData.itemsToCollect,
      itemsCollected: [],
      gameAssets: screenGameData.assets,
      screens: screenGameData.screens,
      commonScreen: screenGameData.commonScreen,
      gameState: "playing"
    }
  }

  preload() {
    // let imageList = this.gameData.gameAssets.image
    // let audioList = this.gameData.gameAssets.sound
    // for (let i = 0; i < imageList.length; i++) {
    //   this.load.svg(imageList[i].name, imageList[i].url)
    // }

    // for (let i = 0; i < audioList.length; i++) {
    //   this.load.audio(audioList[i].name, audioList[i].url)
    // }
    console.log("*************************AAAAAAAAAAAAAAA**************")
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
    // let commonScreen = this.gameData.commonScreen;
    // collectionBoard

    for (var c = 0; c < this.collectibles.length; c++) {
      this.collectedItems.add(this.makeCollectionBoard(c))
    }


    let g = this.add.graphics(100, 100);
    // g.drawRect(100, 100, 300, 400)
    // g.beginFill(0xefc53f, 1);

    // let modal = this.add.container(0, 0);
    g.fillStyle(0xffb000, 1);
    g.fillRect(450, 200, 200, 200);
    let rect = new Phaser.Geom.Rectangle(450, 200, 200, 200);
    g.setInteractive(rect, Phaser.Geom.Rectangle.Contains)

    // 
    g.on('pointerover', function () { g.alpha = 0.5; });
    g.on('pointerout', function () { g.alpha = 1.0; });
    g.on('pointerdown', function () { 
      
     });
    // var r2 = this.add.rectangle(200, 200, 400, 400, 0x9966ff);
    // console.log(r2);
    // r2.setInteractive(true);
    // r2.setStrokeStyle(4, 0xefc53f);
    // r2.on('pointerover', function (pointer, x, y, event) {
    //   // console.log("aaaaa",r2);
    //   // r2.setTint(0xf0ff00);
    // }, this)
    // r2.on('pointerout', function (pointer, x, y, event) { 

    // }, this)
    // r2.on('pointerdown', function (pointer, x, y, event) {
    //   // this.sound.play('audio_button')
    //   // this.scene.start('Room1');
    // }, this);


    // var r3 = this.add.rectangle(0, 0, 400, 400);
    // modal.add(r2);
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
      console.log(this.gameData.itemsCollected, this.gameData.itemsToCollect);
      if (!this.gameData.itemsCollected.includes(this.gameData.itemsToCollect[i]))
        return _res;
    }
    return true;
  }


  addObjectToScreen(data) {
    let obj = this.add.image(data.position.x, data.position.y, data.name).setScale(data.scale)
    if (data.action !== null && Array.isArray(data.action)) {

      obj.setInteractive()
      if (data.setDepth) {
        obj.setDepth(data.setDepth)
      }
      for (let a = 0; a < data.action.length; a++) {
        let _dAction = data.action[a];
        obj.on(_dAction.event, function (ele) {
          // actionOnObject are the default event with default phaser properties  
          if (_dAction.sound) this.playSound(_dAction.sound)

          if (_dAction.actionOnObject) {

            for (let actionEle in _dAction.isToggled ? _dAction.toggleActionOnObject : _dAction.actionOnObject) {
              obj[actionEle](_dAction.isToggled ? _dAction.toggleActionOnObject[actionEle] : _dAction.actionOnObject[actionEle])
            }
            if (_dAction.type === "toggle") {
              _dAction.isToggled = !_dAction.isToggled;
            }
          }
          if (_dAction.isCollectible) {
            // console.log(".cccccccc.....",obj);
            this.collectedItems.add(obj)
            // console.log(obj.texture.key);
            obj.texture.key
            this.gameData.itemsCollected.push(obj.texture.key);
            _dAction.isCollectible = false;
            // console.log(this.gameData.itemsCollected);
            // console.log(this.gameData.itemsToCollect);
            if (this.checkGameFinished()) {
              this.scene.start('finish');
            }
          }
        }, this)

      }
      console.log('array action.......');
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



  makeCollectionBoard(c) {
    let cb = this.add.rectangle(60 + (c * 100), 554, 88, 88, 0x444444);
    cb.setStrokeStyle(4, 0xefc53f);
    return cb;
  }

  soundOpen() {
    this.sound.play('audio_button')
  }


  playSound(sound) {
    this.sound.play(sound)
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
