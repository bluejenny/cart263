class Boot extends Phaser.Scene {
  constructor() {
    super({
      key: `boot`
    });
  }

  preload() {
    this.load.image(`wall`, 'assets/images/wall.png');
    this.load.spritesheet(`avatar`, `assets/images/penis-sprite.png`, {
      frameWidth: 120,
      frameHeight: 121,
      endFrame: 2
    });

    this.load.on('complete', () => {
       this.scene.start(`play`);
   });
  }

  create() {
    let style = {
      fontFamily: 'Arial',
      fontSize: 34,
      color: '#00ff00'
    };
    let loadingString = `Loading...`;
    this.add.text(100, 100, loadingString, style);


  }

  update() {

  }
}
