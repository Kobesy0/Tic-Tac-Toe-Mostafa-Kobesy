let scorePlayer1 = document.querySelector(".score-box .p-1")
let scorePlayer2 = document.querySelector(".score-box .p-2")
const board = document.querySelector(".board");
let playerChoice, currentPlayer;
document.querySelectorAll(".select-x, .select-o").forEach(button => {
    button.addEventListener("click", () => startGame(button.classList.contains("select-x") ? "X" : "O"));
});

function startGame(choice) {
    playerChoice = currentPlayer = choice;
    document.querySelector(".player-selection").style.display = "none";
    document.querySelector(".score-box").style.display = "inline-block"; 
    document.querySelector(".players-box p").style.display = "none"; 
    document.querySelector(".vs").style.display = "none"
    document.querySelector(".board-box").style.display = "block";
    document.querySelector(".turn").style.display = "block";
    document.querySelector(".turn span").innerHTML = playerChoice
    lockInput()
    initBoard();
}

function lockInput(){
    let inputField = document.querySelectorAll(".player-1, .player-2");
    inputField.forEach(input =>{
        if(input.value !== ""){
            input.setAttribute("readonly", true);
        }
    })
}


function initBoard() {
    cells = Array.from({length : 9});
    cells.forEach((cell, index) => {
        cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleClick);
        board.appendChild(cell);
    });
}

function handleClick(e) {
    const cellIndex = e.target.dataset.index;
    if (cells[cellIndex]) return;
    updateCells(cellIndex);
    const winner = checkWinCondition();
    if(winner || !cells.includes(undefined)){
        winner ? win(winner) : draw()
        resetGame();
        if(winner === "X"){
            scorePlayer1.innerHTML++;
        } else if(winner === "O"){
            scorePlayer2.innerHTML++;
        }
    }
}


function updateCells(cellIndex) {
    cells[cellIndex] = currentPlayer;
    const cell = board.querySelector(`[data-index="${cellIndex}"]`);
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer === "X" ? "player-x" : "player-o");
    currentPlayer = currentPlayer === playerChoice ? (playerChoice === "X" ? "O" : "X") : playerChoice;
    document.querySelector(".turn span").innerHTML  = currentPlayer
}

function checkWinCondition() {
    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    for(let combo of winningConditions){
        const [a, b, c] = combo;
        if(cells[a] && cells[a] === cells[b] && cells[a] === cells[c]){
            return cells[a];
        }
    }
    return null;
}


function win(index){
    let layover = document.createElement('div');
    layover.classList.add("layover");
    document.body.appendChild(layover);
    
    let winner = document.createElement('div');
    winner.className = 'winner';
    winner.innerHTML = `<p><span>${index}</span><br> Winner!</p>`;
    document.body.appendChild(winner);
    
    setTimeout(() => {
        winner.remove();
        layover.remove();
    }, 1000);
}


function draw(){
    let layover = document.createElement('div');
    layover.classList.add("layover");
    document.body.appendChild(layover);
    let draw = document.createElement('div');
    draw.classList.add('draw');
    draw.innerHTML = `<p><span>X O</span> <br> Draw!</p>`
    document.body.appendChild(draw);

    setTimeout(() => {
        draw.remove();
        layover.remove();
    }, 2000);
}


function resetGame() {
    cells = Array.from({length: 9})    
    
    board.querySelectorAll(".cell").forEach((cell) => {
        
        cell.textContent = ""
        
        cell.classList.remove("player-x", "player-o")
        
    })
    
}

document.addEventListener("keydown", (e) =>{
    if(e.key === "Escape"){
        resetGame()
    }
})


// Social media 

document.querySelector(".whatsapp").addEventListener("click", ()=>{
    message = 'Hello Mostafa!'
    link = `https://wa.me/01152274612?text=${message}`
    window.open( link , "_blank")
})
document.querySelector(".instagram").addEventListener("click", ()=>{
    link = `https://www.instagram.com/mustafakobesy/`
    window.open( link , "_blank")
})
document.querySelector(".github").addEventListener("click", ()=>{
    link = `https://github.com/Kobesy0`
    window.open( link , "_blank")
})
document.querySelector(".linkedin").addEventListener("click", ()=>{
    link = `https://www.linkedin.com/in/mostafa-kobesy-984b8831a/`
    window.open( link , "_blank")
})