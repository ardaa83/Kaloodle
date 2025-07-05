let symmetry = 6;
let currentColor;
let autoColorMode = false;

let paths = [];
let currentPath = null;

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
    paths = [];
    drawFoggyBackground();
  });

  symmetrySlider.input(() => {
    symmetry = int(symmetrySlider.value());
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
  background(20);
  for (let path of paths) {
    drawSymmetricPath(path);
  }

  if (currentPath) {
    drawSymmetricPath(currentPath);
  }
}

function drawSymmetricPath(path) {
  push();
  translate(width / 2, height / 2);
  stroke(path.color);
  strokeWeight(path.weight);
  strokeCap(ROUND);
  drawingContext.shadowBlur = 15;
  drawingContext.shadowColor = path.color;

  for (let pt of path.points) {
    if (path.symmetry === 1) {
      line(pt.px, pt.py, pt.x, pt.y);
    } else {
      for (let i = 0; i < path.symmetry; i++) {
        rotate(360 / path.symmetry);
        line(pt.px, pt.py, pt.x, pt.y);
        push();
        scale(1, -1);
        line(pt.px, pt.py, pt.x, pt.y);
        pop();
      }
    }
  }

  drawingContext.shadowBlur = 0;
  pop();
}

function mouseDragged() {
  if (mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    if (!currentPath) {
      let weight = map(dist(mouseX, mouseY, pmouseX, pmouseY), 0, 20, 2.4, 1.2, true);
      currentPath = {
        points: [],
        color: autoColorMode ? color(random(128, 255), random(128, 255), random(128, 255)) : currentColor,
        weight: weight,
        symmetry: symmetry
      };
      paths.push(currentPath);
    }

    const centerX = width / 2;
    const centerY = height / 2;

    currentPath.points.push({
      x: mouseX - centerX,
      y: mouseY - centerY,
      px: pmouseX - centerX,
      py: pmouseY - centerY
    });
  }
}

function mouseReleased() {
  currentPath = null;
}

function keyPressed() {
  if ((key === 'z' || key === 'Z') && (keyIsDown(CONTROL) || keyIsDown(91))) {
    paths.pop();
  }
}
