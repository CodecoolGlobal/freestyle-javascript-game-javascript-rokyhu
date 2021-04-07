const game = {

    left: [0, -1],
    right: [0, 1],
    down: [1, 0],
    up: [-1, 0],

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
        // this.placeSnakeOnBoard()
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
    snakeMovement: function (){
        let direction = 'right';
        setInterval(function (){
            if(direction === "right"){
                game.rightMovementLogic()
            }
        },300)
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
        } catch {
            clearInterval(snakeMoveInterval);
            alert('Game Over')
        }
    },

    moveSnake: function (snakeElements) {
        let dir = 'left'
        let currentDir
        if (dir === 'left') {
            currentDir = game.left // [0, -1]
        } else if (dir === 'right') {
            currentDir = game.right
        } else if (dir === 'up') {
            currentDir = game.up
        } else if (dir === 'down') {
            currentDir = game.down
        }
        let newSnakeHeadIndex = [parseInt(`${snakeElements[0][0]+currentDir[0]}`), parseInt(`${snakeElements[0][1]+currentDir[1]}`)];
        snakeElements.splice(0, 0, newSnakeHeadIndex);
        game.updateBoard(snakeElements)
        snakeElements.pop();
    },

    snakeMove: function () {
        return setInterval(function () {
            game.moveSnake(snakeElements)
        },
        1000)
    }


    // rightMovementLogic: function (){
    //     let snakeHead = document.querySelector('.snake-head');
    //     let snakeTail = document.querySelector('.snake-tail');
    //
    //     snakeHead.classList.remove('snake-head');
    //     snakeHead.classList.add('snake');
    //     snakeHead = snakeHead.nextSibling;
    //     snakeHead.classList.add('snake-head');
    //     snakeTail.classList.remove('snake-tail');
    //     snakeTail.classList.remove('snake');
    //     snakeTail = snakeTail.nextSibling;
    //     snakeTail.classList.add('snake-tail');
    // },

    // placeSnakeOnBoard: function (){
    //
    //     for (let i = 7; i < 10; i++){
    //         if(i === 7){
    //             document.querySelector(`[data-row="4"][data-col="${i}"]`).classList.toggle('snake-tail');
    //         } else if (i === 9){
    //             document.querySelector(`[data-row="4"][data-col="${i}"]`).classList.toggle('snake-head');
    //         } else {
    //             document.querySelector(`[data-row="4"][data-col="${i}"]`).classList.toggle('snake');
    //         }
    //     }
    // }
}


game.createBoard()
let snakeElements = [[4, 7], [4, 8], [4, 9], [4, 10], [4, 11], [4, 12], [5, 12], [6, 12], [7, 12],]
game.drawBoard(snakeElements);
snakeMoveInterval = game.snakeMove()
// game.snakeMovement()

