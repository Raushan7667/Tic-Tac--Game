const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");

let currentPlayer;
let GameGrid;

const winningPosition = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]

];

// lets create a function initilize game
function initGame() {
    currentPlayer = "X"
    GameGrid = ["", "", "", "", "", "", "", "", ""];
    // UI pe empty karna hai
    boxes.forEach((box, index) => {
        box.innerText = ""
        boxes[index].style.pointerEvents = "all"
        // green color ko remove karna hai
        box.classList = `box box${index + 1}`
    })
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`
}
initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O"
    }
    else {
        currentPlayer = "X"
    }
    // UI Uptodate
    gameInfo.innerText = `Currrent Player - ${currentPlayer}`
}


function cheakGameOver() {
    let answer = ""
    winningPosition.forEach((position) => {
        // all 3 boxes should be non empty and exatly same
        if ((GameGrid[position[0]] !== "" || GameGrid[position[1]] !== "" || GameGrid[position[2]] !== "")
            && (GameGrid[position[0]] === GameGrid[position[1]]) && (GameGrid[position[1]] === GameGrid[position[2]])) {
            if (GameGrid[position[0]] === "X")
                answer = "X"

            else
                answer = "O"

            // disable pointer event
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })
            // now we know X/Y winner
            boxes[position[0]].classList.add("win")
            boxes[position[1]].classList.add("win")
            boxes[position[2]].classList.add("win")

        }
    })

    if (answer !== "") {
        gameInfo.innerText = `Winner Player-${answer}`
        newGameBtn.classList.add("active")
        return;
    }
    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    GameGrid.forEach((box) => {
        if(box !== "" )
            fillCount++;
    });

    //board is Filled, game is TIE
    if(fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
    }
}


function handelClick(index) {
    if (GameGrid[index] === "") {
        boxes[index].innerText = currentPlayer
        GameGrid[index] = currentPlayer
        boxes[index].style.poonterEvents = "none"
        // swap karo turn karo
        swapTurn()
        // cheak any one who win
        cheakGameOver()
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handelClick(index);
    })
})

newGameBtn.addEventListener("click", initGame)