import inquirer from "inquirer";
import chalk from "chalk";
console.log("\t", chalk.bold.greenBright(`Welcome to the game...`));
async function ticTacToeGame() {
    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ];
    let currentPlayer = 'X';
    const printBoard = () => {
        console.log('   0  1  2');
        for (let i = 0; i < 3; i++) {
            console.log(`${i}  ${board[i].join('  ')}`);
        }
    };
    const checkWin = () => {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (board[i][0] === currentPlayer && board[i][1] === currentPlayer && board[i][2] === currentPlayer) {
                return true;
            }
        }
        // Check columns
        for (let i = 0; i < 3; i++) {
            if (board[0][i] === currentPlayer && board[1][i] === currentPlayer && board[2][i] === currentPlayer) {
                return true;
            }
        }
        // Check diagonals
        if ((board[0][0] === currentPlayer && board[1][1] === currentPlayer && board[2][2] === currentPlayer) ||
            (board[0][2] === currentPlayer && board[1][1] === currentPlayer && board[2][0] === currentPlayer)) {
            return true;
        }
        return false;
    };
    console.log('Welcome to Tic Tac Toe!');
    while (true) {
        printBoard();
        const { row, col } = await inquirer.prompt([
            {
                type: 'number',
                name: 'row',
                message: 'Enter row (0, 1, or 2):',
                validate: input => (input >= 0 && input <= 2) || 'Please enter a valid row (0, 1, or 2)'
            },
            {
                type: 'number',
                name: 'col',
                message: 'Enter column (0, 1, or 2):',
                validate: input => (input >= 0 && input <= 2) || 'Please enter a valid column (0, 1, or 2)'
            }
        ]);
        if (board[row][col] === '') {
            board[row][col] = currentPlayer;
            if (checkWin()) {
                console.log(`Player ${currentPlayer} wins!`);
                break;
            }
            else if (board.every(row => row.every(cell => cell !== ''))) {
                console.log('It\'s a draw!');
                break;
            }
            else {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            }
        }
        else {
            console.log('That cell is already occupied. Try again.');
        }
    }
}
;
ticTacToeGame();
