var CANVAS_WIDTH = 1060;
var CANVAS_HEIGHT = 530;
// The center of the canvas
var CENTER_X = CANVAS_WIDTH / 2;
var CENTER_Y = CANVAS_HEIGHT / 2;
// The coordinates of the arc
var COORDINATES = [];
var index = 0;

window.onload = function() {
    var canvas = document.getElementById("canvas");
    canvas.width = CANVAS_WIDTH;
    canvas.height = CANVAS_HEIGHT;
    var context = canvas.getContext("2d");
    getCircleCoordinates(CENTER_X, CENTER_Y, 70);
    var timer = setInterval(function() {
        render(context);
        update(timer);
    }, 5);
};

function render(cxt) {
    if (index < COORDINATES.length - 1) {
        cxt.strokeStyle = "rgba(20, 20, 100, 0.7)";
        cxt.lineWidth = 5;

        cxt.beginPath();
        cxt.moveTo(COORDINATES[index].x, COORDINATES[index].y);
        cxt.lineTo(COORDINATES[index + 1].x, COORDINATES[index + 1].y);
        cxt.stroke();
    }
}

function update(timer) {
    if (index >= COORDINATES.length - 1) {
        clearInterval(timer);
    } else {
        index++;
    }
}

function getCircleCoordinates(x, y, r) {
    var alpha;
    for (alpha = 0; alpha <= 2 * Math.PI; alpha += 0.01) {
        var coordinate = {
            x:x + r * Math.sin(alpha),
            y:y - r * Math.cos(alpha)
        };
        COORDINATES.push(coordinate);
    }
}