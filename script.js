const cells = document.querySelectorAll('.game-cell')
const resultModalContainer = document.querySelector('.resultModal');
const resultModal = document.querySelector('#modal');
const resetBtn = document.querySelector('#reset');
const playerStep = 'X'
const compStep = 'O'
const TIE = 'tie'

const gameBoard = (() => {
    let gameStatus = ['','','','','','','','',''];
    let totalSteps = 0;
    const winStates = [[0,1,2], [3,4,5], [6,7,8],
                        [0,3,6], [1,4,7], [2,5,8],
                        [0,4,8], [2,4,6]];

    const getStatus = () => gameStatus;

    const resetGame = () => {
        gameStatus = ['','','','','','','','',''];
        totalSteps = 0
    }

    const addStep = (xy, step) => {
        if(!gameStatus[xy]){
            gameStatus[xy] = step;
            totalSteps++;
        }
        
        return checkStatus()
    };

    const checkStatus = () => {
        let winner = '';
        for(let i = 0; i < winStates.length; i++){
            let state = winStates[i];
            if(gameStatus[state[0]]){
                if(gameStatus[state[0]] == gameStatus[state[1]] && gameStatus[state[1]] == gameStatus[state[2]]){
                    winner = gameStatus[state[0]];
                    break;
                }
            }
        }

        if(!winner && totalSteps == gameStatus.length){
            return TIE;
        }
        return winner;
    }

    return {getStatus, addStep, resetGame}
})();


const displayGameStatus = function(status, lastPlayer){
    if(status){
        if(status == playerStep){
            resultModal.textContent = "You Win!!! 😆";
            resultModalContainer.style.display = 'block'
            console.log("You Win!!!")
        }
        else if(status == TIE){
            resultModal.textContent = "It's Draw 😐";
            resultModalContainer.style.display = 'block'
            console.log("It's Draw")
        }
        else{
            resultModal.textContent ="You Lost 🙁";
            resultModalContainer.style.display = 'block'
            console.log("You Lost :(")
        }
    }
    else{
        if(lastPlayer == playerStep){
            compMove();
        }
    }
}

const compMove = function(){
    let step = ''
    do{
        step = Math.floor(Math.random() * (9))
        console.log(step)
        console.log(gameBoard.getStatus()[step])
    }while(gameBoard.getStatus()[step])

    document.querySelector(`div[data-id="${step}"]`).textContent = compStep

    displayGameStatus(gameBoard.addStep(step, compStep), compStep);
}

const playerMove = (event) => {
    if(!event.target.innerText){
        let id = parseInt(event.target.getAttribute('data-id'));
        event.target.innerText = playerStep;
        displayGameStatus(gameBoard.addStep(id, playerStep), playerStep);
    }
}

const resetGame = () => {
    cells.forEach(cell => {
        cell.innerText = ''
    })

    gameBoard.resetGame()
}

cells.forEach(cell => {
    cell.addEventListener('click', playerMove);
    cell.addEventListener('ontouchend', playerMove);
})

resetBtn.addEventListener('click', resetGame);

window.onclick = function(event) {
    if (event.target == resultModalContainer) {
        resultModalContainer.style.display = "none";
        resetGame()
    }
  }


