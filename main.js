
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let isDrawing = false;

const clearButton = document.querySelector('.clear-button');
const downloadButton = document.querySelector('.download-button');

canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('mousemove', draw);
canvas.addEventListener('mouseup', stopDrawing);


canvas.addEventListener('touchstart', startDrawingMobile);
canvas.addEventListener('touchmove', drawInMobile);
canvas.addEventListener('touchend', stopDrawing);

clearButton.addEventListener('click', clearCanvas);
downloadButton.addEventListener('click', downloadAsImage);
window.addEventListener('resize', resizeCanvas);

function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

function startDrawingMobile(e) {
    isDrawing = true;
    drawInMobile(e);
}

function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

function draw({ clientX: x, clientY: y }) {
    if (!isDrawing) {
        return;
    } 
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#171717";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}


function drawInMobile(e) {
    if (!isDrawing) {
        return;
    } 
    let x = event.touches[0].pageX;
    let y =  event.touches[0].pageY;
    ctx.lineWidth = 8;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#171717";
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function downloadAsImage() {
    var dataURL = canvas.toDataURL('image/png');
    downloadButton.href = dataURL;
}

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();