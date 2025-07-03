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
  noStroke();
  noiseSeed(floor(random(10000))); // her seferinde farklı desen

  background(20); // Koyu siyahımsı zemin

  // Rastgele hafif bir renk tonu seç (soft)
  let fogHue = random(360); // HSB renk tonları
  colorMode(HSB, 360, 100, 100); // Ton, doygunluk, parlaklık

  for (let x = 0; x < width; x += 4) {
    for (let y = 0; y < height; y += 4) {
      let n = noise(x * 0.01, y * 0.01); // yumuşak geçişler
      let alpha = map(n, 0, 1, 10, 40); // daha saydam buğular
      let c = color(fogHue, 40, 80, alpha); // düşük doygunluk & parlaklık
      fill(c);
      rect(x, y, 4, 4);
    }
  }

  colorMode(RGB); // HSB'den çık
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

    // Hız hesapla
    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);

    // Yumuşak geçiş için sınırlı aralıkta map'le
    // Yavaşta 3.5, hızlıda 1.2 gibi doğal bir fark
    let thickness = map(speed, 0, 20, 3.0, 1.2, true);

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

      drawingContext.shadowBlur = 15;
      drawingContext.shadowColor = currentColor;

      stroke(currentColor);
      strokeWeight(thickness);
      strokeCap(ROUND);
      line(pmx, pmy, mx, my);

      push();
      scale(1, -1);
      line(pmx, pmy, mx, my);
      pop();

      drawingContext.shadowBlur = 0;
    }

    pop();
  }
}

