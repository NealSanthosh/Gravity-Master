var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;
 
var engine;
var world;
var boxes = [];
 
var ground;
var gSlider;
 
 
function setup() {
    createCanvas(400, 500);
    engine = Engine.create();
    world = engine.world;
    Engine.run(engine);
    
    ySlider = createSlider(-6, 6, 1);
    ySlider.position(40, height - 60);
    ySlider.input = map(engine.world.gravity, ySlider.min, ySlider.max, 0, 1);
 
    xSlider = createSlider(-6, 6, 0);
    xSlider.position(40, height - 30);
    xSlider.input = map(engine.world.gravity, xSlider.min, xSlider.max, 0, 1);

    var options = {
        isStatic: true
    }

    cealing = Bodies.rectangle(200, height - 495, width, 10, options);

    wall1 = Bodies.rectangle(5, 200, 10, 425, options);
    wall2 = Bodies.rectangle(395, 200, 10, 425, options);

    ground = Bodies.rectangle(200, height - 75, width, 10, options);

    World.add(world, cealing);
    World.add(world, wall1);
    World.add(world, wall2);
    World.add(world, ground);

}
 
function mousePressed() {
    if (mouseY < 350) {
        boxes.push(new Box(mouseX, mouseY, random(10, 40), random(10, 40)));
    }
}
 
function draw() {
    background(51);
    var noX = xSlider.value();
    var noY = ySlider.value();
 
    for (var i = 0; i < boxes.length; i++) {
        boxes[i].show();
    }
    noStroke();
    fill(170);
    strokeWeight(4);
    rectMode(CENTER);
    rect(cealing.position.x, cealing.position.y, width, 10);
    rect(wall1.position.x, 200, 10, 425);
    rect(wall2.position.x, 200, 10, 425);
    rect(ground.position.x, ground.position.y, width, 10);
    fill(255);
    textSize(15);
    text("Gravity X : " + noX, 200, height - 15);
    text("Gravity Y : " + noY, 200, height - 45);

    world.gravity.y = noY;
    world.gravity.x = noX;
}
 
function Box(x, y, w, h, options) {
    var options = {
        friction: 0.5,
        restitution: 0.5,
    }
 
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.w = w;
    this.h = h;
    World.add(world, this.body);
 
    this.show = function () {
        var pos = this.body.position;
        var angle = this.body.angle;
 
        push();
        translate(pos.x, pos.y);
        rotate(angle);
        rectMode(CENTER);
        strokeWeight(1);
        stroke(255);
        fill(random(0,255),random(0,255),random(0,255));
        rect(0, 0, this.w, this.h);
        pop();
    }
}
