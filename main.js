const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

var isDrawing, points = [ ];
var paths = [];

ctx.lineWidth = 12;
ctx.lineCap = 'round';

// const colorPickerInput = document.querySelector('.color-picker');
const clearButton = document.querySelector('.clear-button');
const downloadButton = document.querySelector('.download-button');

clearButton.addEventListener('click', clearCanvas);
downloadButton.addEventListener('click', downloadAsImage);

canvas.onmousedown = function(e) {
  isDrawing = true;
  paths[paths.length] = [];
  paths[paths.length - 1].push({ x: e.clientX, y: e.clientY });
};

canvas.onmousemove = function(e) {
  
  if (!isDrawing) return;
 
  
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  paths[paths.length - 1].push({ x: e.clientX, y: e.clientY });

  paths.forEach(path => {

    ctx.beginPath();

    for (i = 1; i < path.length - 2; i ++) {
       var xc = (path[i].x + path[i + 1].x) / 2;
       var yc = (path[i].y + path[i + 1].y) / 2;
      
       ctx.quadraticCurveTo(path[i].x, path[i].y, xc, yc);
    }
    ctx.stroke();

  });
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
  paths.length = 0;
}

function downloadAsImage() {
  var dataURL = canvas.toDataURL('image/png');
  downloadButton.href = dataURL;
  stopDrawing();
}

