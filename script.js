const gameBoard = document.querySelector("#gameBoard");
const ctx = gameBoard.getContext("2d");
const gameWidth = gameBoard.width;
const gameHeight = gameBoard.height;
const gameBoardColor = "white";
const paddleSpeed = 50;
const paddle1Color = "blue";
const paddle2Color = "purple";
const paddleBorder = "black";
const ballRadius = 6;
const ballBorderColor = "black";
const ballColor = "brown";
let ballX = gameWidth / 2;
let ballY = gameHeight / 2;
let ballSpeed = 0;
let ballXDirection = 0;
let ballYDirection = 0;
let intervalID;
let scorePlayerOne = 0;
let scorePlayerTwo = 0;
let maxScore = 0;
window.addEventListener("keydown", changeDirection);

// window.addEventListener("keyDown", resetGame);

function drawPaddles() {
  ctx.strokeStyle = paddleBorder;

  // paddle 1

  ctx.fillStyle = paddle1Color;
  ctx.fillRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);
  ctx.strokeRect(paddle1.x, paddle1.y, paddle1.width, paddle1.height);

  //   paddle 2
  ctx.fillStyle = paddle2Color;
  ctx.fillRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
  ctx.strokeRect(paddle2.x, paddle2.y, paddle2.width, paddle2.height);
}

function changeDirection(event) {
  const keyPressed = event.keyCode;
  const p1paddleLeft = 65;
  const p2paddleLeft = 37;
  const p1paddleRight = 68;
  const p2paddleRight = 39;
  if (keyPressed === p1paddleLeft && paddle1.x > 0) {
    paddle1.x -= paddleSpeed;
    paddle2.x -= paddleSpeed;
  }
  if (keyPressed === p2paddleLeft && paddle1.x > 0) {
    paddle1.x -= paddleSpeed;
    paddle2.x -= paddleSpeed;
  }
  if (keyPressed === p1paddleRight && paddle1.x < gameWidth - 100) {
    paddle1.x += paddleSpeed;
    paddle2.x += paddleSpeed;
  }
  if (keyPressed === p2paddleRight && paddle1.x < gameWidth - 100) {
    paddle1.x += paddleSpeed;
    paddle2.x += paddleSpeed;
  }
}

let paddle1 = {
  x: gameWidth / 2,
  y: 0,
  width: 100,
  height: 20,
};

let paddle2 = {
  x: gameWidth / 2,
  y: gameHeight - 20,
  width: 100,
  height: 20,
};

function resetGame() {
  paddle1 = {
    x: 0,
    y: 0,
    width: 100,
    height: 20,
  };

  paddle2 = {
    x: 0,
    y: gameHeight - 20,
    width: 100,
    height: 20,
  };
  scorePlayerOne = 0;
  scorePlayerTwo = 0;
  ballX = 0;
  ballY = 0;
  ballSpeed = 1;
  ballXDirection = 0;
  ballYDirection = 0;
  updateScore();
  clearInterval(intervalID);
}

function gameStart() {
  createBall();
  nextTick();
}
gameStart();

function nextTick() {
  intervalID = setTimeout(() => {
    clearBoard();
    drawPaddles();
    moveBall();
    drawBall(ballX, ballY);
    checkCollosion();
    nextTick();
  }, 10);
}

function clearBoard() {
  ctx.fillStyle = gameBoardColor;
  ctx.fillRect(0, 0, gameWidth, gameHeight);
}

function drawBall(ballX, ballY) {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, 360);
  ctx.fillStyle = ballColor;
  ctx.fill();
  ctx.strokeStyle = ballBorderColor;
  ctx.stroke();
}

function createBall() {
  ballSpeed = 1;
  if (Math.round(Math.random()) == 1) {
    ballXDirection = 1;
  } else {
    ballXDirection = -1;
  }
  if (Math.round(Math.random()) == 1) {
    ballYDirection = 1;
  } else {
    ballYDirection = -1;
  }
  ballY = gameHeight / 2;
  ballX = gameWidth / 2;
  drawBall(ballX, ballY);
}

function moveBall() {
  ballX += ballSpeed * ballXDirection;
  ballY += ballSpeed * ballYDirection;
}

function checkCollosion() {
  if (ballX <= 0 + ballRadius) {
    ballXDirection *= -1;
  }
  if (ballX >= gameWidth - ballRadius) {
    ballXDirection *= -1;
  }
  if (ballY <= 0) {
    scorePlayerTwo += 1;
    updateScore();
    createBall();
  }
  if (ballY >= gameHeight) {
    scorePlayerOne += 1;
    updateScore();
    createBall();
  }
  if (ballY <= paddle1.height + ballRadius) {
    if (ballX > paddle1.x && ballX < paddle1.x + paddle1.width) {
      ballY = paddle1.height + ballRadius;
      ballYDirection *= -1;
      ballSpeed += 0.1;
    }
  }
  if (ballY >= gameHeight - paddle2.height - ballRadius) {
    if (ballX > paddle2.x && ballX < paddle2.x + paddle2.width) {
      ballY = gameHeight - paddle2.height - ballRadius;
      ballYDirection *= -1;
      ballSpeed += 0.1;
    }
  }
}

function updateScore() {
  let player_1 = scorePlayerOne;
  let player_2 = scorePlayerTwo;
  if (player_1 === 5 || player_2 === 5) {
    if (player_1 > player_2) {
      alert("GAME OVER\n player1 Won With score: " + player_1);
    } else {
      alert("GAME OVER\n Player2 Won with score: " + player_2);
    }
    resetGame();
  }
}
