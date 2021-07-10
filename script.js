
const x = '<i class="fa fa-times"> </i>'
const o= '<i class="fa fa-circle-o"> </i>'
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
const main = document.querySelector('.main');
const about = document.querySelector('.about');
const contact = document.querySelector('.contact')
const menu = document.querySelector('.menuItems')
const mobileMenu = document.querySelector('.mobileMenu')
const messageForm = document.getElementById('leave_message');
const user1 = document.querySelector('.userOne');
const user2 = document.querySelector('.userTwo')
const oAudio = new Audio('sounds/o-audio.mp3');
const xAudio = new Audio('sounds/x-audio.mp3');
const errorAudio = new Audio('sounds/error.mp3');
const winnerAudio = new Audio('sounds/winner.mp3')
const drawAudio = new Audio('sounds/draw.mp3')

let turn = 1;
let player1Score = 0;
let player2Score = 0;

//game play based on onclick functions embedded in HTML
function moves(slot) {
    if(slot.innerHTML == o || slot.innerHTML == x){
        errorAudio.play();
        alert("Cant Move there, Choose another spot.");
    }else{
        if(turn == 1) {
            slot.innerHTML = x;
            turn = 0;
            xAudio.play();
            user1.style.background = '#ddd'
            user2.style.background = '#ebe4ac'
            
        }else {
            slot.innerHTML = o;
            turn = 1;
            oAudio.play();
            user1.style.background = '#ebe4ac'
            user2.style.background = '#ddd'
        }
    }
} 
/*
determines the winner based on the player's moves or determines a tie at the end when all 
slots are filled.
*/
function checkWinner() {
    if ((slot1.innerHTML ==  x && slot4.innerHTML ==  x && slot7.innerHTML == x) 
    || (slot1.innerHTML == x && slot2.innerHTML == x && slot3.innerHTML == x)
    || (slot2.innerHTML == x && slot5.innerHTML == x && slot8.innerHTML == x)
    || (slot3.innerHTML == x && slot6.innerHTML == x && slot9.innerHTML == x)
    || (slot4.innerHTML == x && slot5.innerHTML == x && slot6.innerHTML == x)
    || (slot7.innerHTML == x && slot8.innerHTML == x && slot9.innerHTML == x)
    || (slot1.innerHTML == x && slot5.innerHTML == x && slot9.innerHTML == x)
    || (slot3.innerHTML == x && slot5.innerHTML == x && slot7.innerHTML == x)){
        board.style.display = 'none';
        announce.style.display = "flex"
        player1Score++;
        score1.innerHTML = `${player1Score}`
        scoreBoard.innerHTML = 'Player 1 won'
        winnerAudio.play();
        
        } else  if((slot1.innerHTML == o && slot4.innerHTML == o && slot7.innerHTML == o) 
    || (slot1.innerHTML == o && slot2.innerHTML == o && slot3.innerHTML == o)
    || (slot2.innerHTML == o && slot5.innerHTML == o && slot8.innerHTML == o)
    || (slot3.innerHTML == o && slot6.innerHTML == o && slot9.innerHTML == o)
    || (slot4.innerHTML == o && slot5.innerHTML == o && slot6.innerHTML == o)
    || (slot7.innerHTML == o && slot8.innerHTML == o && slot9.innerHTML == o)
    || (slot1.innerHTML == o && slot5.innerHTML == o && slot9.innerHTML == o)
    || (slot3.innerHTML == o && slot5.innerHTML == o && slot7.innerHTML == o)){
        board.style.display = "none";
        announce.style.display = "flex"
        player2Score++;
        score2.innerHTML = `${player2Score}`;
        scoreBoard.innerHTML = 'Player 2 won'
        winnerAudio.play();
       
    }else if ((slot1.innerHTML == x || slot1.innerHTML == o)
    && (slot2.innerHTML == x || slot2.innerHTML == o)
    && (slot3.innerHTML == x || slot3.innerHTML == o)
    && (slot4.innerHTML == x || slot4.innerHTML == o)
    && (slot5.innerHTML == x || slot5.innerHTML == o)
    && (slot6.innerHTML == x || slot6.innerHTML == o)
    && (slot7.innerHTML == x || slot7.innerHTML == o)
    && (slot8.innerHTML == x || slot8.innerHTML == o)
    && (slot9.innerHTML == x || slot9.innerHTML == o)
    ){
       board.style.display = "none";
       announce.style.display = "flex";
       scoreBoard.innerHTML = "It's a tie game";
       drawAudio.play();
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
    if (turn ===1){
        turn = 0
    };
}
/* resets the score and clears the board */

function reset() {
    clear();
    player1Score = 0;
    player2Score = 0;
    score1.innerHTML = `${player1Score}`
    score2.innerHTML = `${player2Score}`;
    turn =1;
    user1.style.background = '#ebe4ac'
    user2.style.background = '#ddd'
}
//add functions to new game button
//check onclick option in HTML (notworking)
newGame.addEventListener('click', ()=>{
    clear();
})

function toggleMenu() {
    menu.style.display == "flex" ? menu.style.display = "none" : 
    menu.style.display = "flex"; 
}

function showPage(page){
    switch(page) {
        case 'main':
            main.style.display = 'grid';
            about.style.display = 'none';
            contact.style.display = "none"
            break;
        case 'about':
            main.style.display = 'none';
            about.style.display = 'block';
            contact.style.display = "none"
            break;
        case 'contact':
            main.style.display = 'none';
            about.style.display = 'none';
            contact.style.display = "grid"
      }
}

/*------message form API-----*/
messageForm.addEventListener('submit', (event)=>{
    event.preventDefault();
    const{name, email, message } = event.target;
    const msg = {
        name: name,
        email: email,
        message: message,
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
                return data.json();
            })
            .then(msg => {
            console.log(msg);
            })
            .catch(e => {
            console.log(e);
            });
            messageForm.reset();

})
    
    

    