const game = {
    init: function () {
        this.drawBoard();
    },
    drawBoard: function () {
        let gameField = document.querySelector(".game-field");
        const rows = 18;
        const cols = 28;
        let cellIndex = 0;
        const sprite = {
            '90':"first_enemy",
            '92':"first_enemy",
            '94':"first_enemy",
            '96':"first_enemy",
            '98':"first_enemy",
            '100':"first_enemy",
            '102':"first_enemy",
            '104':"first_enemy",
            '106':"first_enemy",
            '147':"second_enemy",
            '149':"second_enemy",
            '151':"second_enemy",
            '153':"second_enemy",
            '155':"second_enemy",
            '157':"second_enemy",
            '159':"second_enemy",
            '161':"second_enemy",
            '204':"third_enemy",
            '206':"third_enemy",
            '208':"third_enemy",
            '210':"third_enemy",
            '212':"third_enemy",
            '214':"third_enemy",
            '216':"third_enemy",
        }
        for (let row = 0; row < rows; row++) {
            const rowElement = this.addRow(gameField);
            for (let col = 0; col < cols; col++) {
                const index = cellIndex.toString();
                console.log(sprite[index])

                this.addCell(rowElement, row, col, sprite[index], cellIndex)
                cellIndex++;
            }
        }
    },
    addRow: function (gameField) {
        gameField.insertAdjacentHTML(
            'beforeend',
            '<div class="row"></div>'
        );
        return gameField.lastElementChild;
    },
    addCell: function (rowElement, row, col, className, cellIndex) {
        rowElement.insertAdjacentHTML(
            'beforeend',
            `<div class="field ${className === undefined ? '' : className}"
                        data-index="${cellIndex}"
                        data-row="${row}"
                        data-col="${col}"></div>`);
    },
}
// ${isEnemy ? {} : ''}
game.init();
