document.addEventListener("keydown", function (event){
    if(event.key === 'ArrowUp' && game.direction[0] !== 1 && game.direction[1] !== 0){
        game.direction = [-1, 0];
    } else if(event.key === 'ArrowDown' && game.direction[0] !== -1 && game.direction[1] !== 0){
        game.direction = [1, 0];
    } else if(event.key === 'ArrowLeft' && game.direction[0] !== 0 && game.direction[1] !== 1){
        game.direction = [0, -1];
    } else if(event.key === 'ArrowRight' && game.direction[0] !== 0 && game.direction[1] !== -1){
        game.direction = [0, 1];
    }
});

const game = {
    direction: [0, -1], // default left dir

    createBoard: function(){
        let board = document.querySelector('.game-container');
        this.createHeader(board);
        this.createGameBoard(board);
        let gameField = document.querySelector('.game-board');
        for (let row_idx = 0; row_idx < 10; row_idx++){
            const newRow = game.addRow(gameField);
            for(let col_idx = 0; col_idx < 18; col_idx++){
                this.addCol(newRow, row_idx, col_idx);
            }
        }
    },
    addRow: function (board) {
        board.insertAdjacentHTML(
            'beforeend',
            '<div class="row"></div>'
        );
        return board.lastElementChild;
    },
    addCol: function (row, row_idx, col_idx) {
        row.insertAdjacentHTML(
            'beforeend',
            `<div class="board-field"
                        data-row="${row_idx}"
                        data-col="${col_idx}">.</div>`);
    },
    createHeader: function (board) {
        board.insertAdjacentHTML(
            'beforeend',
            '<div class="board-header"><div>1120</div><div>0:21</div></div>'
        );
    },
    createGameBoard: function (board){
        board.insertAdjacentHTML(
            'beforeend',
            '<div class="game-board"></div>'
        );
    },

    drawBoard: function (snakeElements) {
        snakeElements.forEach(elem =>
            document.querySelector(`[data-row="${elem[0]}"][data-col="${elem[1]}"]`).classList.add('snake')
        )
    },

    updateBoard: function (snakeElements) {
        try {
            document.querySelector(`[data-row="${snakeElements[0][0]}"][data-col="${snakeElements[0][1]}"]`).classList.add('snake')
            document.querySelector(`[data-row="${snakeElements[snakeElements.length - 1][0]}"][data-col="${snakeElements[snakeElements.length - 1][1]}"]`).classList.remove('snake')
        } catch {  // this is when snake goes off the board
            game.gameOver()
        }
    },

    gameOver: function (snakeElements) {
        clearInterval(snakeMoveInterval);
            alert('Game Over')
    },

    moveSnake: function (snakeElements) {
        let currentDir = game.direction;
        let newSnakeHeadIndex = [parseInt(`${snakeElements[0][0]+currentDir[0]}`), parseInt(`${snakeElements[0][1]+currentDir[1]}`)];
        let inSnake = game.isNewSnakeHeadInSnake(snakeElements, newSnakeHeadIndex);
        console.log(inSnake)
        if (game.isNewSnakeHeadInSnake(snakeElements, newSnakeHeadIndex)) {
            game.gameOver();
        } else {
            snakeElements.splice(0, 0, newSnakeHeadIndex);
        }

        game.updateBoard(snakeElements)
        snakeElements.pop();
    },

    isNewSnakeHeadInSnake: function(snakeElements, newSnakeHeadIndex) {
        for (let elem of snakeElements) {
            if (elem.toString() === newSnakeHeadIndex.toString()) {
                return true
            }
        }
        return false
    },

    snakeMove: function () {
        return setInterval(function () {
            game.moveSnake(snakeElements)
        },
        300)
    }
}


game.createBoard()
let snakeElements = [[4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12], [5, 12], [6, 12], [7, 12],]
game.drawBoard(snakeElements);
snakeMoveInterval = game.snakeMove()

