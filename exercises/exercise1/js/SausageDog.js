class SausageDog extends Animal {
  constructor(x, y, image) {
    super(x, y, image);

    this.found = false;
    this.rotationSpeed = .5;
  }

  update() {
    super.update();

    if (this.found) {
      if (cheerSFX.isPlaying()) {
      this.angle += this.rotationSpeed;
    }
    }
  }

  mousePressed() {
    if (this.overlap(mouseX, mouseY)) {
      this.found = true;
      cheerSFX.play();
    }
  }
}