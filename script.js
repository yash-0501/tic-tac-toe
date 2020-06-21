const cellElements = document.querySelectorAll('[data-cell]')

const board = document.getElementById('board')
const winningMsgElement = document.getElementById('winningMessage')
const xCLASS = 'x'
const circleClass = 'circle'
const restartButton = document.getElementById('restartButton')
const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
let circleTurn




let winningMsgTextElement = document.querySelector(
'[data-winning-message-text]')
startGame()
restartButton.addEventListener('click',startGame)


function startGame() {
    circleTurn = false
    cellElements.forEach(cell=>{
        cell.classList.remove(xCLASS)
        cell.classList.remove(circleClass)
        cell.removeEventListener('click', handleClick)
        cell.addEventListener('click', 
        handleClick, 
        {once: true})
    })
    setBoardHoverClass()
    winningMsgElement.classList.remove('show')
}

function handleClick(e){
    const cell = e.target
    const currentClass = circleTurn ? circleClass : xCLASS
    placeMark(cell,currentClass);
    console.log(checkWin(currentClass)+"\n");
    if(checkWin(currentClass)){

        endGame(false)
    } else if(isDraw()){
        endGame(true)
    } else{
        swapTurns();
    setBoardHoverClass();
    }
}

function endGame(draw){
    if(draw){
        winningMsgTextElement.innerText = "Draw!"
    } else {

        winningMsgTextElement.innerText = `${circleTurn ? "O's win" : "X's win"}`
    }

    winningMsgElement.classList.add("show");
}

function isDraw(){
    return [...cellElements].every(cell => {
        return cell.classList.contains(xCLASS) ||
            cell.classList.contains(circleClass)
    })
}

function placeMark(cell,currentClass){
    cell.classList.add(currentClass);
}

function swapTurns(){
    circleTurn = !circleTurn;
}

function setBoardHoverClass(){
    board.classList.remove(xCLASS);
    board.classList.remove(circleClass);
    if(circleTurn){
        board.classList.add(circleClass);
    } else{
        board.classList.add(xCLASS)
    }
}

function checkWin(currentClass){
    return winCombos.some(combination =>{
        return combination.every(index =>{
            return cellElements[index].classList.contains
            (currentClass)
        })
    })
}