let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelectorAll("#reset-btn");

let tern0 = true; //playerx, player0

const winPatterns = {
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],

};

const resetGame = () => {
    turn0 = true;
    count = 0;
    enableBoxes();
    msgContainer.classList.add("hode");

};

boxes.forEach((box) => {
    box.addEventListener("click", ()=> {
        if (turn0){
            //player0
            box.innerText = "0";
            turn0 = false;

        } else {
            //playerX
            box.innerText = "X";
            turn0 = true;

        }
        box.disable = true;
        cout++;

        let isWinner = checkWinner();
        if (count ===9 && ! isWinner){
            gameDraw();

        }
    });
});

const gameDraw = () => {
    msg.innerText = 'Game was a Draw. ';
    msgContainer.classList.remove("hide");
    disableBoxes();

};

const disableBoxes = () => {
    for (let box of boxes) {
        box.disabled = true;

    }
};

const enableBoxes = () => {
    for (let box of boxes) {
        box.disabled = false;
        box.innerText = "";

    }
};
const showWinner = (winner) => {
    msg.innerText = 'Congratulation,Winner is ${winner}';
    msgContainer.classList.remove("hide");
    disableBoxes();
};

const checkWinner = () => {
    for (let pattern of winPatterns){
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if(pos1Val !="" && pos2Val != && pos3Val != ""){
            if(pos1Val === pos2Val && pos2Val === pos3Val){
                showWinner(pos1Val);
                return true;
            }
        }
    }
};
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
