let symmetry = 6;
let angle;
let strokeColor = '#ffffff';
let clearCanvas = false;

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  background(50);
  
  // UI elemanlarını dinle
  document.getElementById('clear-btn').addEventListener('click', () => {
    clearCanvas = true;
  });
  
  document.getElementById('color-picker').addEventListener('input', (e) => {
    strokeColor = e.target.value;
  });
  
  document.getElementById('symmetry-slider').addEventListener('input', (e) => {
    symmetry = parseInt(e.target.value);
    document.getElementById('symmetry-value').textContent = symmetry;
    angle = 360 / symmetry;
  });
  
  angle = 360 / symmetry;
}

function draw() {
  translate(width / 2, height / 2);
  
  if (clearCanvas) {
    background(50);
    clearCanvas = false;
  }
  
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let lineStartX = mouseX - width / 2;
    let lineStartY = mouseY - height / 2;
    let lineEndX = pmouseX - width / 2;
    let lineEndY = pmouseY - height / 2;

    if (mouseIsPressed) {
      stroke(strokeColor);
      strokeWeight(3);
      
      for (let i = 0; i < symmetry; i++) {
        rotate(angle);
        line(lineStartX, lineStartY, lineEndX, lineEndY);
        push();
        scale(1, -1);
        line(lineStartX, lineStartY, lineEndX, lineEndY);
        pop();
      }
    }
  }
}
