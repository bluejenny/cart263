class Play extends Phaser.Scene {

  constructor() {
    super({ key: `play`
    });
  }


  create() {
    this.walls = this.physics.add.group({
      key: `wall`,
      immovable: true,
      quantity: 5
    });

    this.walls.children.each(function(wall) {
      let x = Math.random() * this.sys.canvas.width;
      let y = Math.random() * this.sys.canvas.height;
      wall.setPosition(x, y);
      wall.setTint(`0x000000`);
    }, this);

    this.collectables = this.physics.add.group({
      key: `wall`,
      immovable: true,
      quantity: 10
    });

    this.collectables.children.each(function(collectable) {
      let x = Math.random() * this.sys.canvas.width;
      let y = Math.random() * this.sys.canvas.height;
      collectable.setPosition(x, y);
      collectable.setTint(`0x33dd33`);
    }, this);

    this.avatar = this.physics.add.sprite(0, 800, `avatar`);

    this.createAnimations();


    this.avatar.setVelocityX(20);
    this.avatar.play(`idle`);
    this.avatar.setCollideWorldBounds(true);

    this.physics.add.collider(this.avatar, this.walls);
    this.physics.add.overlap(this.avatar, this.collectables, this.collectItem, null, this);

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  collectItem(avatar, collectable) {
    collectable.destroy();
  }

  createAnimations() {
    let movingAnimationConfig = {
      // The animation key name we'll use when playing it
      key: `moving`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        start: 0,
        end: 3
      }),
      frameRate: 2,
      repeat: -1
    };
    this.anims.create(movingAnimationConfig);

    // NOTE: Configuring an idle animation
    let idleAnimationConfig = {
      // NOTE: We need to use a different animation key of course
      key: `idle`,
      frames: this.anims.generateFrameNumbers(`avatar`, {
        // NOTE: We're only going to use frame 0, so it's starts and ends there
        start: 2,
        end: 2
      }),
      // NOTE: No need to specify a frame rate for something that doesn't technically animate!
      // NOTE: We'll repeat 0 times!
      repeat: 0
    };
    this.anims.create(idleAnimationConfig);
    // NOTE: It makes sense for the avatar to start out "idle"
    this.avatar.play(`idle`);
  }

  update() {
    this.avatar.setVelocity(0);

    if (this.cursors.left.isDown)
    {
        this.avatar.setVelocityX(-300);
    }
    else if (this.cursors.right.isDown)
    {
        this.avatar.setVelocityX(300);
    }

    if (this.cursors.up.isDown)
    {
        this.avatar.setVelocityY(-300);
    }
    else if (this.cursors.down.isDown)
    {
        this.avatar.setVelocityY(300);
    }

    if (this.avatar.body.velocity.x !== 0 || this.avatar.body.velocity.y !== 0) {
      // NOTE: That we include a second argument of "true" to tell the animation system
      // to ignore this instruction if the animation is already playing. This avoids
      // having the animation get constantly interrupted as the player moves
      // DOCS: https://newdocs.phaser.io/docs/3.53.1/Phaser.GameObjects.Sprite#play
      this.avatar.play(`moving`, true);
    }
    // Otherwise it's not moving
    else {
      this.avatar.play(`idle`, true);
    }

  }

}
