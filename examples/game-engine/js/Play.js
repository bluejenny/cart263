class Play extends Phaser.Scene {

  constructor() {
    super({ key: `play`
    });
  }


  create() {
    // this.wall = this.add.image(500, 200, `wall`);
    this.avatar = this.physics.add.sprite(0, 800, `avatar`);

    this.createAnimations();


    this.avatar.setVelocityX(20);
    this.avatar.play(`idle`);
    this.avatar.setCollideWorldBounds(true);

    this.cursors = this.input.keyboard.createCursorKeys();
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

    // NOTE: Now that the avatar might be moving or idle, we should
    // check its current velocity to figure out which animation to play!
    // Notice that to check the current velocity we need to access the
    // "body" property of our avatar (which represents it in relation to the physics
    // engine) and then the "velocity" property of that body.

    // If either x or y velocity isn't zero, that the avatar is moving
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
