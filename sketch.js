
let particles = [];
let types = ['🪨', '📄', '✂️'];
let optns = {};
optns['🪨'] = '✂️' ;
optns['📄'] = '🪨' ;
optns['✂️'] = '📄' ;

function setup() {
  createCanvas(windowWidth, windowHeight);


  for(var i = 0; i < 200; i++) {
    particles[i] = new entity();
  }
}

function draw() {
  background(220);
  for(var i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].show();
    if(checkwinner()){
      noLoop();
    }
    
  }
}

function entity () {
  this.type = random(types);
  this.size = 70;
  this.radius = floor(this.size / 2);
  this.pos = createVector(random(this.size, width-this.radius), random(this.size, height-this.radius));

  this.vel = p5.Vector.random2D();



 
  this.update = function() {
    this.pos.add(this.vel);
    for(var i = 0; i < particles.length; i++) {
      if (i != particles.indexOf(this)) {
        var d = dist(particles[i].pos.x, particles[i].pos.y, this.pos.x, this.pos.y);
        if (d < particles[i].radius + this.radius) {

          if(particles[i].type === optns[this.type]) {
            // this wins
            particles[i].type = this.type;
          }else if(this.type === optns[particles[i].type]) {
            // i wins
            this.type = particles[i].type;
          }

          // Bounce

            this.vel.x *= -1;
            this.vel.y *= -1;
            particles[i].vel.x *= -1;
            particles[i].vel.y *= -1;

        }
      }
    }    
    // Bounce off walls
    if (this.pos.x > width-this.radius|| this.pos.x < this.radius) {
      this.vel.x *= -1;
    }
    if (this.pos.y > height-this.radius || this.pos.y < this.radius) {
      this.vel.y *= -1;
    }

  }


  this.show = function() {
    textAlign(CENTER, CENTER);
    textSize(this.size);
    text(this.type, this.pos.x, this.pos.y);
  }
}


function checkwinner() {

for(i=0; i<types.length; i++) {
  let allmatch = true;
  for(j=0; j<particles.length; j++) {
    if(particles[j].type != types[i]) {
      allmatch = false;
      break;
    }
  }
  if(allmatch) {
    textSize(50);
    rect(width/4, height/4, width/2, height/2);
    text(types[i] + " wins :D", width/2, height/2);
    return true;
  }
}
}
