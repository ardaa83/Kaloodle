let symmetry = 6;
let currentColor;
let autoColorMode = false;

function setup() {
  let canvas = createCanvas(600, 600);
  canvas.parent('canvas-container');
  angleMode(DEGREES);
  background(50); // Gri arka plan

  currentColor = color('#FF0000');

  const colorPicker = select('#color-picker');
  const randomColorBtn = select('#random-color');
  const clearBtn = select('#clear-btn');
  const symmetrySlider = select('#symmetry-slider');
  const autoColorBtn = select('#auto-color-btn');

  // Renk seçici güncellemesi
  colorPicker.input(() => {
    currentColor = color(colorPicker.value());
  });

  // Rastgele renk butonu: hem currentColor hem de renk seçiciyi güncelliyoruz
  randomColorBtn.mousePressed(() => {
    let r = floor(random(255));
    let g = floor(random(255));
    let b = floor(random(255));
    currentColor = color(r, g, b);

    let hexColor = "#" + hex(r, 2) + hex(g, 2) + hex(b, 2);
    colorPicker.value(hexColor);
  });

  // Temizle butonu: arka plan gri olarak ayarlanıyor
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
  // draw boş bırakılıyor
}

function mouseDragged() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (autoColorMode) {
      let r = floor(random(128, 255));
      let g = floor(random(128, 255));
      let b = floor(random(128, 255));
      currentColor = color(r, g, b);
    }

    // Hız hesaplama
    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    let thickness = map(speed, 0, 30, 10, 1, true); // yavaşta kalın, hızlıda ince

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

      // Glow (neon) efekti
      drawingContext.shadowBlur = 20;
      drawingContext.shadowColor = currentColor;

      noStroke();
      fill(currentColor);

      // Dolma kalem benzeri çizim: kalınlığı hızla belirlenen daire izleri
      ellipse(mx, my, thickness, thickness);

      push();
      scale(1, -1);
      ellipse(mx, my, thickness, thickness);
      pop();

      drawingContext.shadowBlur = 0;
    }

    pop();
  }
}
