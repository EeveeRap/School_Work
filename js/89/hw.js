(function () {
    "use strict";

    const canvas = document.querySelector("#theCanvas");
    const context = canvas.getContext("2d");

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Ant {
        static ANT_WIDTH = 3;
        static ANT_HEIGHT = 5;

        constructor(color = "#000000") {
            this.x = window.innerWidth / 2;
            this.y = window.innerHeight / 2;
            this.color = color;
        }

        draw() {
            context.fillStyle = this.color;
            context.fillRect(this.x, this.y, Ant.ANT_WIDTH, Ant.ANT_HEIGHT);
        }

        move() {
            if (!--this.brains) {
                this.brains = Ant.#getRandomNumber(1, 50);
                this.dx = Ant.#getRandomNumber(-1, 1);
                this.dy = Ant.#getRandomNumber(-1, 1);
            }
            this.x += this.dx;
            this.y += this.dy;

            if (this.x < 0) {
                this.x = 0;
            }
            else if (this.x > canvas.width - Ant.ANT_WIDTH) {
                this.x = canvas.width - Ant.ANT_WIDTH;
            }

            if (this.y < 0) {
                this.y = 0;
            }
            else if (this.y > canvas.height - Ant.ANT_HEIGHT) {
                this.y = canvas.height - Ant.ANT_HEIGHT;
            }
            this.draw();
        }

        static #getRandomNumber(min, max) {
            return Math.floor(Math.random() * ((max - min) + 1)) + min;
        }
    }

    const ants = [];
    /*for(let i = 0; i < 3000; i++) {
      ants.push(new Ant());
    }*/

    setInterval(() => {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ants.forEach(a => a.move());
    }, 100);

    const ant = new Ant();
    const theAntsMove = ant.move.bind(ant);
    //setInterval(ant.move, 10);
    setInterval(theAntsMove, 10);

    const antNumberInput = document.querySelector("#numAnts");
    const antColorInput = document.querySelector("#antColor");
    document.querySelector("#antForm").addEventListener("submit", e => {
        e.preventDefault();
        for (let i = 0; i < Number(antNumberInput.value); i++) {
            ants.push(new Ant(antColorInput.value));
        }
    });
}());
