let ship = class {
  constructor() {
    this.visible = true;
    this.x = canvasWidth / 2;
    this.y = canvasHeight / 2;
    this.movingForward = false;
    this.speed = 0.1;
    this.velX = 0;
    this.velY = 0;
    this.rotateSpeed = 0.001;
    this.radius = 15;
    this.angle = 0;
    this.strokeColor = "white";
  }
  Rotate(dir) {
    this.angle += this.rotateSpeed * dir;
  }
  Update() {
    let radians = (this.angle / Math.PI) * 180;
    //oldX + cos(radians) * distance
    //oldY + sin(radians) * distance
    if (this.movingForward) {
      this.velX += Math.cos(radians) * this.speed;
      this.velY += Math.sin(radians) * this.speed;
    }
    //check if ship is out of screen
    if (this.x < this.radius) {
      this.x = canvas.width;
    }
    if (this.x > canvas.width) {
      this.x = this.radius;
    }
    if (this.y < this.radius) {
      this.y = canvas.height;
    }
    if (this.y > canvas.height) {
      this.y = this.radius;
    }
    this.velX *= 0.99;
    this.velY *= 0.99;

    this.x -= this.velX;
    this.y -= this.velY;
  }
  Draw() {
    ctx.strokeStyle = this.strokeColor;
    ctx.beginPath();
    let vertAngle = (Math.PI * 2) / 3;
    let radians = (this.angle / Math.PI) * 180;

    for (let i = 0; i < 3; i++) {
      ctx.lineTo(
        this.x - this.radius * Math.cos(vertAngle * i + radians),
        this.y - this.radius * Math.sin(vertAngle * i + radians)
      );
    }
    ctx.closePath();
    ctx.stroke();
  }
};
export default ship;
///Alternative way to draw a ship with movment
/*var canvas = document.getElementById("canvas")
var ctx = canvas.getContext("2d")
var width
var height

var resize = function() {
  width = window.innerWidth * 2
  height = window.innerHeight * 2
  canvas.width = width
  canvas.height = height
}
window.onresize = resize
resize()

var state = {
  position: {
    x: (width / 2),
    y: (height / 2)
  },
  movement: {
    x: 0,
    y: 0
  },
  rotation: 0,
  pressedKeys: {
    left: false,
    right: false,
    up: false,
    down: false
  }
}

function update(progress) {
  var p = progress / 16

  updateRotation(p)
  updateMovement(p)
  updatePosition(p)
}

function updateRotation(p) {
  if (state.pressedKeys.left) {
    state.rotation -= p * 5
  }
  else if (state.pressedKeys.right) {
    state.rotation += p * 5
  }
}

function updateMovement(p) {
  // Behold! Mathematics for mapping a rotation to it's x, y components
  var accelerationVector = {
    x: p * 0.2 * Math.cos((state.rotation-90) * (Math.PI/180)),
    y: p * 0.2 * Math.sin((state.rotation-90) * (Math.PI/180))
  }

  if (state.pressedKeys.up) {
    state.movement.x += accelerationVector.x
    state.movement.y += accelerationVector.y
  }
  else if (state.pressedKeys.down) {
    state.movement.x -= accelerationVector.x
    state.movement.y -= accelerationVector.y
  }

  // Limit movement speed
  if (state.movement.x > 40) {
    state.movement.x = 40
  }
  else if (state.movement.x < -40) {
    state.movement.x = -40
  }
  if (state.movement.y > 40) {
    state.movement.y = 40
  }
  else if (state.movement.y < -40) {
    state.movement.y = -40
  }
}

function updatePosition(p) {
  state.position.x += state.movement.x
  state.position.y += state.movement.y

  // Detect boundaries
  if (state.position.x > width) {
    state.position.x -= width
  }
  else if (state.position.x < 0) {
    state.position.x += width
  }
  if (state.position.y > height) {
    state.position.y -= height
  }
  else if (state.position.y < 0) {
    state.position.y += height
  }
}

function draw() {
  ctx.clearRect(0, 0, width, height)

  ctx.save()
  ctx.translate(state.position.x, state.position.y)
  ctx.rotate((Math.PI/180) * state.rotation)

  ctx.strokeStyle = 'white'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(0, 0)
  ctx.lineTo(10, 10)
  ctx.lineTo(0, -20)
  ctx.lineTo(-10, 10)
  ctx.lineTo(0, 0)
  ctx.closePath()
  ctx.stroke()
  ctx.restore()
}

function loop(timestamp) {
  var progress = timestamp - lastRender

  update(progress)
  draw()
  
  lastRender = timestamp
  window.requestAnimationFrame(loop)
}
var lastRender = 0
window.requestAnimationFrame(loop)

var keyMap = {
  68: 'right',
  65: 'left',
  87: 'up',
  83: 'down'
}
function keydown(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = true
}
function keyup(event) {
  var key = keyMap[event.keyCode]
  state.pressedKeys[key] = false
}

window.addEventListener("keydown", keydown, false)
window.addEventListener("keyup", keyup, false)*/
