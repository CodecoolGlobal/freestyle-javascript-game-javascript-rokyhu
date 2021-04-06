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
    placeSnakeOnBoard: function (){
        let snakePart0 = document.querySelector('[data-row="4"][data-col="4"]');
        let snakePart1 = document.querySelector('[data-row="4"][data-col="5"]');
        let snakePart2 = document.querySelector('[data-row="4"][data-col="6"]');

        for (let i = 7; i < 10; i++){
            document.querySelector(`[data-row="4"][data-col="${i}"]`).style.backgroundColor = "yellow";
        }
    }
}
game.createBoard()


