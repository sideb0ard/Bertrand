// Create WebSocket connection.
const socket = new WebSocket('ws://localhost:9002');

// Connection opened
socket.addEventListener('open', function (event) {
  socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
  console.log('Message from server ', event.data);
});

function setup() {
  createCanvas(1200, 400);
}

function draw() {
  background(255);
  angleMode(DEGREES);

  VariablyThickLine(createVector(50, height/2), createVector(width-50, height/2), [50]);
  drawCircle(createVector(width/2, height/2), frameCount / 10 % 26 + 3);
  //noLoop();

}

function SendMouse() {
  socket.send("mouse");
}

function say(sentence) {
  socket.send(sentence);
  return 0;
}

function keyPressed() {
  if (key == "s") {
    print("YO!");
    SendMouse();
  }
}
