/**
 * Created by zhoujh on 2015/9/13.
 */
window.onload = function() {
    var canvas = document.getElementById("canvas");
    canvas.width = "1060";
    canvas.height = "530";
    var context = canvas.getContext("2d");

    /*context.moveTo(100, 80);
     context.lineTo(700, 400);
     context.lineTo(100, 400);
     context.lineTo(100, 80);*/
    context.lineWidth = 3;
    context.strokeStyle = "#005588";
    context.fillStyle = "#885500";
    canvasPaintAnimation(context);
}

function canvasPaintAnimation(context) {
    var end = 0;
    var start = 0;
    var timer = setInterval(paint, 30);
    function paint() {
        context.beginPath();
        context.arc(530, 265, 200, start, end);
        context.stroke();

        if (end >= 2 * Math.PI) {
            clearInterval(timer);
        } else {
            start = end;
            end += 0.1;
        }
    }
}