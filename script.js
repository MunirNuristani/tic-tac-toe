
const x = '<i class="fa fa-times"> </i>'
const o= '<i class="fa fa-circle-o"> </i>'
const elementId = ["slot1", "slot2", "slot3", "slot4", "slot5", "slot6", "slot7", "slot8", "slot9",
                        "score1", "score2"]
elementId.forEach(el => document.getElementById(el))

const board = document.querySelector(".board");
const announce = document.querySelector(".announceWinner")
const newGame = document.querySelector(".newGame")
const scoreBoard= document.querySelector(".scoreBoard")
const main = document.querySelector('.main');
const about = document.querySelector('.about');
const contact = document.querySelector('.contact')
const menuItems = document.querySelector('.menuItems')
const mobileMenu = document.querySelector('.mobileMenu')
const messageForm = document.querySelector('#messageForm');
const userOne = document.querySelector('.userOne');
const userTwo = document.querySelector('.userTwo')
const oAudio = new Audio('sounds/o-audio.mp3');
const xAudio = new Audio('sounds/x-audio.mp3');
const errorAudio = new Audio('sounds/error.mp3');
const winnerAudio = new Audio('sounds/winner.mp3')
const drawAudio = new Audio('sounds/draw.mp3')
const cells = document.querySelectorAll(".board div")
console.log(cells)
let turn = 1;
let player1Score = 0;
let player2Score = 0;

//game play based on onclick functions embedded in HTML
function moves(slot) {
    if(slot.innerHTML == o || slot.innerHTML == x){
        errorAudio.play();
        
    }else{
        if(turn == 1) {
            slot.innerHTML = x;
            turn = 0;
            xAudio.play();
            userOne.style.background = '#ddd'
            userTwo.style.background = '#ebe4ac'
            
        }else {
            slot.innerHTML = o;
            turn = 1;
            oAudio.play();
            userOne.style.background = '#ebe4ac'
            userTwo.style.background = '#ddd'
        }
    }
} 
/*
determines the winner based on the player's moves or determines a tie at the end when all 
slots are filled.
*/

function checkWinner() {
    if (checks.winner(x)){
        displayEl(announce, "flex")
        disableElements(cells)
        player1Score++;
        score1.innerHTML = `${player1Score}`
        scoreBoard.innerHTML = 'Player 1 won'
        winnerAudio.play();
        
        } else  if(checks.winner(o)){
        displayEl(announce, "flex")
        disableElements(cells)
        player2Score++;
        score2.innerHTML = `${player2Score}`;
        scoreBoard.innerHTML = 'Player 2 won'
        winnerAudio.play();
       
    }else if (checks.tie()){
       displayEl(announce, "flex");
       disableElements(cells)
       scoreBoard.innerHTML = "It's a tie game";
       drawAudio.play();
    }
}
/*
clears the board
*/
function clear() {
    displayEl(board,"grid");
    displayEl(announce,"none");
    cleanSlate("")
    
}
/* resets the score and clears the board */

function reset() {
    clear();
    enableElemets(cells)
    player1Score = 0;
    player2Score = 0;
    score1.innerHTML = `${player1Score}`
    score2.innerHTML = `${player2Score}`;
    turn =1;
    userOne.style.background = '#ebe4ac'
    userTwo.style.background = '#ddd'
}
//add functions to new game button
//check onclick option in HTML (notworking)
newGame.addEventListener('click', ()=>{
    clear();
    enableElemets(cells)
})

function toggleMenu() {
    menuItems.style.display == "flex" ? displayEl(menuItems, "none") : 
    displayEl(menuItems, "flex"); 
}

function showPage(page){
    switch(page) {
        case 'main':
            displayEl(main, "grid");
            displayEl(about , "none");
            displayEl(contact, "none")
            break;
        case 'about':
            displayEl(main, "none")
            displayEl(about, "block");
            displayEl(contact, "none")
            break;
        case 'contact':
            displayEl(main, "none")
            displayEl(about, "none")
            displayEl(contact, "grid");
      }
}

/*------message form API-----*/
messageForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const{name, email, message } = event.target;
    const msg = {
        name: name.value,
        email: email.value,
        message: message.value,
        };
    const options = {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(msg),
    };

        fetch('https://jsonplaceholder.typicode.com/posts', options)
        .then(data => {
            if (!data.ok) {
                throw Error(data.status);
             }
        })
            .catch(e => console.log(e));
            messageForm.reset();

})
/*------support functions----*/
const checks = { 
    winner(op){
        return (slot1.innerHTML ==  op && slot4.innerHTML ==  op && slot7.innerHTML == op) 
        || (slot1.innerHTML == op && slot2.innerHTML == op && slot3.innerHTML == op)
        || (slot2.innerHTML == op && slot5.innerHTML == op && slot8.innerHTML == op)
        || (slot3.innerHTML == op && slot6.innerHTML == op && slot9.innerHTML == op)
        || (slot4.innerHTML == op && slot5.innerHTML == op && slot6.innerHTML == op)
        || (slot7.innerHTML == op && slot8.innerHTML == op && slot9.innerHTML == op)
        || (slot1.innerHTML == op && slot5.innerHTML == op && slot9.innerHTML == op)
        || (slot3.innerHTML == op && slot5.innerHTML == op && slot7.innerHTML == op)
    },
    tie(){
        return (slot1.innerHTML == x || slot1.innerHTML == o)
        && (slot2.innerHTML == x || slot2.innerHTML == o)
        && (slot3.innerHTML == x || slot3.innerHTML == o)
        && (slot4.innerHTML == x || slot4.innerHTML == o)
        && (slot5.innerHTML == x || slot5.innerHTML == o)
        && (slot6.innerHTML == x || slot6.innerHTML == o)
        && (slot7.innerHTML == x || slot7.innerHTML == o)
        && (slot8.innerHTML == x || slot8.innerHTML == o)
        && (slot9.innerHTML == x || slot9.innerHTML == o)
    }
}
function disableElements(els){
    els.forEach(el => el.removeAttribute("onclick"))
}
function enableElemets(els){
    els.forEach(el => el.setAttribute("onclick", 
    `moves(${el.id}); checkWinner()`))
}

function displayEl(el,type){
   return el.style.display = type;
}
function cleanSlate(el){
 for(let i = 1; i <= 9; i++){
    document.getElementById("slot"+[i]).innerHTML =el;
 }
}