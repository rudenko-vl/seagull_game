document.addEventListener("DOMContentLoaded", () => {
    const cups = document.querySelectorAll(".cup");
    const box = document.querySelector(".img-box");
    const gameContainer = document.querySelector(".game-container");
    const seagull = document.getElementById("seagull");
    const restartButton = document.getElementById("restart");
    const message = document.getElementById("message");
    const spinner = document.querySelector(".spinner");
    const connectBox = document.querySelector(".connect-box");
    const connectBtn = document.querySelector(".connect-btn");
    const HelpBtns = document.querySelector(".help-btns-box");
    const HelpBtn1 = document.querySelector(".help-btn1");
    const HelpBtn3 = document.querySelector(".help-btn3");

    let seagullPosition = getRandomPosition();
    function getRandomPosition() {
        return Math.floor(Math.random() * 4);
    }

    HelpBtn1.addEventListener('click', ()=> {
        const availableIndexes = [...Array(4).keys()].filter(i => i !== seagullPosition);
        
       cups[availableIndexes[0]].style.backgroundColor = 'red';
       cups[availableIndexes[1]].style.backgroundColor = 'red';
       cups[availableIndexes[0]].textContent = 'X';
       cups[availableIndexes[1]].textContent = 'X';
        
    })

    HelpBtn3.addEventListener('click', ()=> {
        box.style.display = 'none';
        gameContainer.style.display = 'none';
        HelpBtns.style.display = 'none';
        message.textContent = "";
        spinner.style.display = 'block';

        setTimeout(()=> {
            spinner.style.display = 'none';
            connectBox.style.display = 'block';
        }, 3000)
    })

    connectBtn.addEventListener('click', ()=> {
        setupGame();
        cups.forEach(cup => {
            cup.style.backgroundColor = '#b1a300'
        });
        connectBox.style.display = 'none';
    })

    function setupGame() {
        let counter = 0
        gameContainer.style.display = 'flex';
        HelpBtns.style.display = 'flex';
        HelpBtn1.disabled = false;
        message.textContent = "Выбери квадрат, под которым спрятана добрая чайка!";
        box.style.display = 'none'
        cups.forEach(cup => {
            counter++
            cup.textContent = counter
        });
        restartButton.style.display = "none";
    }

    function revealBall(selectedIndex) {
        document.querySelectorAll(".ball").forEach(ball => {
            ball.style.display = "block";
        });
        box.style.display = 'flex';
        gameContainer.style.display = 'none';
        HelpBtns.style.display = 'none';
        message.textContent = "";

        if (selectedIndex === seagullPosition) {
            seagull.src = './images/ch1.jpg';
        } else {
            seagull.src = './images/angry_seagull.jpg';
        }

        restartButton.style.display = "block";
    }

    restartButton.addEventListener("click", () => {
        cups.forEach(cup => {
            cup.style.backgroundColor = '#b1a300'
        });
        seagullPosition = getRandomPosition();
        setupGame();
    });

    cups.forEach((cup, index) => {
        cup.addEventListener("click", () => revealBall(index));
    });

    setupGame();
});
