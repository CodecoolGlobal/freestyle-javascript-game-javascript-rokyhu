const game = {
    stopQueries: false,
    rows : 11,
    cols : 18,
    life: 3,
    score: 0,

    initStartScreen: function (){
        let mainScreen = document.querySelector('.game-field');
          mainScreen.innerHTML = '';
          mainScreen.insertAdjacentHTML(
          'beforeend',
          '<div class="startscreen">\n' +
          '    <button class="myButton" id="start">start</button>\n' +
          '</div>'
      );
    },

    init: function () {
        this.clearScreen();
        this.createHeader();
        this.drawBoard();
        this.initKeyPress();
        this.startTime = new Date();
        this.startTimer();
        this.moveInvaders();
        this.initInvadersShoot();
    },

    createHeader: function () {
        if (! document.querySelector(".board-header")) {
            let board = document.querySelector('.game-container');
                board.insertAdjacentHTML(
                    'afterbegin',
                     '<div class="board-header">' +
                    `<div>Life: <span id="life">${this.life}</span></div>` +
                    '<div>Score: <span id="score">0</span></div>' +
                    '<div><span id="time">0:00</span></div></div>'
            )}
    },

    changeHeaderData: function (elemID, newData) {
        let elem = document.querySelector(`#${elemID}`)
        elem.innerHTML = newData
    },

    drawBoard: function () {
        let gameField = document.querySelector(".game-field");
        let cellIndex = 0;
        const sprite = {
            '189': 'player',
            '20':"first_enemy", '22':"first_enemy", '24':"first_enemy", '26':"first_enemy",
            '28':"first_enemy", '30':"first_enemy", '32':"first_enemy", '39':"second_enemy",
            '41':"second_enemy", '43':"second_enemy", '45':"second_enemy", '47':"second_enemy",
            '49':"second_enemy", '51':"second_enemy", '56':"third_enemy", '58':"third_enemy",
            '60':"third_enemy", '62':"third_enemy", '64':"third_enemy", '66':"third_enemy",
            '68':"third_enemy", '75':"fourth_enemy", '77':"fourth_enemy", '79':"fourth_enemy",
            '81':"fourth_enemy", '83':"fourth_enemy", '85':"fourth_enemy", '87':"fourth_enemy",
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

    startTimer: function (){
        setTimeout(game.stopwatchDisplay, 1000);
    },

    stopwatchDisplay: function () {
        let endTime = new Date();
        let timeDiff = endTime - game.startTime;
        timeDiff /= 1000;
        let seconds = Math.round(timeDiff % 60);
        if (seconds.toString().length < 2 && game.stopQueries !== true) {
             game.changeHeaderData("time", String(seconds).padStart(4, "0:0"));
        } else if(seconds.toString().length >= 2 && game.stopQueries !== true){
            game.changeHeaderData("time", String(seconds).padStart(4, "0:"));
        }
        if (game.stopQueries !== true)
            setTimeout(game.stopwatchDisplay, 1000);
    },

    checkIfWon: function(){
      let enemies = document.querySelectorAll('[class*=enemy]');
      if(enemies.length===0){
          return true;
      }
    },

    checkIfGameOver: function(){
      let enemies = document.querySelectorAll('[class*=enemy]');
      for (let enemy of enemies){
          if (enemy.dataset.row == this.rows-2){
              return true;
          }
      }
    },

    initGameOverScreen: function(){
        game.stopQueries = true;
        game.clearScreen();
        let mainScreen = document.querySelector('.game-field');
        mainScreen.insertAdjacentHTML(
          'beforeend',
          '<div class="gameoverscreen">\n' +
          '    <button class="myButton" id="restart">Restart</button>\n' +
          '    <button class="myButton" id="back">Back</button>\n' +
          '</div>'
        );
        document.removeEventListener('keydown', this.logKey);
        document.getElementById('restart').onclick = function(){
            location.reload();
        }
        document.getElementById('back').onclick = function(){
            window.history.back()
        }
    },
    initWinScreen: function(){
        game.stopQueries = true;
        game.clearScreen();
        let mainScreen = document.querySelector('.game-field');
        mainScreen.insertAdjacentHTML(
          'beforeend',
          '<div class="winscreen">\n' +
          '    <button class="myButton" id="restart">Restart</button>\n' +
          '    <button class="myButton" id="back">Back</button>\n' +
          '</div>'
      );
        document.removeEventListener('keydown', this.logKey);
        document.getElementById('restart').onclick = function(){
            location.reload();
        }
        document.getElementById('back').onclick = function(){
            window.history.back()}
    },

    clearScreen: function(){
      let mainScreen = document.querySelector('.game-field');
      mainScreen.innerHTML = '';
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
        let i = this.rows-3;
        let shootStart = setInterval(function(){
            if (i!==0) {
                let shootPos = document.querySelector(`.field[data-col="${j}"][data-row="${i}"]`);
                let prevShootPos = document.querySelector(`.field[data-col="${j}"][data-row="${i+1}"]`);
                if (shootPos !== null && prevShootPos !== null) {
                    shootPos.classList.add('shoot'); //TODO why is value null?
                    if(shootPos.getAttribute("class").match(/enemy/) || shootPos.classList.contains("bomb")){
                        clearInterval(shootStart);
                        game.clearShootBeams();
                        let enemyClass = shootPos.getAttribute('class').split(" ")[1];
                        shootPos.classList.remove(enemyClass);
                        game.increaseScore();
                        let gameStatus = game.checkIfWon();
                        if (gameStatus) {
                            clearInterval(shootStart);
                            game.initWinScreen()
                            }
                        }
                prevShootPos.classList.remove('shoot');
                i--;}
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

    checkIfHit: function(){
        let playerPos = document.querySelector(".player");
        if (playerPos !== null){
        let colPos = playerPos.dataset.col;
        if (playerPos.parentElement.previousSibling.children[colPos].classList.contains("bomb")){
            this.life--;
            playerPos.parentElement.previousSibling.children[colPos].classList.remove("bomb");
            game.changeHeaderData("life", this.life)
            if(this.life<=0){
                game.changeHeaderData("life", this.life)
                game.initGameOverScreen();
            }
            return true;
        }
        }else{
            return false;
        }
    },

    increaseScore: function () {
        game.score += 10;
        game.changeHeaderData("score", game.score);
    },

    getRandomBombPos: function () {
        let invaders = document.querySelectorAll('[class*=enemy]')
        let shootersNum = Math.floor(Math.random() * invaders.length/50) // random number of bombs
        let bombPos = new Set()
        for (let index = 0; index <= shootersNum; index++) { // random positions from where bombs will be sent
            let randomInvader = invaders[Math.floor(Math.random() * (invaders.length-1))]
            if (randomInvader !== undefined){
                let i = randomInvader.dataset.row
                let j = randomInvader.dataset.col
            bombPos.add(document.querySelector(`.field[data-col="${j}"][data-row="${parseInt(i)+1}"]`))
        }}
        return bombPos;
    },

    initInvadersShoot: function  () {
        setInterval(function(){
            let startPos = game.getRandomBombPos()
            for (let position of startPos) {
                 let i = parseInt(position.dataset.row);
                 if (i !== game.rows-3) {
                     position.classList.add('bomb');}
        }
        game.moveBombs()
        }, 1000)
    },

    moveBombs: function () {
        let allBombs = document.querySelectorAll(".bomb")

        for (let bomb of allBombs) {
            let row = parseInt(bomb.dataset.row);
            let shootInvStart = setInterval(function () {
                if (row < game.rows-1) {
                    let nextShootPos = document.querySelector(`.field[data-col="${bomb.dataset.col}"][data-row="${parseInt(bomb.dataset.row) + 1}"]`);
                    if (nextShootPos !== null) {
                    nextShootPos.classList.add('bomb');
                    } else {
                        return
                    }
                    //TODO why is value null?
                } else {
                    if (allBombs.length > 0){
                        let hit = game.checkIfHit();
                        if(hit){
                            clearInterval(shootInvStart)
                        }
                    }
                    clearInterval(shootInvStart);
                    bomb.classList.remove('bomb');
                }
                bomb.classList.remove('bomb');
                row++;
            }, 100);
        }
    },

    moveDown: function (enemyDivs) {
        for (let newIndex = 0; newIndex <= enemyDivs.length; newIndex++) {
            let enemyClass = enemyDivs[newIndex].getAttribute('class').split(" ")[1];
            let i = enemyDivs[newIndex].dataset.col;
            let j = enemyDivs[newIndex].dataset.row;
            let lower = document.querySelector(`.field[data-col="${i}"][data-row="${parseInt(j) + 1}"]`)
            enemyDivs[newIndex].classList.remove(enemyClass);
            lower.classList.add(enemyClass);

        }
    },

    moveInvaders: function () {
        let direction = "left";
        let enemyMoveInterval = setInterval(function () {
        let isGameOver = game.checkIfGameOver();
        if (isGameOver){
                clearInterval(enemyMoveInterval)
                game.initGameOverScreen();
        }
        let enemyDivs = document.querySelectorAll('[class*=enemy]')
        let enemyColumns = [...enemyDivs].map(item => {
            return item.dataset.col; })
        for (let index = 0; index < enemyDivs.length; index++) {
            let enemyClass = enemyDivs[index].getAttribute('class').split(" ")[1];
            if (direction === "left" && !enemyColumns.includes('0')) {
                enemyDivs[index].previousSibling.classList.add(enemyClass);
                enemyDivs[index].classList.remove(enemyClass);
            }
            if (direction === "right" && !enemyColumns.includes(`${game.cols-1}`)) {
                enemyDivs[index].nextSibling.classList.add(enemyClass);
                enemyDivs[index].classList.remove(enemyClass);
            }
            if (enemyColumns.includes('0') && direction === "left") {
                direction = "right";
                game.moveDown(enemyDivs);
            }
            else if (enemyColumns.includes(`${game.cols-1}`) && direction === "right") {
                direction = "left";
                game.moveDown(enemyDivs);
            }
        }
        }, 1000)
    },
}


game.initStartScreen();
document.getElementById('start').onclick = function(){
    game.init();
}

