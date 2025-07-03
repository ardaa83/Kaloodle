let symmetry = 6;
let currentColor;
let autoColorMode = false;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  background(50);

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

    // Renk seçiciye düzgün HEX değeri ver
    let hexColor = "#" + hex(r, 2) + hex(g, 2) + hex(b, 2);
    colorPicker.value(hexColor);
  });

  clearBtn.mousePressed(() => {
    background(50);
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

function draw() {
  // boş
}

function mouseDragged() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (autoColorMode) {
      let r = floor(random(128, 255));
      let g = floor(random(128, 255));
      let b = floor(random(128, 255));
      currentColor = color(r, g, b);
    }

    let centerX = width / 2;
    let centerY = height / 2;
    let mx = mouseX - centerX;
    let my = mouseY - centerY;
    let pmx = pmouseX - centerX;
    let pmy = pmouseY - centerY;

    push();
    translate(centerX, centerY);

    for (let i = 0; i < symmetry; i++) {
      rotate(360 / symmetry);

      // Neon efekti: önce parlak dış çizgi (hafif saydam ve kalın)
      stroke(currentColor.levels[0], currentColor.levels[1], currentColor.levels[2], 50);
      strokeWeight(20);
      line(pmx, pmy, mx, my);

      // Sonra içteki ince net çizgi
      stroke(currentColor);
      strokeWeight(2);
      line(pmx, pmy, mx, my);

      // Yansımalı çizim
      push();
      scale(1, -1);

      stroke(currentColor.levels[0], currentColor.levels[1], currentColor.levels[2], 50);
      strokeWeight(20);
      line(pmx, pmy, mx, my);

      stroke(currentColor);
      strokeWeight(2);
      line(pmx, pmy, mx, my);
      pop();
    }

    pop();
  }
}
