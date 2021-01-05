const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

ctx.lineWidth = 10;
ctx.lineCap = 'round';

var isDrawing, points = [ ];

// const colorPickerInput = document.querySelector('.color-picker');
const clearButton = document.querySelector('.clear-button');
const downloadButton = document.querySelector('.download-button');

clearButton.addEventListener('click', clearCanvas);
downloadButton.addEventListener('click', downloadAsImage);

canvas.onmousedown = function(e) {
  isDrawing = true;
  points.push({ x: e.clientX, y: e.clientY });
};

canvas.onmousemove = function(e) {
  
  if (!isDrawing) return;
 
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  points.push({ x: e.clientX, y: e.clientY });

  ctx.beginPath();
  

  for (i = 1; i < points.length - 2; i ++)
  {
     var xc = (points[i].x + points[i + 1].x) / 2;
     var yc = (points[i].y + points[i + 1].y) / 2;
    
     ctx.quadraticCurveTo(points[i].x, points[i].y, xc, yc);
  }
  ctx.stroke();
};

canvas.onmouseup = function() {
  stopDrawing();
  points.length = 0;
};

function stopDrawing() {
  isDrawing = false;
  ctx.beginPath();
}

function clearCanvas() {
  isDrawing = false;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadAsImage() {
  var dataURL = canvas.toDataURL('image/png');
  downloadButton.href = dataURL;
  stopDrawing();
}

