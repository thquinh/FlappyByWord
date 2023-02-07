import Phaser from 'phaser';

import PlayScene from './scenes/PlayScene';

const config: GameConfig = {
    type: Phaser.AUTO,
    parent: 'content',
    width: 1920,
    height: 1080,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
      default: 'arcade',
      arcade: {
          gravity: { y: 100 },
          debug: false
      }
    },
    scene: [
      PlayScene
    ],
    audio: {
      disableWebAudio: true
  }
};

new Phaser.Game(config);
