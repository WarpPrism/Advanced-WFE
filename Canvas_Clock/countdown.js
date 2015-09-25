var WINDOW_WIDTH = 1060;
 var WINDOW_HEIGHT = 530;
var RADIUS = 5;
var MARGIN_LEFT = 100;
var MARGIN_TOP = 100;
var DIGIT_WIDTH = 7 * 2 * (RADIUS + 1);
var COLON_WIDTH = 4 * 2 * (RADIUS + 1);
var GAP = (WINDOW_WIDTH - 2*MARGIN_LEFT - 6 * DIGIT_WIDTH - 2 * COLON_WIDTH) / 7;

var date;
var hours = 0;
var minutes = 0;
var seconds = 0;
var balls = [];
var colors = ["#FF44FF", "#00EC00", "#0066CC", "#6C6C6C", "#E1E100", "#FF5809", "#7E3D76", "#00E3E3", "#EA0000", "#7D7DFF"];
var accelerator_line_color = "";
// 倒计时程序
var endDate = new Date(2015, 8, 13, 23, 0, 0);
var rTime;

window.onload = function() {
    var canvas = document.getElementById("canvas");
    var context = canvas.getContext("2d");
    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
    date = new Date();
    rTime = calculateRemainingTime();
    var timer = setInterval(
        function() {
            render(context);
            update(timer);
        }
    , 30);
};

function renderDigit(x, y, num, cxt) {
    cxt.fillStyle = "#2266cc";
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                cxt.beginPath();
                cxt.arc(x + j*2*(RADIUS + 1) + RADIUS + 1, y + i*2*(RADIUS + 1) + RADIUS + 1, RADIUS, 0, 2*Math.PI);
                cxt.closePath();
                cxt.fill();
            }
        }
    }

}

function addBalls(x, y, num) {
    for (var i = 0; i < digit[num].length; i++) {
        for (var j = 0; j < digit[num][i].length; j++) {
            if (digit[num][i][j] == 1) {
                var aBall = {
                    x:x + j*2*(RADIUS + 1) + RADIUS + 1,
                    y:y + i*2*(RADIUS + 1) + RADIUS + 1,
                    vx:Math.pow((-1), Math.ceil(Math.random() * 1000)) * Math.ceil(5 * Math.random()),
                    vy:-3,
                    gy:1.5 + Math.random(),
                    gx:0,
                    color:colors[Math.floor(Math.random() * colors.length)]
                };
                balls.push(aBall);
            }
        }
    }
}

function ballUpdate() {
    for (var i = 0; i < balls.length; i++) {
        balls[i].x += balls[i].vx;
        balls[i].y += balls[i].vy;
        balls[i].vx += balls[i].gx;
        balls[i].vy += balls[i].gy;
        if (balls[i].y >= WINDOW_HEIGHT - RADIUS) {
            balls[i].y = WINDOW_HEIGHT - RADIUS;
            balls[i].vy = - balls[i].vy * 0.7;
        }
        if (balls[i].x <= WINDOW_WIDTH / 2) {
            balls[i].gx = -1;
            balls[i].vy = -10;
        }
    }

    var cnt = 0;
    for (var j = 0; j < balls.length; j++) {
        if (balls[j].x + RADIUS > 0 && balls[j].x - RADIUS < WINDOW_WIDTH) {
            balls[cnt++] = balls[j];
        }
    }

    while(balls.length > cnt) {
        balls.pop();
    }
}

function update(timer) {
    //时钟程序
    var newDate = new Date();
    var newHours = newDate.getHours();
    var newMinutes = newDate.getMinutes();
    var newSeconds = newDate.getSeconds();
    /*console.log("seconds:" + seconds);
    console.log("newSeconds"+ newSeconds);*/

    /*// 倒计时程序
    var newrTime = calculateRemainingTime();
    if (newrTime <= 0) {
        alert("Count Down Complete!");
        clearInterval(timer);
    }
    var newHours = parseInt(newrTime / 3600);
    var newMinutes = parseInt((newrTime - hours * 3600) / 60);
    var newSeconds = parseInt(newrTime % 60);
    //!**********/

    var off = MARGIN_LEFT;
    if (newSeconds != seconds) {
        if (parseInt(newHours / 10) != parseInt(hours / 10)) {
            addBalls(off, MARGIN_TOP, parseInt(hours / 10));
        }
        off += DIGIT_WIDTH + GAP;
        if (parseInt(newHours % 10) != parseInt(hours % 10)) {
            addBalls(off, MARGIN_TOP, parseInt(hours % 10));
        }
        off += DIGIT_WIDTH + GAP;
        off += COLON_WIDTH + GAP;
        if (parseInt(newMinutes / 10) != parseInt(minutes / 10)) {
            addBalls(off, MARGIN_TOP, parseInt(minutes / 10));
        }
        off += DIGIT_WIDTH + GAP;
        if (parseInt(newMinutes % 10) != parseInt(minutes % 10)) {
            addBalls(off, MARGIN_TOP, parseInt(minutes % 10));
        }
        off += DIGIT_WIDTH + GAP;
        off += COLON_WIDTH + GAP;
        if (parseInt(newSeconds / 10) != parseInt(seconds / 10)) {
            addBalls(off, MARGIN_TOP, parseInt(seconds / 10));
        }
        off += DIGIT_WIDTH + GAP;
        if (parseInt(newSeconds % 10) != parseInt(seconds % 10)) {
            addBalls(off, MARGIN_TOP, parseInt(seconds % 10));
        }
    }
    /*rTime = newrTime;*/
    date = newDate;
    ballUpdate();

}

function render(cxt) {
    //时钟程序
    hours = date.getHours();
    minutes = date.getMinutes();
    seconds = date.getSeconds();

    /*// 倒计时程序
    hours = parseInt(rTime / 3600);
    minutes = parseInt((rTime - hours * 3600) / 60);
    seconds = parseInt(rTime % 60);*/

    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    // 加速线
    cxt.clearRect(0, 0, WINDOW_WIDTH, WINDOW_HEIGHT);
    cxt.beginPath();
    /*accelerator_line_color = colors[Math.ceil(colors.length * Math.random())];*/
    cxt.strokeStyle = "#2266cc";
    cxt.moveTo(WINDOW_WIDTH / 2, WINDOW_HEIGHT);
    cxt.lineTo(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2);
    for (var i = 0; i <= 20; i++) {
       cxt.moveTo(WINDOW_WIDTH / 2, WINDOW_HEIGHT / 2 + WINDOW_HEIGHT / 2 / 20 * i);
       cxt.lineTo(WINDOW_WIDTH / 2 + 15, WINDOW_HEIGHT / 2 + WINDOW_HEIGHT / 2 / 20 * i);
    }
    cxt.closePath();
    cxt.stroke();

    var off = MARGIN_LEFT;
    renderDigit(off, MARGIN_TOP, parseInt(hours / 10), cxt);
    off += DIGIT_WIDTH + GAP;
    renderDigit(off, MARGIN_TOP, parseInt(hours % 10), cxt);
    off += DIGIT_WIDTH + GAP;
    renderDigit(off, MARGIN_TOP, 10, cxt);
    off += COLON_WIDTH + GAP;
    renderDigit(off, MARGIN_TOP, parseInt(minutes / 10), cxt);
    off += DIGIT_WIDTH + GAP;
    renderDigit(off, MARGIN_TOP, parseInt(minutes % 10), cxt);
    off += DIGIT_WIDTH + GAP;
    renderDigit(off, MARGIN_TOP, 10, cxt);
    off += COLON_WIDTH + GAP;
    renderDigit(off, MARGIN_TOP, parseInt(seconds / 10), cxt);
    off += DIGIT_WIDTH + GAP;
    renderDigit(off, MARGIN_TOP, parseInt(seconds % 10), cxt);

    for (var j = 0; j < balls.length; j++) {
        cxt.fillStyle = balls[j].color;
        cxt.beginPath();
        cxt.arc(balls[j].x, balls[j].y, RADIUS, 0, 2*Math.PI);
        cxt.closePath();
        cxt.fill();
    }
}

// 用于倒计时程序
function calculateRemainingTime() {
    var now = new Date();
    var now_time = now.getTime();
    var end_time = endDate.getTime();
    var diff = 0;
    if (end_time > now_time) {
        diff = Math.round((end_time - now_time) / 1000);
    } else {
        console.log("Please reset the End Time~~!");
    }
    return diff;
}
