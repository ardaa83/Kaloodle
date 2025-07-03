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
  // Sadece tuval alanında işlem yap
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    // Otomatik renk modunda neon renkleri parlak uçlarda olacak şekilde ayarlıyoruz
    if (autoColorMode) {
      let r = floor(random(128, 255));
      let g = floor(random(128, 255));
      let b = floor(random(128, 255));
      currentColor = color(r, g, b);
    }

    let speed = dist(mouseX, mouseY, pmouseX, pmouseY);
    let thickness = map(speed, 0, 30, 8, 1, true);

    let centerX = width / 2;
    let centerY = height / 2;
    // Fare konumunu tuvalin merkezine göre ayarla
    let mx = mouseX - centerX;
    let my = mouseY - centerY;
    let pmx = pmouseX - centerX;
    let pmy = pmouseY - centerY;

    push();
    translate(centerX, centerY);

    for (let i = 0; i < symmetry; i++) {
      rotate(360 / symmetry);

      // Neon Glow Efekti: drawingContext üzerinden shadow özelliğini kullanıyoruz
      drawingContext.shadowBlur = 10;           // Glow yayılım miktarı (isteğe bağlı artırılabilir)
      drawingContext.shadowColor = currentColor;  // Işık rengi currentColor

      stroke(currentColor);
      strokeWeight(2);
      line(pmx, pmy, mx, my);

      push();
      scale(1, -1);
      line(pmx, pmy, mx, my);
      pop();

      // Glow efektinin diğer çizimleri etkilemesini engellemek için sıfırla
      drawingContext.shadowBlur = 0;
    }

    pop();
  }
}
