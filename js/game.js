const game = {
    rows : 12,
    cols : 18,
    init: function () {
        this.drawBoard();
        this.initKeyPress();
        this. moveInvaders();
    },
    drawBoard: function () {
        let gameField = document.querySelector(".game-field");
        let cellIndex = 0;
        const sprite = {
            '189': 'player',
            '20':"first_enemy",
            '22':"first_enemy",
            '24':"first_enemy",
            '26':"first_enemy",
            '28':"first_enemy",
            '30':"first_enemy",
            '32':"first_enemy",
            '39':"second_enemy",
            '41':"second_enemy",
            '43':"second_enemy",
            '45':"second_enemy",
            '47':"second_enemy",
            '49':"second_enemy",
            '51':"second_enemy",
            '56':"third_enemy",
            '58':"third_enemy",
            '60':"third_enemy",
            '62':"third_enemy",
            '64':"third_enemy",
            '66':"third_enemy",
            '68':"third_enemy",
            '75':"fourth_enemy",
            '77':"fourth_enemy",
            '79':"fourth_enemy",
            '81':"fourth_enemy",
            '83':"fourth_enemy",
            '85':"fourth_enemy",
            '87':"fourth_enemy",

        }
        for (let row = 0; row < this.rows; row++) {
            const rowElement = this.addRow(gameField);
            for (let col = 0; col < this.cols; col++) {
                const index = cellIndex.toString();
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
    initKeyPress: function(){
        document.addEventListener('keydown', this.logKey);

    },
    logKey: function(e) {
            if (e.key==="ArrowLeft"){
                game.moveLeft();
            }
            else if (e.key==="ArrowRight"){
                game.moveRight();
            }
    },
    moveLeft: function(){
        let playerPos = document.querySelector('.player');
        if (playerPos.dataset.col !== "0"){
            playerPos.previousSibling.classList.add("player");
            playerPos.classList.remove("player");
        }
    },
    moveRight: function(){
        let playerPos = document.querySelector('.player');
        if (parseInt(playerPos.dataset.col) !== this.cols-1){
            playerPos.nextSibling.classList.add("player");
            playerPos.classList.remove("player");
            }
        },

    moveInvaders: function () {
        // let enemyDivs = document.querySelectorAll('[class*=enemy]')
        // let enemyColumns = [...enemyDivs].map(item => {
        //     return item.dataset.col; })
        // // console.log(enemyDivs);
        // //
        // let direction = "left";
        // for (let index = 0; index < enemyDivs.length; index++) {
        //     let enemyClass = enemyDivs[index].getAttribute('class').split(" ")[1];
            // console.log(enemyClass);
                    setInterval(function () {
                        let enemyDivs = document.querySelectorAll('[class*=enemy]')
        let enemyColumns = [...enemyDivs].map(item => {
            return item.dataset.col; })
        let direction = "left";
        for (let index = 0; index < enemyDivs.length; index++) {
            let enemyClass = enemyDivs[index].getAttribute('class').split(" ")[1];
                    setInterval(function () {
                        if (direction === "left" && !enemyColumns.includes('0')) {
                            enemyDivs[index].previousSibling.classList.add('field', enemyClass);
                            enemyDivs[index].classList.remove(enemyClass);
                        }
                        else if (direction === "right" && !enemyColumns.includes('17')) {
                            enemyDivs[index].nextSibling.classList.add('field', enemyClass);
                            enemyDivs[index].classList.remove(enemyClass);
                            // console.log('direction === "right"')
                        }
                        if (enemyColumns.includes('0')) {
                            direction = "right";
                            enemyDivs[index].classList.remove(enemyClass);
                            enemyDivs[index].nextSibling.classList.add('field', enemyClass);
                            // console.log('0')
                        }
                        // else {
                        //     direction = "left";
                        // }
                        if (enemyColumns.includes('17')) {
                            direction = "left";
                            enemyDivs[index].classList.remove(enemyClass);
                            enemyDivs[index].previousSibling.classList.add('field', enemyClass);
                            // console.log('17')
                        }
                        // else {
                        //     direction = "right"
                        //     // console.log('left')
                        // }

            }, 500)}}, 1989)

    }
}

game.init();
