let symmetry = 6;
let currentColor;
let autoColorMode = false;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  drawFoggyBackground();

  currentColor = color('#FF0000');

  const colorPicker = select('#color-picker');
  const randomColorBtn = select('#random-color');
  const clearBtn = select('#clear-btn');
  const symmetrySlider = select('#symmetry-slider');
  const autoColorBtn = select('#auto-color-btn');

  colorPicker.input(() => {
    currentColor = color(colorPicker.value());
  });

  randomColorBtn.mousePressed(() => {
    let r = floor(random(255));
    let g = floor(random(255));
    let b = floor(random(255));
    currentColor = color(r, g, b);

    let hexColor = "#" + hex(r, 2) + hex(g, 2) + hex(b, 2);
    colorPicker.value(hexColor);
  });

  clearBtn.mousePressed(() => {
    drawFoggyBackground();
  });

  symmetrySlider.input(() => {
    symmetry = symmetrySlider.value();
    select('#symmetry-value').html(symmetry);
  });

  autoColorBtn.mousePressed(() => {
    autoColorMode = !autoColorMode;
    autoColorBtn.html(autoColorMode ? 'Otomatik Renk: Açık' : 'Otomatik Renk: Kapalı');
  });
}

function drawFoggyBackground() {
  background(20);

  let baseR = random(100, 255);
  let baseG = random(100, 255);
  let baseB = random(100, 255);

  noStroke();
  noiseSeed(floor(random(10000)));

  for (let x = 0; x < width; x += 3) {
    for (let y = 0; y < height; y += 3) {
      let n = noise(x * 0.01, y * 0.01);
      let alpha = map(n, 0, 1, 10, 60);

      let r = baseR * n;
      let g = baseG * n;
      let b = baseB * n;

      fill(r, g, b, alpha);
      rect(x, y, 3, 3);
    }
  }
}




function draw() {
}

function mouseDragged() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (autoColorMode) {
      currentColor = color(random(255), random(255), random(255));
    }

    stroke(currentColor);

    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    let weight = map(speed, 0, 50, 8, 1, true);
    strokeWeight(weight);

    let centerX = width / 2;
    let centerY = height / 2;

    let mx = mouseX - centerX;
    let my = mouseY - centerY;
    let pmx = pmouseX - centerX;
    let pmy = pmouseY - centerY;

    push();
    translate(centerX, centerY);

    if (symmetry == 1) {
      line(mx, my, pmx, pmy);
    } else {
      for (let i = 0; i < symmetry; i++) {
        rotate(360 / symmetry);
        line(mx, my, pmx, pmy);
        push();
        scale(1, -1);
        line(mx, my, pmx, pmy);
        pop();
      }
    }

    pop();
  }
}
