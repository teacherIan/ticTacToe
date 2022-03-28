const X = document.getElementById('X')
const O = document.getElementById('O')
const squares = document.querySelectorAll('.square')
const texts = document.querySelectorAll('.textX')

let XTurn = true;
let counter = 0;
X.draggable = true;
O.draggable = true;


checkForWinner = () => {

    //check rows
    if(squares[0].textContent == 'X' && squares[3].textContent == 'X' && squares[6].textContent == 'X' || squares[0].textContent == 'O' && squares[3].textContent == 'O' && squares[6].textContent == 'O'){
        gameOver()
    }
    if(squares[1].textContent == 'X' && squares[4].textContent == 'X' && squares[7].textContent == 'X' || squares[1].textContent == 'O' && squares[4].textContent == 'O' && squares[7].textContent == 'O'){
        gameOver()
    }
    if(squares[2].textContent == 'X' && squares[5].textContent == 'X' && squares[8].textContent == 'X' || squares[2].textContent == 'O' && squares[5].textContent == 'O' && squares[8].textContent == 'O'){
        gameOver()
    }

    //check columns
    if(squares[0].textContent == 'X' && squares[1].textContent == 'X' && squares[2].textContent == 'X' || squares[0].textContent == 'O' && squares[1].textContent == 'O' && squares[2].textContent == 'O'){
        gameOver()
    }
    if(squares[3].textContent == 'X' && squares[4].textContent == 'X' && squares[5].textContent == 'X' || squares[3].textContent == 'O' && squares[4].textContent == 'O' && squares[5].textContent == 'O'){
        gameOver()
    }
    if(squares[6].textContent == 'X' && squares[7].textContent == 'X' && squares[8].textContent == 'X' || squares[6].textContent == 'O' && squares[7].textContent == 'O' && squares[8].textContent == 'O'){
        gameOver()
    }
    //check diagonal 
    if(squares[0].textContent == 'X' && squares[4].textContent == 'X' && squares[8].textContent == 'X' || squares[0].textContent == 'O' && squares[4].textContent == 'O' && squares[8].textContent == 'O'){
        gameOver()
    }

    if(squares[2].textContent == 'X' && squares[4].textContent == 'X' && squares[6].textContent == 'X' || squares[2].textContent == 'O' && squares[4].textContent == 'O' && squares[6].textContent == 'O'){
        gameOver()
    }


}

gameOver = () => {
    
    texts.forEach(gameText => {

        gameText.classList.add('animate__rotateOutUpLeft')
        console.log("Class list: ")

        gameText.addEventListener('animationend', () => {
            gameText.classList.remove('animate__rotateOutUpLeft')
            gameText.innerHTML = ''
        })
    })
    counter = 0

}
//Start animation -- Rollin from the left 
X.addEventListener('animationend', () => {
    X.classList.remove('animate__rollIn')
})

O.addEventListener('animationend', () => {
    O.classList.remove('animate__rollIn')
})

//Remind player to move.  Current player will 'shakeY. opponent play will 'shakeX'
removeAnimationX = () => {
    //console.log("Remove Animation Running")
    
    if(XTurn) {
        X.classList.remove('animate__shakeY')
    } else {
        O.classList.remove('animate__shakeY')
    }
    
}

addAnimationX = () => {

        if(XTurn) {
            X.classList.add('animate__shakeY')
            X.addEventListener('animationend',removeAnimationX)
        } else {
            O.classList.add('animate__shakeY')
            O.addEventListener('animationend',removeAnimationX)
        }
}

setInterval(addAnimationX,3000)

//Remind people to move O

dragOver = (event) => {
    event.preventDefault()
}

X.addEventListener('dragstart', (event)=> {
    if(!XTurn) {
        event.preventDefault()
    }
    
})

O.addEventListener('dragstart', (event)=> {
    if(XTurn) {
        event.preventDefault()
    }
})

dragDrop = (event) => {
    if(XTurn) {
        event.target.innerHTML = 'X'
    } else {
        event.target.innerHTML = 'O'
    }
    XTurn = !XTurn
    //Counter to check if game board has been completely filled and needs to be restarted
    counter++
    console.log("Check for winner")
    checkForWinner()

    if(counter == 9) {
        gameOver();
    }
}

squares.forEach(square => {
    square.addEventListener('dragover',dragOver)
    square.addEventListener('drop', dragDrop)
})
