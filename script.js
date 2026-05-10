const gameArea = document.getElementById("gameArea");
const player = document.getElementById("player");
const scoreText = document.getElementById("score");
const gameOverText = document.getElementById("gameOver");

let playerX = window.innerWidth / 2;
let score = 0;

let highscore = localStorage.getItem("highscore") || 0;

// Movimiento teclado

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowLeft") {
    moveLeft();
  }

  if (e.key === "ArrowRight") {
    moveRight();
  }
});

// Movimiento móvil

function moveLeft() {
  playerX -= 30;
  player.style.left = playerX + "px";
}

function moveRight() {
  playerX += 30;
  player.style.left = playerX + "px";
}

// Récord

function updateHighscore() {
  if (score > highscore) {
    highscore = score;
    localStorage.setItem("highscore", highscore);
  }
}

// Crear objetos

function createItem() {
  const item = document.createElement("div");
  item.classList.add("item");

  const isGood = Math.random() > 0.3;

  const goodThings = ["🌸", "🎉", "🕯️", "🐎"];
  const badThings = ["🪨", "🌵", "💀"];

  item.textContent = isGood
    ? goodThings[Math.floor(Math.random() * goodThings.length)]
    : badThings[Math.floor(Math.random() * badThings.length)];

  item.dataset.good = isGood;

  item.style.left = Math.random() * window.innerWidth + "px";

  gameArea.appendChild(item);

  let itemY = -50;

  const fall = setInterval(() => {
    itemY += 5;
    item.style.top = itemY + "px";

    const playerRect = player.getBoundingClientRect();
    const itemRect = item.getBoundingClientRect();

    // Colisión
    if (
      itemRect.left < playerRect.right &&
      itemRect.right > playerRect.left &&
      itemRect.bottom > playerRect.top &&
      itemRect.top < playerRect.bottom
    ) {
      if (item.dataset.good === "true") {
        score++;
      } else {
        score -= 2;

        if (score <= -10) {
          gameOverText.style.display = "block";
        }
      }

      scoreText.textContent = score;

      updateHighscore();

      item.remove();
      clearInterval(fall);
    }

    if (itemY > window.innerHeight) {
      item.remove();
      clearInterval(fall);
    }
  }, 30);
}

// Crear objetos cada segundo
setInterval(createItem, 1000);

// Modo noche
setTimeout(() => {
  document.body.classList.add("night");
}, 15000);
