const game = {

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
        this.placeSnakeOnBoard()
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
            '<div class="board-header">This is the header</div>'
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
    rightMovementLogic: function (){
        let snakeHead = document.querySelector('.snake-head');
        let snakeTail = document.querySelector('.snake-tail');

        snakeHead.classList.remove('snake-head');
        snakeHead.classList.add('snake');
        snakeHead = snakeHead.nextSibling;
        snakeHead.classList.add('snake-head');
        snakeTail.classList.remove('snake-tail');
        snakeTail.classList.remove('snake');
        snakeTail = snakeTail.nextSibling;
        snakeTail.classList.add('snake-tail');
    },
    placeSnakeOnBoard: function (){

        for (let i = 7; i < 10; i++){
            if(i === 7){
                document.querySelector(`[data-row="4"][data-col="${i}"]`).classList.toggle('snake-tail');
            } else if (i === 9){
                document.querySelector(`[data-row="4"][data-col="${i}"]`).classList.toggle('snake-head');
            } else {
                document.querySelector(`[data-row="4"][data-col="${i}"]`).classList.toggle('snake');
            }
        }
    }
}
game.createBoard()
game.snakeMovement()

