class Ball {
  constructor(x, y, note) {
    this.x = x;
    this.y = y;
    this.size = random(50, 150);
    this.fill = {
      r: random(0, 200),
      g: random(0, 200),
      b: random(0, 200)
    };
    this.speed = 33;
    this.vx = random(-this.speed, this.speed);
    this.vy = random(-this.speed, this.speed);

    //Synth
    this.note = note;
    this.synth = new p5.PolySynth();
  }

  move() {
    this.x += this.vx;
    this.y += this.vy;
  }

  bounce() {
    if (this.x - this.size/2 < 0 || this.x + this.size/2 > width) {
      this.vx = -this.vx;
      this.playNote();
    }

    if (this.y - this.size/2 < 0 || this.y + this.size/2 > height) {
      this.vy = -this.vy;
      this.playNote();
    }
  }

  playNote() {
    this.synth.play(this.note, 0.4, 0, 0.1);
  }

  display() {
    push();
    noStroke();
    fill(this.fill.r, this.fill.g, this.fill.b, 150);
    ellipse(this.x, this.y, this.size);
    pop();
  }
}
