var canvas = document.querySelector('canvas');
canvas.width = 1513;
canvas.height = 580;
var colorsquare = document.querySelectorAll('.color-square');
let brushSize = 5;
var isDrawing;
let x;
let y;
var c = canvas.getContext("2d");

var prevactivecolor;
var prevactivesquare;

canvas.addEventListener("mousedown", (e) => {
    isDrawing = true;
    x = e.offsetX;
    y = e.offsetY;
})

canvas.addEventListener("mouseup", () => {
    isDrawing = false;
    x = undefined;
    y = undefined;
})

function sizechange(brushsize) {
    brushSize = brushsize;
}

canvas.addEventListener("mousemove", (event) => {
    draw(event.offsetX, event.offsetY);
})

function draw(x2, y2) {
    if (isDrawing) {
        c.beginPath();
        c.arc(x2, y2, brushSize, 0, Math.PI * 2, true);
        c.closePath();
        c.fill();
        drawLine(x, y, x2, y2);
    }
    
    x = x2;
    y = y2;
}

function drawLine(x1, y1, x2, y2) {
    c.beginPath();
    c.moveTo(x1, y1);
    c.lineTo(x2, y2);
    c.strokeStyle = c.fillStyle;
    c.lineWidth = brushSize * 2;
    c.stroke();
}

document.getElementById('refresh').addEventListener('click', () => {
    c.clearRect(0, 0, canvas.width, canvas.height);
})

var selectcolor = (elem) => {
    removeClassActive();
    prevactivesquare = elem;
    c.fillStyle = elem.getAttribute("data-color");
    elem.classList.add("active");
    removeClassSelect(e);
    b.classList.add("select");
}

function removeClassActive() {
    colorsquare.forEach((circle) => {
        circle.classList.remove("active");
    });
}

const favcolor = (elem) => {
    removeClassActive();
    c.fillStyle = elem.value;
    removeClassSelect(e);
    b.classList.add("select");
}

var b = document.getElementById("b");
var e = document.getElementById("e");

b.addEventListener("click", () => {
    removeClassSelect(e);
    b.classList.add("select");
    c.fillStyle = prevactivecolor;
    prevactivesquare.classList.add("active");
})

e.addEventListener("click", () => {
    removeClassSelect(b);
    prevactivecolor = c.fillStyle;
    e.classList.add("select");
    c.fillStyle = "white";
    removeClassActive();
})

function removeClassSelect(el) {
    el.classList.remove("select");
}

document.querySelector('a').addEventListener("click", (event) => (event.target.href = canvas.toDataURL()));