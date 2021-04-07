const game = {
    rows : 12,
    cols : 18,
    // sprite: {
    //         '189': 'player',
    //         '20':"first_enemy",
    //         '22':"first_enemy",
    //         '24':"first_enemy",
    //         '26':"first_enemy",
    //         '28':"first_enemy",
    //         '30':"first_enemy",
    //         '32':"first_enemy",
    //         '39':"second_enemy",
    //         '41':"second_enemy",
    //         '43':"second_enemy",
    //         '45':"second_enemy",
    //         '47':"second_enemy",
    //         '49':"second_enemy",
    //         '51':"second_enemy",
    //         '56':"third_enemy",
    //         '58':"third_enemy",
    //         '60':"third_enemy",
    //         '62':"third_enemy",
    //         '64':"third_enemy",
    //         '66':"third_enemy",
    //         '68':"third_enemy",
    //         '75':"fourth_enemy",
    //         '77':"fourth_enemy",
    //         '79':"fourth_enemy",
    //         '81':"fourth_enemy",
    //         '83':"fourth_enemy",
    //         '85':"fourth_enemy",
    //         '87':"fourth_enemy",
    //     },

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
            // '39':"second_enemy",
            // '41':"second_enemy",
            // '43':"second_enemy",
            // '45':"second_enemy",
            // '47':"second_enemy",
            // '49':"second_enemy",
            // '51':"second_enemy",
            // '56':"third_enemy",
            // '58':"third_enemy",
            // '60':"third_enemy",
            // '62':"third_enemy",
            // '64':"third_enemy",
            // '66':"third_enemy",
            // '68':"third_enemy",
            // '75':"fourth_enemy",
            // '77':"fourth_enemy",
            // '79':"fourth_enemy",
            // '81':"fourth_enemy",
            // '83':"fourth_enemy",
            // '85':"fourth_enemy",
            // '87':"fourth_enemy",

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
        let direction = "left";
        setInterval(function () {
        //     console.log()
        // }////
            let enemyDivs = document.querySelectorAll(".first_enemy")

        let enemyColumns = [...enemyDivs].map(item => {
            return item.dataset.col; })
        for (let index = 0; index < enemyDivs.length; index++) {
            // console.log(enemyDivs[index].classList.contains('first_enemy'))
            let enemyClass = "first_enemy"
            // console.log(enemyColumns)

            if (direction === "left" && !enemyColumns.includes('0')) {
                enemyDivs[index].previousSibling.classList.add(enemyClass);
                enemyDivs[index].classList.remove(enemyClass);
            }
            if (direction === "right" && !enemyColumns.includes('17')) {
                enemyDivs[index].nextSibling.classList.add(enemyClass);
                enemyDivs[index].classList.remove(enemyClass);
            }
            if (enemyColumns.includes('0') && direction === "left") {
                direction = "right";
                // enemyDivs[index].nextSibling.classList.add(enemyClass);
                // enemyDivs[index].classList.remove(enemyClass);
                for (let newIndex = 0; newIndex < enemyDivs.length; newIndex++) {
                    let i = enemyDivs[newIndex].getAttribute('data-col');
                    let j = enemyDivs[newIndex].getAttribute('data-row');
                //     console.log(enemyDivs[newIndex])
                    // enemyDivs[newIndex].classList.remove(enemyC);
                    let lower = document.querySelector(`.field[data-col="${i}"][data-row="${parseInt(j) + 1}"]`)
                    lower.classList.add(enemyClass);
                    enemyDivs[newIndex].classList.remove(enemyClass);
                    console.log(enemyDivs[newIndex].className)
                }

                //
                // let actualShootPos = document.querySelector(.field[data-col="${j}"][data-row="${i}"]);
                // let prevShootPos = document.querySelector(.field[data-col="${j}"][data-row="${i+1}"]);
                }

             if (enemyColumns.includes('17') && direction === "right") {
                 direction = "left";
                 enemyDivs[index].previousSibling.classList.add(enemyClass);
                 enemyDivs[index].classList.remove(enemyClass);
                 // for (let newIndex = 0; newIndex < enemyDivs.length; newIndex++) {
                 //     let enemyC1 = "first_enemy"
                 //     let i = enemyDivs[newIndex].getAttribute('data-col');
                 //     let j = enemyDivs[newIndex].getAttribute('data-row');
                 // enemyDivs[newIndex].className = 'field'
                 // let lower = document.querySelector(`[data-col="${i}"][data-row="${parseInt(j) + 1}"]`)
                 // lower.classList.add(enemyC1);
                 // }}
             }

        }}, 1500)

    },


    // moveInvaders2: function () {
    //     let direction = "left";
    //     setInterval(function () {
    //         let size=0;
    //             for(let k in game.sprite) {
    //               size++
    //                 console.log(game.sprite[k])
    //             }
    //         for (let index = 0; index < size; index++) {
    //             let indexStr =  index.toString();
    //         }
    //     }, 500)
    //
    // }
}

game.init();
