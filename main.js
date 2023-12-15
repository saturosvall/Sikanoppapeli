document.getElementById('addplayer').addEventListener('submit', addPlayer);
document.getElementById('start').addEventListener('submit', startGame);

const players = []              // pelaajaluettelo
const scores = [];              // pisteluettelo
let targetScore = 0;            
let streak = 0;
let turn = 1;
let gameVictory = false;

// pelaajan lisääminen
function addPlayer(event) {
    event.preventDefault()
    let yesnt = 1;
    players.push(document.getElementById("add").value);
    scores.push(0);
    let text = "<ul>";
    let text2 = "<ul>";
    players.forEach(spare);
    text += "</ul>";
    text2 += "</ul>";
    document.getElementById("board").innerHTML = text;
    document.getElementById("ff").innerHTML = text2;

    function spare(value) {
        text += "<li id=" + yesnt + ">" + value + "</li>";
        text2 += "<li>" + value + "</li>";
        yesnt += 1;
    }
}

// pelin aloitus jos ehdot täyttyvät (pisteraja ja pelaajien määrä)
function startGame(event) {
    event.preventDefault()
    if (document.getElementById("score").value < 100) {
        document.getElementById("controlAlert").innerHTML = "Liian alhainen pisteraja";
    } else {
        if (players.length >= 2) {
            let a = document.getElementById("control");
            let board  = document.getElementById("peli");
            a.style.display = "none";
            board.style.display = "block";
        
            targetScore = document.getElementById("score").value;
            document.getElementById("vuoro").innerHTML = "Peli voi alkaa!" + "<br>" + players[turn - 1] + " aloittaa"
        } else {
            document.getElementById("controlAlert").innerHTML = "Pelaajia pitää olla vähintään 2";
        }
    }
}

// vuoron lopetus
function endTurn(i) {
    if (i != 2) {
        scores[turn - 1] = scores[turn - 1] + streak;
        if (scores[turn - 1] >= targetScore && gameVictory == false) {
            document.getElementById("gameAlert").innerHTML = players[turn - 1] + " Voitti pelin!";
            gameVictory = true;
        }
    }
    document.getElementById(turn).innerHTML = players[turn - 1] + ": " + scores[turn - 1];
    if (turn < players.length) {
        turn += 1;
    } else {
        turn = 1;
    }
    streak = 0;
    document.getElementById("vuoro").innerHTML =  players[turn - 1] + " heittää noppaa"
}

// nopan heitto
function roll() {
    let d = Math.floor(Math.random()* 6) + 1;
    if (d === 1) {
        document.getElementById("dice").src="img/d1.gif"
        endTurn(2);
    } else if (d === 2) {
        document.getElementById("dice").src="img/d2.gif"
        streak += 2;
    } else if (d === 3) {
        document.getElementById("dice").src="img/d3.gif"
        streak += 3;
    } else if (d === 4) {
        document.getElementById("dice").src="img/d4.gif"
        streak += 4;
    }else  if (d === 5) {
        document.getElementById("dice").src="img/d5.gif"
        streak += 5;
    } else {
        document.getElementById("dice").src="img/d6.gif"
        streak += 6;
    }
    document.getElementById(turn).innerHTML = players[turn - 1] + ": " + scores[turn - 1] + " (+" + streak + ")"
}
