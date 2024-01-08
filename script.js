document.addEventListener('DOMContentLoaded', () => {
    const board = document.getElementById('game-board');
    const cells = document.querySelectorAll('.cell');
    let currentPlayer = 'X';
    let gameBoard = ['', '', '', '', '', '', '', '', ''];
    let gameActive = true;

    // Add click event listener to each cell
    cells.forEach(cell => {
        cell.addEventListener('click', () => handleCellClick(cell));
    });

    function handleCellClick(cell) {
        const index = cell.dataset.index;

        if (gameBoard[index] === '' && gameActive) {
            gameBoard[index] = currentPlayer;
            cell.textContent = currentPlayer;
            checkForWin();
            switchPlayer();
        }
    }

    function checkForWin() {
        const winPatterns = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
            [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
            [0, 4, 8], [2, 4, 6]             // Diagonals
        ];

        for (const pattern of winPatterns) {
            const [a, b, c] = pattern;
            if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
                gameActive = false;
                highlightWinningCells(pattern);
                alert(`${currentPlayer} wins!`);
                break;
            }
        }

        if (!gameBoard.includes('') && gameActive) {
            gameActive = false;
            alert("It's a tie!");
        }
    }

    function switchPlayer() {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }

    function highlightWinningCells(pattern) {
        for (const index of pattern) {
            cells[index].style.backgroundColor = '#8eff8e';
        }
    }
});
