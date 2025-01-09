let timer;
let timeLeft = 20;
const startPauseButton = document.getElementById('start-pause-button'); 
const timerDisplay = document.getElementById('timer');
const grid = document.querySelector('.grid');
const messageDisplay = document.getElementById('message');
const cells = [];
let frogPosition = 76;
let gameInterval;

function createGrid() {
    for (let i = 0; i < 81; i++) {
        const cell = document.createElement('div');
        if (i === 76) cell.classList.add('starting-block');
        if (i === 4) cell.classList.add('ending-block');
        if ([19, 20, 21, 22, 23, 24, 25, 26, 27].includes(i)) cell.classList.add('c1');
        if ([37, 38, 39, 40, 41, 42, 43, 44, 45].includes(i)) cell.classList.add('c2');
        if ([55, 56, 57, 58, 59, 60, 61, 62, 63].includes(i)) cell.classList.add('c3');
        if ([1, 2, 3, 5, 6, 7].includes(i)) cell.classList.add('l1');
        if ([10, 11, 12, 14, 15, 16].includes(i)) cell.classList.add('l2');
        if ([28, 29, 30, 32, 33, 34].includes(i)) cell.classList.add('l3');
        if ([46, 47, 48, 50, 51, 52].includes(i)) cell.classList.add('l4');
        if ([64, 65, 66, 68, 69, 70].includes(i)) cell.classList.add('l5');
        if ([73, 74, 75, 77, 78, 79].includes(i)) cell.classList.add('lf2');
        if ([82, 83, 84, 86, 87, 88].includes(i)) cell.classList.add('lf3');
        grid.appendChild(cell);
        cells.push(cell);
    }
}

function moveFrog(e) {
    cells[frogPosition].classList.remove('frog');
    switch (e.key) {
        case 'ArrowUp':
            if (frogPosition - 9 >= 0) frogPosition -= 9;
            break;
        case 'ArrowDown':
            if (frogPosition + 9 < 81) frogPosition += 9;
            break;
        case 'ArrowLeft':
            if (frogPosition % 9 !== 0) frogPosition -= 1;
            break;
        case 'ArrowRight':
            if (frogPosition % 9 !== 8) frogPosition += 1;
            break;
    }
    cells[frogPosition].classList.add('frog');
    checkWin();
    checkLose();
}

function checkWin() {
    if (cells[frogPosition].classList.contains('ending-block')) {
        clearInterval(timer);
        clearInterval(gameInterval);
        messageDisplay.textContent = 'You win!';
        messageDisplay.style.display = 'block';
        messageDisplay.style.color = 'green';
        endGame();
    }
}


function checkLose() {
    if (
        cells[frogPosition].classList.contains('c1') ||
        cells[frogPosition].classList.contains('lf2') ||
        cells[frogPosition].classList.contains('lf3') ||
        timeLeft <= 0
    ) {
        clearInterval(timer);
        clearInterval(gameInterval);
        messageDisplay.textContent = 'You lose!';
        messageDisplay.style.display = 'block';
        messageDisplay.style.color = 'red';
        endGame();
    }
}

function endGame() {
    // Disable further game actions
    document.removeEventListener('keydown', moveFrog);
    startPauseButton.textContent = 'Play Again';

    startPauseButton.addEventListener('click', () => {
        location.reload(); // Reload the page to reset the game
    });
}

const moveCarsLeft = (carClass) => {
    const cars = document.querySelectorAll(`.${carClass}`);
    cars.forEach(car => {
        const currentCell = Array.from(grid.children).indexOf(car);
        car.classList.remove(carClass);
        const nextCell = (currentCell % 9 === 0) ? currentCell + 8 : currentCell - 1;
        cells[nextCell].classList.add(carClass);
    });
};

const moveCarsRight = (carClass) => {
    const cars = document.querySelectorAll(`.${carClass}`);
    cars.forEach(car => {
        const currentCell = Array.from(grid.children).indexOf(car);
        car.classList.remove(carClass);
        const nextCell = (currentCell % 9 === 8) ? currentCell - 8 : currentCell + 1;
        cells[nextCell].classList.add(carClass);
    });
};

const moveElements = () => {
    moveCarsLeft('c1');
    moveCarsRight('c2');
    moveCarsLeft('c3');
    moveCarsRight('l1');
    moveCarsLeft('l2');
    moveCarsRight('l3');
    moveCarsLeft('l4');
    moveCarsRight('l5');
    checkLose();
};

startPauseButton.addEventListener('click', () => {
    if (startPauseButton.textContent === 'Play Again') {
        location.reload(); // Reset the game on "Play Again"
    } else if (timer) {
        clearInterval(timer);
        clearInterval(gameInterval);
        timer = null;
        startPauseButton.textContent = 'Start';
    } else {
        timer = setInterval(() => {
            timeLeft--;
            timerDisplay.textContent = timeLeft;
            if (timeLeft <= 0) {
                clearInterval(timer);
                messageDisplay.textContent = 'You lose!';
                messageDisplay.style.display = 'block';
                messageDisplay.style.color = 'red';
                endGame();
            }
        }, 1000);
        gameInterval = setInterval(moveElements, 1000);
        startPauseButton.textContent = 'Pause';
    }
});

document.addEventListener('keydown', moveFrog);

function github_open(){
    window.open("https://github.com/PrasanthYT/F_Game", "_blank");
}

createGrid();
cells[frogPosition].classList.add('frog');
