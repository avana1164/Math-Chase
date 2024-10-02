let c = document.querySelector(".game-canvas");
let ctx = c.getContext("2d");

ctx.imageSmoothingEnabled = false;

//there are 9 different screens, start with only one screen
/* 1 2 3
   4 5 6
   7 8 9*/

let spriteDirection = {'KeyW': 2, 'KeyA': 3, 'KeyS': 0, 'KeyD': 1};
let obstacleKey = {'house': "/game_sprites/House.png"};
let obstacles = [['house', 200, 25], ['house', 400, 25]];
const playerImage = new Image();
const field = new Image();
playerImage.src = "/game_sprites/walk.png";
field.src = "/game_sprites/grassy_field1.png";

let x = 20;
let y = 30;
let vx = 0;
let vy = 0;
let speed = 5;
let keyPressed = 'KeyS';
let keys = ['KeyS', 'KeyA', 'KeyW', 'KeyD'];
let isMoving = false;
window.addEventListener("keydown", (e) => {
    if(e.code == 'KeyW' || e.code == 'KeyS' || e.code == 'KeyA' || e.code == 'KeyD'){
        if (e.code == 'KeyW'){
            vy = -speed;
        }  
        else if (e.code == 'KeyS'){
            vy = speed;
        } 
        else if (e.code == 'KeyD'){
            vx = speed;
        }
        else if (e.code == 'KeyA'){
            vx = -speed;
        }
        keyPressed = e.code;
    }
        
});



window.addEventListener("keyup", (e) => {
    if (e.code == 'KeyW') vy = 0; 
    else if (e.code == 'KeyS') vy = 0;
    else if (e.code == 'KeyD') vx = 0;
    else if (e.code == 'KeyA') vx = 0;
});

let spriteX = 0;

let tickCount = 0;
const ticksPerFrame = 10;
update = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    x += vx/2;
    y += vy/2;
    let spriteY = spriteDirection[keyPressed];
    ctx.drawImage(field, 0, 0, 512, 256, 0, 0, 1024, 512);
    zIndex = sort();
    for(let i = 0; i < obstacles.length; i++) {
        let obstacle = new Image();
        obstacle.src = obstacleKey[obstacles[i][0]];
        if (i == zIndex){
            ctx.drawImage(playerImage, spriteX*16, spriteY*32, 16, 32, x, y, 32, 64);
        }
        ctx.drawImage(obstacle, 0, 0, 80, 80, obstacles[i][1], obstacles[i][2], 160, 160);
    }
    if(zIndex > obstacles.length - 1){
        ctx.drawImage(playerImage, spriteX*16, spriteY*32, 16, 32, x, y, 32, 64);
    }
    
    tickCount++;
    if (tickCount > ticksPerFrame){
        tickCount = 0;
        if (vy != 0 || vx != 0) {
            spriteX=(spriteX+1)%4;
        } else {
            spriteX = 0;
        }
    }
    requestAnimationFrame(update)
}


sort = () => {
    for(let i = 0; i < obstacles.length; i++){
        if (obstacles[i][2] + 110 > y){
            return i;
        }     
    }
    return obstacles.length;
}



update();


