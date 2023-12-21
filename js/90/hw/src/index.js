async function snakeGame() {
  "use strict";

  const CELL_SIZE = 64;
  const canvas = document.querySelector("#theCanvas");
  const context = canvas.getContext("2d");
  const crashSound = document.querySelector("#crash");
  const crunchSound = document.querySelector("#crunch");

  function resizeCanvas() {
    canvas.width = (window.innerWidth - 2) - ((window.innerWidth - 2) % CELL_SIZE);
    canvas.height = (window.innerHeight - 2) - ((window.innerHeight - 2) % CELL_SIZE);
  }

  window.addEventListener("resize", resizeCanvas);
  resizeCanvas();

  let score = 0;
  let speed = 200;
  class Snake {
    constructor() {
      this.segments = [{ x: -CELL_SIZE, y: 0 }];
    }

    move() {
      let head = this.segments[0];
     
      let tempX = head.x;
      let tempY = head.y;
      switch (direction) {
        case "ArrowUp":
          tempY -= CELL_SIZE;
          break;
        case "ArrowRight":
          tempX += CELL_SIZE;
          break;
        case "ArrowDown":
          tempY += CELL_SIZE;
          break;
        case "ArrowLeft":
          tempX -= CELL_SIZE;
          break;
      }

      
      if (this.isOnTopOf(tempX, tempY, 3)) {
        gameOver = true;
      }

      if (tempX < 0 || tempX > canvas.width - CELL_SIZE || tempY < 0 || tempY > canvas.height - CELL_SIZE) {
        gameOver = true;
      }

      if (!gameOver) {
        let recycledTail = this.segments.pop();
        let tailX = recycledTail.x;
        let tailY = recycledTail.y;
        recycledTail.x = tempX;
        recycledTail.y = tempY;
        this.segments.unshift(recycledTail);

        if (recycledTail.x === apple.x && recycledTail.y === apple.y) {
          this.segments.push({ x: tailX, y: tailY });
          crunchSound.currentTime = 0;
          crunchSound.play();
          score++;
          speed -= speed * .05;
          console.log(speed);
          apple.move();
        }
      } 

      context.drawImage(snakeHead, this.segments[0].x, this.segments[0].y);
      for (let i = 1; i < this.segments.length; i++) {
        context.fillStyle = "green";
        context.fillRect(this.segments[i].x, this.segments[i].y, CELL_SIZE, CELL_SIZE);
      }
    }

    isOnTopOf(x, y, min = 0) {
      for (let i = min; i < this.segments.length; i++) {
        if (x === this.segments[i].x && y === this.segments[i].y) {
          return true;
        }
      }
    }
  }

  class Apple {
    constructor() {
      this.move();
    }

    draw() {
      context.drawImage(appleImg, this.x, this.y);
    }

    move() {
      do {
        this.x = Apple.#getRandomNumber(canvas.width);
        this.y = Apple.#getRandomNumber(canvas.height);
      } while(snake.isOnTopOf(this.x, this.y));
    }

    static #getRandomNumber(max) {
      let num = Math.floor(Math.random() * (max + 1));
      return num - num % CELL_SIZE;
    }
  }

  let gameOver = false;

  function gameLoop() {
    console.log(direction);
    context.clearRect(0, 0, canvas.width, canvas.height);
    snake.move();
    apple.draw();
    if (!gameOver) {
      setTimeout(gameLoop, speed);
    } else {
      context.fillStyle = "green";
      context.font = "bold 32px Arial";
      const gameOverText = "Game Over!!";
      const sm = context.measureText(gameOverText);
      context.fillText(gameOverText, (canvas.width / 2) - (sm.width / 2), (canvas.height / 2) - ((sm.actualBoundingBoxAscent
        + sm.actualBoundingBoxDescent) / 2));
      crashSound.play();
    }

    context.fillStyle = "red";
    context.font = "bold 32px Arial";
    const scoreText = `score: ${score}`;
    const sm = context.measureText(scoreText);
    context.fillText(scoreText, canvas.width - sm.width - 16, sm.actualBoundingBoxAscent
      + sm.actualBoundingBoxDescent + 16);
  }

  let direction = "ArrowRight";
  document.addEventListener("keydown", e => {
    console.log(e.key);
    const isOnePiece = snake.segments.length === 1;
    switch (e.key) {
      case "ArrowUp":
        if (isOnePiece || direction !== "ArrowDown") {
          direction = e.key;
        }
        break;
      case "ArrowDown":
        if (isOnePiece || direction !== "ArrowUp") {
          direction = e.key;
        }
        break;
      case "ArrowLeft":
        if (isOnePiece || direction !== "ArrowRight") {
          direction = e.key;
        }
        break;
      case "ArrowRight":
        if (isOnePiece || direction !== "ArrowLeft") {
          direction = e.key;
        }
        break;
    }
  });

  

  async function loadImg(src) {
    return new Promise((resolve, reject) => {
      const img = document.createElement("img");
      img.src = src;
      img.onload = () => {
        resolve(img);
      };
      img.onerror = e => reject(`failed to load ${src} - ${e}`);
    });
  }

  let snakeHead;
  let appleImg;
  let snake;
  let apple;
  try {
    const snakeHeadP = loadImg("../images/snakehead.png");
    const appleImgP = loadImg("../images/apple.png");

    [snakeHead, appleImg] = await Promise.all([snakeHeadP, appleImgP]);
    snake = new Snake();
    apple = new Apple();
    setTimeout(gameLoop, speed);
  } catch (e) {
    console.error("oops", e);
  }

}
snakeGame();

import $ from "jquery";
$("body").css("background-color", "yellow");


