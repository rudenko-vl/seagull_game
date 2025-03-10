document.addEventListener("DOMContentLoaded", () => {
    const cups = document.querySelectorAll(".cup");
    const message = document.getElementById("message");
    const seagull = document.getElementById("seagull");
    const restartButton = document.getElementById("restart");

    let ballPosition = getRandomPosition();
    let gameActive = true; // Флаг активности игры

    function getRandomPosition() {
        return Math.floor(Math.random() * 4);
    }

    function setupGame() {
        gameActive = true; // Разрешаем клики
        cups.forEach(cup => {
            // cup.innerHTML = ""; // Удаляем старые шарики
            cup.style.pointerEvents = "auto"; // Включаем клики
            seagull.style.display = 'none'
        });

      
        seagull.classList.add("ball");
        cups[ballPosition].appendChild(seagull);

        // Обновляем текст
        message.textContent = "Выбери квадрат, под которым спрятана чайка!";
        message.style.color = "black";
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
