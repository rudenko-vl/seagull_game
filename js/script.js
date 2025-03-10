document.addEventListener("DOMContentLoaded", () => {
    const cups = document.querySelectorAll(".cup");
    const box = document.querySelector(".img-box");
    const gameContainer = document.querySelector(".game-container");
    const seagull = document.getElementById("seagull");
    const restartButton = document.getElementById("restart");
    const message = document.getElementById("message");

    let ballPosition = getRandomPosition();
    let gameActive = true; // Флаг активности игры

    function getRandomPosition() {
        return Math.floor(Math.random() * 4);
    }

    function setupGame() {
        gameActive = true; // Разрешаем клики
        gameContainer.style.display = 'flex';
        message.textContent = "Выбери квадрат, под которым спрятана добрая чайка!";
        box.style.display = 'none'
        cups.forEach(cup => {
            cup.style.pointerEvents = "auto"; // Включаем клики
        });
        restartButton.style.display = "none";
    }

    function revealBall(selectedIndex) {
        if (!gameActive) return; // Если игра уже закончилась, игнорируем клик

        // Отключаем клики после выбора
        gameActive = false;
        cups.forEach(cup => {
            cup.style.pointerEvents = "none"; // Блокируем клики
        });

        // Показываем все шарики
        document.querySelectorAll(".ball").forEach(ball => {
            ball.style.display = "block";
        });
        box.style.display = 'block';
        gameContainer.style.display = 'none';
        message.textContent = "";

        if (selectedIndex === ballPosition) {
            seagull.src = './images/ch.jpg';
        } else {
            seagull.src = './images/angry_bird.jpg';
        }

        restartButton.style.display = "block";
    }

    restartButton.addEventListener("click", () => {
        ballPosition = getRandomPosition(); // Генерируем новую позицию шарика
        setupGame(); // Перезапускаем игру
    });

    cups.forEach((cup, index) => {
        cup.addEventListener("click", () => revealBall(index));
    });

    setupGame(); // Запуск игры при загрузке страницы
});
