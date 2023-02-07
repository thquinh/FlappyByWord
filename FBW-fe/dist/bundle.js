webpackJsonp([0],{

/***/ 1545:
/*!*********************************!*\
  !*** ./src/scenes/PlayScene.ts ***!
  \*********************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var PlayScene =
/** @class */
function (_super) {
  __extends(PlayScene, _super);

  function PlayScene() {
    var _this = _super.call(this, {
      key: 'PlayScene'
    }) || this;

    _this.background = [];
    _this.ready = false;
    return _this;
  }

  PlayScene.prototype.preload = function () {
    this.load.audio('gameover', ['/assets/audio/gameover.ogg', '/assets/audio/gameover.mp3']);
    this.load.image('bg', '/assets/image/pink.png');
    this.load.image('bg1', '/assets/image/bg1.png');
    this.load.image('bg2', '/assets/image/bg2.png');
    this.load.image('bg3', '/assets/image/bg3.png');
    this.load.image('bg4', '/assets/image/bg4.png');
    this.load.image('bg5', '/assets/image/bg5.png');
    this.load.spritesheet('player', '/assets/sprites/player.png', {
      frameWidth: 100,
      frameHeight: 100
    });
  };

  PlayScene.prototype.create = function () {
    this.cursors = this.input.keyboard.createCursorKeys();
    this.staticBackgr = this.add.sprite(960, 540, 'bg');
    this.background.push(this.add.tileSprite(960, 540, 1920, 1080, 'bg1'));
    this.background.push(this.add.tileSprite(960, 540, 1920, 1080, 'bg2'));
    this.background.push(this.add.tileSprite(960, 540, 1920, 1080, 'bg3'));
    this.background.push(this.add.tileSprite(960, 540, 1920, 1080, 'bg4'));
    this.background.push(this.add.tileSprite(960, 540, 1920, 1080, 'bg5'));
    this.player = this.physics.add.sprite(400, 200, 'player');
    this.player.setBounce(0, 1);
    this.player.setCollideWorldBounds(true);
    this.anims.create({
      key: 'turn',
      frames: this.anims.generateFrameNumbers('player', {
        start: 0,
        end: 3
      }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'down',
      frames: this.anims.generateFrameNumbers('player', {
        start: 4,
        end: 7
      }),
      frameRate: 10
    });
    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('player', {
        start: 8,
        end: 11
      }),
      frameRate: 10,
      repeat: -1
    });
    this.bottom = this.physics.world.bounds.bottom;
    this.gameover = this.sound.add('gameover'); // var music = this.sound.add('gameover');
    // music.play();
  };

  PlayScene.prototype.update = function () {
    this.background.forEach(function (bg, i) {
      bg.tilePositionX += i * 1;
    });

    if (this.cursors.space.isDown) {
      this.ready = true;
      this.player.setVelocityY(-200);
      this.player.play('up', true);
    } else if (!this.ready) {
      this.player.setVelocityY(0);
      this.player.play('turn', true);
    } else {
      this.player.setVelocityY(400);
      this.player.play('down', true);

      if (this.player.getBottomLeft().y === this.bottom) {
        this.gameover.play();
        alert('Game over');
      }
    }
  };

  return PlayScene;
}(Phaser.Scene);

exports["default"] = PlayScene;

/***/ }),

/***/ 620:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! D:\Documents\GitHub\FlappyByWord\FBW-fe\src\main.ts */621);


/***/ }),

/***/ 621:
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! dynamic exports provided */
/*! all exports used */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var __importDefault = void 0 && (void 0).__importDefault || function (mod) {
  return mod && mod.__esModule ? mod : {
    "default": mod
  };
};

Object.defineProperty(exports, "__esModule", {
  value: true
});

var phaser_1 = __importDefault(__webpack_require__(/*! phaser */ 289));

var PlayScene_1 = __importDefault(__webpack_require__(/*! ./scenes/PlayScene */ 1545));

var config = {
  type: phaser_1["default"].AUTO,
  parent: 'content',
  width: 1920,
  height: 1080,
  scale: {
    mode: phaser_1["default"].Scale.FIT,
    autoCenter: phaser_1["default"].Scale.CENTER_BOTH
  },
  physics: {
    "default": 'arcade',
    arcade: {
      gravity: {
        y: 100
      },
      debug: false
    }
  },
  scene: [PlayScene_1["default"]],
  audio: {
    disableWebAudio: true
  }
};
new phaser_1["default"].Game(config);

/***/ })

},[620]);
//# sourceMappingURL=bundle.js.map