var character = document.getElementById("character");
var game = document.getElementById("game");
var interval;
var both = 0;
var counter = 0;
var currentBlocks = [];
var speed = 1
var music = new Audio("gameAudio.wav");



function moveLeft(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left>0){
        character.style.left = left - 2 + "px";
    }
}
function moveRight(){
    var left = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
    if(left<380){
        character.style.left = left + 2 + "px";
    }
}

function gameLoop(){
    document.querySelector("#startGame").style.display = "none";
    document.querySelector("#game").style.display = "block";

    document.addEventListener("keydown", event => {
        if(both==0){
            both++;
            if(event.key==="ArrowLeft"){
                character.style.backgroundImage= "url(runnerLeft.gif)"
                interval = setInterval(moveLeft, 1);
            }
            if(event.key==="ArrowRight"){
                character.style.backgroundImage= "url(runnerRight.gif)"
                interval = setInterval(moveRight, 1);
            }
        }
    });
    document.addEventListener("keyup", event => {
        character.style.backgroundImage= "url(standingg.png)"
        clearInterval(interval);
        both=0;
    });
    
    var blocks = setInterval(function(){
        var blockLast = document.getElementById("block"+(counter-1));
        var holeLast = document.getElementById("hole"+(counter-1));
        if(counter>0){
            var blockLastTop = parseInt(window.getComputedStyle(blockLast).getPropertyValue("top"));
            var holeLastTop = parseInt(window.getComputedStyle(holeLast).getPropertyValue("top"));
        }
        if(blockLastTop<400||counter==0){
            var block = document.createElement("div");
            var hole = document.createElement("div");
            block.setAttribute("class", "block");
            hole.setAttribute("class", "hole");
            block.setAttribute("id", "block"+counter);
            hole.setAttribute("id", "hole"+counter);
            block.style.top = blockLastTop + 100 + "px";
            hole.style.top = holeLastTop + 100 + "px";
            var random = Math.floor(Math.random() * 360);
            hole.style.left = random + "px";
            game.appendChild(block);
            game.appendChild(hole);
            currentBlocks.push(counter);
            counter++;
        }
    
        var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        var characterLeft = parseInt(window.getComputedStyle(character).getPropertyValue("left"));
        var drop = 0;
    
        if(characterTop <= 0){
            music.pause();
            alert("Game over. Score: "+(counter-9));
            clearInterval(blocks);
            location.reload();
        }
        
        for(var i = 0; i < currentBlocks.length;i++){
            let current = currentBlocks[i];
            let iblock = document.getElementById("block"+current);
            let ihole = document.getElementById("hole"+current);
            let iblockTop = parseFloat(window.getComputedStyle(iblock).getPropertyValue("top"));
            let iholeLeft = parseFloat(window.getComputedStyle(ihole).getPropertyValue("left"));
            iblock.style.top = iblockTop - speed + "px";
            ihole.style.top = iblockTop - speed + "px";
            if(iblockTop < -20){
                currentBlocks.shift();
                iblock.remove();
                ihole.remove();
            }
            if (counter >= 0) {
                speed = 0.2;
                music.play();
                music.loop = true;
                music.playbackRate = 0.8;
            }
            if (counter >= 18) {
                speed = 0.4;
                music.play();
                music.loop = true;
                music.playbackRate = 1;
            };
            if (counter >= 28) {
                speed = 0.6;
                music.play();
                music.loop = true;
                music.playbackRate = 1.2;
            };
            if (counter >= 38) {
                speed = 0.8;
                music.play();
                music.loop = true;
                music.playbackRate = 1.4;
            };
            if (counter >= 48) {
                speed = 1;
                music.play();
                music.loop = true;
                music.playbackRate = 1;
            };
            if(iblockTop-20<characterTop && iblockTop>characterTop){
                drop++;
                if(iholeLeft<=characterLeft && iholeLeft+20>=characterLeft){
                    drop = 0;
                }
            }
        }
        if(drop==0){
            if(characterTop < 480){
                character.style.top = characterTop + 2 + "px";
            }
        }else{
            character.style.top = characterTop - 0.5 + "px";
        }
    },1);
}
