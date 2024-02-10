const board = document.querySelector('.board');
const cells = [];
let currentPlayer = 'X';
let gameOver = false;
const winnerMessage = document.getElementById('winner-message');
const playAgainButton = document.getElementById('play-again-button');

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', handleClick);
        cells.push(cell);
        board.appendChild(cell);
    }
}

function handleClick(e) {
    if (gameOver) return;
    const cell = e.target;
    if (cell.textContent) return;
    cell.textContent = currentPlayer;
    checkWin();
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (const line of lines) {
        const [a, b, c] = line;
        const cellA = cells[a];
        const cellB = cells[b];
        const cellC = cells[c];
        if (cellA.textContent && cellA.textContent === cellB.textContent && cellA.textContent === cellC.textContent) {
            gameOver = true;
            cellA.classList.add('winner');
            cellB.classList.add('winner');
            cellC.classList.add('winner');
            winnerMessage.textContent = `${cellA.textContent} wins!`;
            document.querySelector('.board').classList.add('game-over');
            return;
        }
    }
    if (!cells.some(cell => !cell.textContent)) {
        gameOver = true;
        winnerMessage.textContent = 'It\'s a draw!';
        document.querySelector('.board').classList.add('game-over');
    }
}

playAgainButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winner');
    });
    currentPlayer = 'X';
    gameOver = false;
    winnerMessage.textContent = '';
    document.querySelector('.board').classList.remove('game-over');
});

createBoard();