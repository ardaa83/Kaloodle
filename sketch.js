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

  // RGB değerini hex formatına çevirelim ve color picker'a gönderelim
  let hexColor = "#" + hex(r, 2) + hex(g, 2) + hex(b, 2);
  colorPicker.value(hexColor);
});



  clearBtn.mousePressed(() => {
    background(255);
  });

  symmetrySlider.input(() => {
    symmetry = symmetrySlider.value();
    select('#symmetry-value').html(symmetry);
  });

  autoColorBtn.mousePressed(() => {
    autoColorMode = !autoColorMode;
    if (autoColorMode) {
      autoColorBtn.html('Otomatik Renk: Açık');
    } else {
      autoColorBtn.html('Otomatik Renk: Kapalı');
    }
  });
}

function draw() {
  // Boş bırakıyoruz
}

function mouseDragged() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (autoColorMode) {
      currentColor = color(random(255), random(255), random(255));
    }

    stroke(currentColor);
    strokeWeight(2);

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
      line(mx, my, pmx, pmy);
      push();
      scale(1, -1);
      line(mx, my, pmx, pmy);
      pop();
    }

    pop();
  }
}
