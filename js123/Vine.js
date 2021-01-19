console.error('all rights reserved by the game developer Cisamu')
var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

var bird = new Image();
var bg = new Image();
var fg = new Image();
var pipeUp = new Image();
var pipeBottom = new Image();

let gameIsStarted = false;
let paused = true;


const menu = {
    width: 5,
    height: 20
};

bird.src = "img/Sally_Bird_icon.png";
bg.src = "img/Super_fon.jpg";
fg.src = "img/HAH.png";
pipeUp.src = "img/flappy_bird_pipeUp.png";
pipeBottom.src = "img/flappy_bird_pipeBottom.png";


var fly = new Audio();
var score_audio = new Audio();

fly.src = "audio/Deadlocked.mp3";
score_audio.src = "audio/crystal01.ogg";

var gap = 90;

// menu drawing

function showMenu() {
    ctx.fillStyle = "red";
    ctx.fillRect(cvs.width - menu.height, cvs.height - menu.height * 2, menu.width, menu.height);
    ctx.fillRect(cvs.width - (menu.height + menu.width * 3), cvs.height - menu.height * 2, menu.width, menu.height);
}

function showStartMenu() {
    ctx.fillStyle = "blue";
    ctx.fillRect(0, 0, cvs.width, cvs.height);
    ctx.fillStyle = "red";
    ctx.arc(cvs.width / 2, cvs.height / 2, 100, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = "#fff";
    ctx.textAlign = "center";
    ctx.font = "50px Verdana";
    ctx.textBaseline ="middle";
    ctx.fillText("PLAY", cvs.width / 2, cvs.height / 2);
    ctx.textAlign = "left";
}

showStartMenu();

cvs.addEventListener("click", (e) => {
    yPos -= 25;
    fly.play();

    ctx.clearRect(0, 0, cvs.width, cvs.height);
    if(!gameIsStarted) {
        gameIsStarted = true;
        paused = false;
        console.log(paused);

        draw();
    }
    if(e.clientX >= cvs.width - menu.height - menu.width*2 && e.clientX <= cvs.width - menu.width) {
        console.log(paused);
        paused = !paused;
        console.log(paused);
    }
});

function moveUp() {
    yPos -= 25;
    fly.play();
}


var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
}

var score = 0;
var xPos = 10;
var yPos = 150;
var grav = 1.5;

function draw() {
    ctx.drawImage(bg, 0, 0);
    let myReq = requestAnimationFrame(draw);

    ctx.drawImage(fg, 0, cvs.height - fg.height);
    ctx.drawImage(bird, xPos, yPos);

    yPos += grav;

    ctx.fillStyle = "#000";
    ctx.font = "24px Verdana";
    ctx.fillText("Счет: " + score, 10, cvs.height - 50);

    for(var i = 0; i < pipe.length; i++) {

        if(xPos + bird.width >= pipe[i].x && xPos <= pipe[i].x + pipeUp.width && (yPos <= pipe[i].y + pipeUp.height || yPos + bird.height >= pipe[i].y + pipeUp.height + gap) || yPos + bird.height >= cvs.height - fg.height) {
            location.reload();
        }

        ctx.drawImage(pipeUp, pipe[i].x, pipe[i].y);
        ctx.drawImage(pipeBottom, pipe[i].x, pipe[i].y + pipeUp.height + gap);
        showMenu();

        pipe[i].x--;

        if(pipe[i].x == 125) {
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random() * pipeUp.height) - pipeUp.height
            });
        }

        if(pipe[i].x == 5) {
            score++;
            score_audio.play();
        }

        if(paused === true) {
            cancelAnimationFrame(myReq);
        }

    }


// ctx.drawImage(fg, 0, cvs.height - fg.height);
// ctx.drawImage(bird, xPos, yPos);

// yPos += grav;

// ctx.fillStyle = "#000";
// ctx.font = "24px Verdana";
// ctx.fillText("Счет: " + score, 10, cvs.height - 50);


// ctx.fillStyle = "red";
// ctx.fillRect(cvs.width - menuHeight, cvs.height - menuHeight * 2, menuWidth, menuHeight);
// ctx.fillRect(cvs.width - (menuHeight + menuWidth * 3), cvs.height - menuHeight * 2, menuWidth, menuHeight);

}

// window.onload = draw;