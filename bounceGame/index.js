let canvas = document.getElementById('game'),
    ctx = canvas.getContext('2d'),
    ballRadius = 9,
    x, y, dx, dy, interval;

let paddleHeight = 12,
    paddleWidth = 72,
    paddleX;

let rowCount = 5,
    columnCount = 9,
    brickWidth = 54,
    brickHeight = 18,
    brickPadding = 12,
    topOffset = 40,
    leftOffset = 33,
    score = 0,
    isRunning = false;

let bricks = [];
function initBricks() {
    bricks = [];
    for (let c = 0; c < columnCount; c++) {
        bricks[c] = [];
        for (let r = 0; r < rowCount; r++) {
            bricks[c][r] = { x: 0, y: 0, status: 1 };
        }
    }
}

function resetGame() {
    x = canvas.width / 2;
    y = canvas.height - 40;
    dx = 2;
    dy = -2;
    paddleX = (canvas.width - paddleWidth) / 2;
    score = 0;
    initBricks();
    if (interval) clearInterval(interval);
    interval = setInterval(init, 10);
    isRunning = true;
    updateButton();
}

function toggleGame() {
    if (isRunning) {
        clearInterval(interval);
        isRunning = false;
    } else {
        resetGame();
    }
    updateButton();
}

function updateButton() {
    let button = document.getElementById('toggleBtn');
    button.textContent = isRunning ? '停止遊戲' : '開始遊戲';
}

document.getElementById('toggleBtn').addEventListener('click', toggleGame);

document.addEventListener("mousemove", mouseMoveHandler, false);

function mouseMoveHandler(e) {
    var relativeX = e.clientX - canvas.offsetLeft;
    if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
    }
}

function drawPaddle() {
    ctx.beginPath();
    ctx.roundRect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight, 30);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#333';
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            if (bricks[c][r].status === 1) {
                let brickX = (c * (brickWidth + brickPadding)) + leftOffset;
                let brickY = (r * (brickHeight + brickPadding)) + topOffset;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.roundRect(brickX, brickY, brickWidth, brickHeight, 30);
                ctx.fillStyle = '#333';
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function trackScore() {
    ctx.font = 'bold 16px sans-serif';
    ctx.fillStyle = '#333';
    ctx.fillText('積分 : ' + score, 8, 24);
}

function hitDetection() {
    for (let c = 0; c < columnCount; c++) {
        for (let r = 0; r < rowCount; r++) {
            let b = bricks[c][r];
            if (b.status === 1) {
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy;
                    b.status = 0;
                    score++;
                    if (score === rowCount * columnCount) {
                        clearInterval(interval);
                        alert('你贏了！');
                        isRunning = false;
                        updateButton();
                    }
                }
            }
        }
    }
}

function init() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    trackScore();
    drawBricks();
    drawBall();
    drawPaddle();
    hitDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }

    if (y + dy < ballRadius) {
        dy = -dy;
    } else if (y + dy > canvas.height - ballRadius) {
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            clearInterval(interval);
            alert('遊戲結束！');
            isRunning = false;
            updateButton();
        }
    }

    x += dx;
    y += dy;
}

resetGame();
