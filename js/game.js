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
        let playerPos = document.querySelector('.player');
            if (e.key==="ArrowLeft"){
                game.moveLeft(playerPos);
            }
            else if (e.key==="ArrowRight"){
                game.moveRight(playerPos);
            }else if (e.key===" "){
                game.shoot(playerPos);
            }
    },
    moveLeft: function(playerPos){
        if (playerPos.dataset.col !== "0"){
            playerPos.previousSibling.classList.add("player");
            playerPos.classList.remove("player");
        }
    },
    moveRight: function(playerPos){
        if (parseInt(playerPos.dataset.col) !== this.cols-1){
            playerPos.nextSibling.classList.add("player");
            playerPos.classList.remove("player");
            }
        },
    shoot: function(playerPos){
        let j = playerPos.dataset.col;
        let i = this.rows-2;
        let shootStart = setInterval(function(){
            if (i!==0) {
                let shootPos = document.querySelector(`.field[data-col="${j}"][data-row="${i}"]`);
                let prevShootPos = document.querySelector(`.field[data-col="${j}"][data-row="${i+1}"]`);
                shootPos.classList.add('shoot');
                if (shootPos.classList.contains("first_enemy") || shootPos.classList.contains("second_enemy") || shootPos.classList.contains("third_enemy")
                || shootPos.classList.contains("fourth_enemy")){
                    clearInterval(shootStart);
                    game.clearShootBeams();
                    let enemyClass = shootPos.getAttribute('class').split(" ")[1];
                    shootPos.classList.remove(enemyClass)
                }
                prevShootPos.classList.remove('shoot');
                i--;
            }else{
                clearInterval(shootStart);
                game.clearShootBeams();
            }
        }, 100);
    },
    clearShootBeams: function(){
        let beams = document.querySelectorAll(".shoot");
        for (let beam of beams){
                beam.classList.remove("shoot")
                }
    },

    moveInvaders: function () {
        let direction = "left";
        setInterval(function () {
            let enemyDivs = document.querySelectorAll('[class*=enemy]')
        let enemyColumns = [...enemyDivs].map(item => {
            return item.dataset.col; })
        for (let index = 0; index < enemyDivs.length; index++) {
            let enemyClass = enemyDivs[index].getAttribute('class').split(" ")[1];
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
                for (let newIndex = 0; newIndex <= enemyDivs.length; newIndex++) {
                    let enemyClass = enemyDivs[newIndex].getAttribute('class').split(" ")[1];
                    let i = enemyDivs[newIndex].dataset.col;
                    let j = enemyDivs[newIndex].dataset.row;
                    let lower = document.querySelector(`.field[data-col="${i}"][data-row="${parseInt(j) + 1}"]`)
                    enemyDivs[newIndex].classList.remove(enemyClass);
                    lower.classList.add(enemyClass);
                }}
             if (enemyColumns.includes('17') && direction === "right") {
                 direction = "left";
                 for (let newIndex = 0; newIndex <= enemyDivs.length; newIndex++) {
                     let enemyClass = enemyDivs[newIndex].getAttribute('class').split(" ")[1];
                    let i = enemyDivs[newIndex].dataset.col;
                    let j = enemyDivs[newIndex].dataset.row;
                 let lower = document.querySelector(`.field[data-col="${i}"][data-row="${parseInt(j) + 1}"]`)
                 enemyDivs[newIndex].classList.remove(enemyClass);
                 lower.classList.add(enemyClass);
                 }
             }

        }}, 1500)

    },



}
game.init();
