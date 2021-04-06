const game = {

    createBoard: function(){
        let board = document.querySelector('.game-container')
        for (let row_idx = 0; row_idx < 10; row_idx++){
            if (row_idx === 0)
                this.createHeader(board);
            const newRow = game.addRow(board);
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
    createHeader: function (board){
        board.insertAdjacentHTML(
            'beforeend',
            '<div class="board-header">This is the header</div>'
        );
    }
}
game.createBoard()


