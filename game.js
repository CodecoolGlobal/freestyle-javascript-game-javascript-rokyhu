window.onload = () => {

    const menu = {

        initMenu: function() {
            let gameOptions = document.querySelectorAll('.game-option')
            let startGame = document.querySelector('.start-game')
            for (let game of gameOptions) {
                game.addEventListener("click", handleGameOptions);
            }
            startGame.addEventListener("click", handleGameStart );

            function handleGameOptions() {
                 for (let game of gameOptions) {
                    game.classList.toggle('selected')
                 }
            }

            function handleGameStart() {
                let selectedGame = document.querySelector('.selected')
                if (selectedGame.classList.contains('snake')) {
                    window.location.href = '/snake.html';
                } else {
                    window.location.href = '/space_invader.html';
                }
            }
        },
    }

    menu.initMenu();

};