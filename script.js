
const circle = '<i class="fa fa-circle-o"> </i>'
const time= '<i class="fa fa-times"> </i>'
let slot1 = document.getElementById("slot1");
let slot2 = document.getElementById("slot2");
let slot3 = document.getElementById("slot3");
let slot4 = document.getElementById("slot4");
let slot5 = document.getElementById("slot5");
let slot6 = document.getElementById("slot6");
let slot7 = document.getElementById("slot7");
let slot8 = document.getElementById("slot8");
let slot9 = document.getElementById("slot9");
let board = document.querySelector(".board");
let score1 = document.getElementById("score1");
let score2 = document.getElementById("score2");
let announce = document.querySelector(".announceWinner")
const newGame = document.querySelector(".newGame")
const resetButton = document.querySelector(".reset")
const scoreBoard= document.querySelector(".scoreBoard")
let turn = 1;
let player1Score = 0;
let player2Score = 0;

//game play based on onclick functions embedded in HTML
function moves(slot) {
    if(slot.innerHTML == circle || slot.innerHTML == time){
    }else{
        if(turn == 1) {
            slot.innerHTML = time;
            turn = 0;
        }else {
            slot.innerHTML = circle;
            turn = 1;
        }
    }
} 
/*
determines the winner based on the player's moves or determines a tie at the end when all 
slots are filled.
*/
function checkWinner() {
    if ((slot1.innerHTML ==  time && slot4.innerHTML ==  time && slot7.innerHTML == time) 
    || (slot1.innerHTML == time && slot2.innerHTML == time && slot3.innerHTML == time)
    || (slot2.innerHTML == time && slot5.innerHTML == time && slot8.innerHTML == time)
    || (slot3.innerHTML == time && slot6.innerHTML == time && slot9.innerHTML == time)
    || (slot4.innerHTML == time && slot5.innerHTML == time && slot6.innerHTML == time)
    || (slot7.innerHTML == time && slot8.innerHTML == time && slot9.innerHTML == time)
    || (slot1.innerHTML == time && slot5.innerHTML == time && slot9.innerHTML == time)
    || (slot3.innerHTML == time && slot5.innerHTML == time && slot7.innerHTML == time)){
        board.style.display = 'none';
        announce.style.display = "flex"
        player1Score++;
        score1.innerHTML = `${player1Score}`
        scoreBoard.innerHTML = 'Player 1 won'
        
        } else  if((slot1.innerHTML == circle && slot4.innerHTML == circle && slot7.innerHTML == circle) 
    || (slot1.innerHTML == circle && slot2.innerHTML == circle && slot3.innerHTML == circle)
    || (slot2.innerHTML == circle && slot5.innerHTML == circle && slot8.innerHTML == circle)
    || (slot3.innerHTML == circle && slot6.innerHTML == circle && slot9.innerHTML == circle)
    || (slot4.innerHTML == circle && slot5.innerHTML == circle && slot6.innerHTML == circle)
    || (slot7.innerHTML == circle && slot8.innerHTML == circle && slot9.innerHTML == circle)
    || (slot1.innerHTML == circle && slot5.innerHTML == circle && slot9.innerHTML == circle)
    || (slot3.innerHTML == circle && slot5.innerHTML == circle && slot7.innerHTML == circle)){
        board.style.display = "none";
        announce.style.display = "flex"
        player2Score++;
        score2.innerHTML = `${player2Score}`;
        scoreBoard.innerHTML = 'Player 2 won'
       
    }else if ((slot1.innerHTML == time || slot1.innerHTML == circle)
    && (slot2.innerHTML == time || slot2.innerHTML == circle)
    && (slot3.innerHTML == time || slot3.innerHTML == circle)
    && (slot4.innerHTML == time || slot4.innerHTML == circle)
    && (slot5.innerHTML == time || slot5.innerHTML == circle)
    && (slot6.innerHTML == time || slot6.innerHTML == circle)
    && (slot7.innerHTML == time || slot7.innerHTML == circle)
    && (slot8.innerHTML == time || slot8.innerHTML == circle)
    && (slot9.innerHTML == time || slot9.innerHTML == circle)
    ){
       board.style.display = "none";
       announce.style.display = "flex"
       scoreBoard.innerHTML = "It's a tie game"
    }
}
/*
clears the board
*/
function clear() {
    board.style.display = "grid";
    announce.style.display = "none";
    slot1.innerHTML ="";
    slot2.innerHTML ="";
    slot3.innerHTML ="";
    slot4.innerHTML ="";
    slot5.innerHTML ="";
    slot6.innerHTML ="";
    slot7.innerHTML ="";
    slot8.innerHTML ="";
    slot9.innerHTML ="";
    turn = 1;
}
/* resets the score and clears the board */

function reset() {
    clear();
    player1Score = 0;
    player2Score = 0;
    score1.innerHTML = `${player1Score}`
    score2.innerHTML = `${player2Score}`;
}
//add functions to new game button
//check onclick option in HTML (notworking)
newGame.addEventListener('click', ()=>{
    clear();
})
