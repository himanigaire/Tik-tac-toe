let butns = document.querySelectorAll(".butn");
let resetbtn = document.querySelector("#reset-btn");
let newgame = document.querySelector("#new-btn");
let msgcontainer = document.querySelector(".msg-container"); 
let msg = document.querySelector("#message");
let turnO = true; //turno and turnx i.e player o and player x

const winCndtion = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

const disableBoxes = () => { //after there is one winner to avoid further clicks.
    for (let buttons of butns) {
        buttons.disabled = true;
    }
}

const enableBoxes = () => { //to enable all the boxes when clicked new game or reset button.
    for (let buttons of butns) {
        buttons.disabled = false;
        buttons.innerText = " ";
    }
}

butns.forEach((butn) => {//adding event listeners to all the buttons. and ensuring that the buttons are working turn by turn.
    butn.addEventListener("click", () => {
        if (turnO) {
            butn.innerText = "O";
            turnO = false;
            console.log("Player 1 played");
        }
        else {
            butn.innerText = "X";
            turnO = true;
            console.log("Player 2 played");
        }
        butn.disabled = true;
        checkWin();
    });
});

const showWinner = (value) =>{ //created a function just to show results by allowing the msg container to show which was hidden using dual classes.
    msg.innerText = `${value} is the winner.`;
    msgcontainer.classList.remove("hide");
    disableBoxes(); //here we are disabling the boxes after one winner is declared.
};

const checkWin = () => {
    for (pattern of winCndtion) {
        let patt1val = butns[pattern[0]].innerText;
        let patt2val = butns[pattern[1]].innerText;
        let patt3val = butns[pattern[2]].innerText;
        //this might be confusing but the process is taking one winning pattern from the array and checking the values of the buttons at those indexes for each pattern. there are 8 patterns in total and each time we are saving values of the buttons at those indexes in the variables above to check with logic below for every loop iteration.
        if (patt1val != "" && patt2val != "" && patt3val != "") {//checks if there are any blanks boxes to avoid false winning conditions.
            if (patt1val === patt2val && patt2val === patt3val) {
                showWinner(patt1val);
            };
        }
    }
};

const resetGame = () => //resetting the game to initial state.
{   turnO = true;
    enableBoxes();
    msgcontainer.classList.add("hide");
}
newgame.addEventListener("click", resetGame);//both buttons are doing the same thing of resetting all the buttons and messages back to initial state.
resetbtn.addEventListener("click", resetGame);