let symmetry = 6;
let angle;
let strokeColor = '#FF0000'; // Başlangıç rengi (kırmızı)
let clearCanvas = false;

function setup() {
  const canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  background(50);
  angle = 360 / symmetry;

  // Renk seçici
  document.getElementById('color-picker').addEventListener('input', (e) => {
    strokeColor = e.target.value;
  });

  // Rastgele renk butonu
  document.getElementById('random-color').addEventListener('click', () => {
    strokeColor = `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
    document.getElementById('color-picker').value = strokeColor;
  });

  // Temizle butonu
  document.getElementById('clear-btn').addEventListener('click', () => {
    clearCanvas = true;
  });

  // Simetri ayarı
  document.getElementById('symmetry-slider').addEventListener('input', (e) => {
    symmetry = parseInt(e.target.value);
    document.getElementById('symmetry-value').textContent = symmetry;
    angle = 360 / symmetry;
  });
}

function draw() {
  translate(width / 2, height / 2);
  
  if (clearCanvas) {
    background(50);
    clearCanvas = false;
  }
  
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height && mouseIsPressed) {
    stroke(strokeColor);
    strokeWeight(3);
    
    for (let i = 0; i < symmetry; i++) {
      rotate(angle);
      line(mouseX - width/2, mouseY - height/2, pmouseX - width/2, pmouseY - height/2);
      push();
      scale(1, -1);
      line(mouseX - width/2, mouseY - height/2, pmouseX - width/2, pmouseY - height/2);
      pop();
    }
  }
}
