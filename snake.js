window.onload = () => {

    const game = {
        direction: [0, -1], // default left dir
        snakeElements: [],
        snakeMoveInterval: {},
        powerupLocation: [3, 2],
        score: 0,

        initGame: function () {
            let gameContainer = document.querySelector('.game-container')
            gameContainer.addEventListener('click', initGameFunction);

            function initGameFunction() {
                game.createBoard();
                game.snakeElements = [[4, 13], [4, 14], [4, 15],];
                game.drawBoard();
                game.spawnPowerup();
                game.initKeypress();
                game.snakeMove();
                gameContainer.removeEventListener('click', initGameFunction);
            }

        },

        createBoard: function(){
            let board = document.querySelector('.game-container');
            board.classList.remove('snake-intro-animation')
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

        getRandomNum: function (max_value){
            return Math.floor(Math.random() * max_value);
        },
        spawnPowerup: function () {
            let targetField;
            let row_idx;
            let col_idx;
            do {
                let row = this.getRandomNum(9);
                let col = this.getRandomNum(17);
                row_idx = row;
                col_idx = col;
                targetField = document.querySelector(`[data-row="${row}"][data-col="${col}"]`)
            } while (targetField.classList.contains('snake') ||
                     targetField.classList.contains('snake-head-up') ||
                     targetField.classList.contains('snake-head-down') ||
                     targetField.classList.contains('snake-head-left') ||
                     targetField.classList.contains('snake-head-right'));
            targetField.classList.add('snake-food')
            game.powerupLocation = [row_idx, col_idx];
        },
        isHeadOnPowerupField: function (head){
            let food = game.powerupLocation;
            return head[0] === food[0] && head[1] === food[1];
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
                            data-col="${col_idx}"></div>`);
        },

        createHeader: function (board) {
            board.insertAdjacentHTML(
                'beforeend',
                '<div class="board-header"><div class="score">0</div><div>0:21</div></div>'
            );
        },

        createGameBoard: function (board){
            board.insertAdjacentHTML(
                'beforeend',
                '<div class="game-board"></div>'
            );
        },

        drawBoard: function () {
            document.querySelector(`[data-row="${game.snakeElements[0][0]}"][data-col="${game.snakeElements[0][1]}"]`).classList.add('snake-head-left')
            for (let elem of game.snakeElements.slice(1, game.snakeElements.length-1)) {
                document.querySelector(`[data-row="${elem[0]}"][data-col="${elem[1]}"]`).classList.add('snake')
            }
        },

        initKeypress: function () {
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
        },

        updateBoard: function (currentDir) {
            try {
                if (currentDir.toString() === [-1, 0].toString()) {  // up
                    document.querySelector(`[data-row="${game.snakeElements[0][0]}"][data-col="${game.snakeElements[0][1]}"]`).classList.add('snake-head-up')
                } else if (currentDir.toString() === [1, 0].toString()) {  // down
                    document.querySelector(`[data-row="${game.snakeElements[0][0]}"][data-col="${game.snakeElements[0][1]}"]`).classList.add('snake-head-down')
                } else if (currentDir.toString() === [0, -1].toString()) {  // left
                    document.querySelector(`[data-row="${game.snakeElements[0][0]}"][data-col="${game.snakeElements[0][1]}"]`).classList.add('snake-head-left')
                } else if (currentDir.toString() === [0, 1].toString()) {  // right
                    document.querySelector(`[data-row="${game.snakeElements[0][0]}"][data-col="${game.snakeElements[0][1]}"]`).classList.add('snake-head-right')
                }
            } catch {  // this is when snake goes off the board
                game.gameOver()
            }
            document.querySelector(`[data-row="${game.snakeElements[1][0]}"][data-col="${game.snakeElements[1][1]}"]`).classList.remove('snake-head-up')
            document.querySelector(`[data-row="${game.snakeElements[1][0]}"][data-col="${game.snakeElements[1][1]}"]`).classList.remove('snake-head-down')
            document.querySelector(`[data-row="${game.snakeElements[1][0]}"][data-col="${game.snakeElements[1][1]}"]`).classList.remove('snake-head-left')
            document.querySelector(`[data-row="${game.snakeElements[1][0]}"][data-col="${game.snakeElements[1][1]}"]`).classList.remove('snake-head-right')
            document.querySelector(`[data-row="${game.snakeElements[1][0]}"][data-col="${game.snakeElements[1][1]}"]`).classList.add('snake')
            document.querySelector(`[data-row="${game.snakeElements[game.snakeElements.length - 1][0]}"][data-col="${game.snakeElements[game.snakeElements.length - 1][1]}"]`).classList.remove('snake')
        },

        gameOver: function () {
            clearInterval(game.snakeMoveInterval);
            let gameContainer = document.querySelector('.game-container')
            while (gameContainer.firstChild) {
                gameContainer.removeChild(gameContainer.firstChild);
            }
            gameContainer.classList.add('snake-outro-animation');
            game.DisplayScore(gameContainer)
            gameContainer.addEventListener('click', function() {
                location.reload()
            });

        },

        DisplayScore: function (board) {
            board.insertAdjacentHTML(
                'beforeend',
                `<div class="score-display"><h1>SCORE: ${game.score}</h1></div>`
            );
        },

        moveSnake: function () {
            let currentDir = game.direction;
            let newSnakeHeadIndex = [parseInt(`${game.snakeElements[0][0]+currentDir[0]}`), parseInt(`${game.snakeElements[0][1]+currentDir[1]}`)];
            if (game.isNewSnakeHeadInSnake(newSnakeHeadIndex)) {
                    game.gameOver();
                } else {
                    game.snakeElements.splice(0, 0, newSnakeHeadIndex);
                }
            game.updateBoard(currentDir)
            if(this.isHeadOnPowerupField(newSnakeHeadIndex)){
                this.score++;
                document.querySelector('.score').textContent++;
                let food = document.querySelector(`[data-row="${game.powerupLocation[0]}"][data-col="${game.powerupLocation[1]}"]`);
                food.classList.remove('snake-food')
                this.spawnPowerup()
            } else {
                game.snakeElements.pop();
            }
        },

        isNewSnakeHeadInSnake: function(newSnakeHeadIndex) {
                for (let elem of game.snakeElements) {
                    if (elem.toString() === newSnakeHeadIndex.toString()) {
                        return true
                    }
                }
                return false
            },

        snakeMove: function () {
            game.snakeMoveInterval = setInterval(function () {
                game.moveSnake()
            },
            300)
        }
    }

game.initGame()

};