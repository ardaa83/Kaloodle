let symmetry = 6; // Başlangıçta 6 simetri
let currentColor;
let autoColorMode = false; // Otomatik renk modu başta kapalı

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  background(255);

  currentColor = color('#FF0000'); // Başlangıç rengi kırmızı

  const colorPicker = select('#color-picker');
  const randomColorBtn = select('#random-color');
  const clearBtn = select('#clear-btn');
  const symmetrySlider = select('#symmetry-slider');
  const autoColorBtn = select('#auto-color-btn'); // Otomatik renk butonu

  colorPicker.input(() => {
    currentColor = color(colorPicker.value());
  });

  randomColorBtn.mousePressed(() => {
    currentColor = color(random(255), random(255), random(255));
  });

  clearBtn.mousePressed(() => {
    background(255);
  });

  symmetrySlider.input(() => {
    symmetry = symmetrySlider.value();
    select('#symmetry-value').html(symmetry); // Değeri güncelle
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
  translate(width / 2, height / 2);

  if (mouseIsPressed) {
    if (autoColorMode) {
      currentColor = color(random(255), random(255), random(255));
    }

    stroke(currentColor);
    strokeWeight(2);
    let mx = mouseX - width / 2;
    let my = mouseY - height / 2;
    let pmx = pmouseX - width / 2;
    let pmy = pmouseY - height / 2;

    for (let i = 0; i < symmetry; i++) {
      rotate(360 / symmetry);
      line(mx, my, pmx, pmy);
      push();
      scale(1, -1);
      line(mx, my, pmx, pmy);
      pop();
    }
  }
}
