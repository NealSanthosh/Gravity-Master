class Particle {
    constructor(x,y,r) {
      var options = {
          friction:0,
          restitution: 0.4
      }
      this.body = Bodies.circle(x,y,r,options);
      this.r = r; 
      World.add(world, this.body);
    }
    display(){
      var pos =this.body.position;
      ellipseMode(CENTER);
      fill("green");
    ellipse(pos.x, pos.y, this.r);
    }
  };