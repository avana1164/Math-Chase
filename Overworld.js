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
let speed = 2;
let keysPressed = {
    KeyS: false,
    KeyA: false,
    KeyD: false,
    KeyW: false 
};
let lastKey = 'KeyS';
let keys = ['KeyS', 'KeyA', 'KeyW', 'KeyD'];
let isMoving = false;
window.addEventListener("keydown", (e) => {
    if (keys.indexOf(e.code) != -1){
        switch(e.code) {
            case 'KeyS':
                keysPressed.KeyS = true;
                lastKey = 'KeyS';
                break;
            case 'KeyA':
                keysPressed.KeyA = true;
                lastKey = 'KeyA';
                break;
            case 'KeyW':
                keysPressed.KeyW = true;
                lastKey = 'KeyW';
                break;
            case 'KeyD':
                keysPressed.KeyD = true;
                lastKey = 'KeyD'
                break;
        }
    }
});



window.addEventListener("keyup", (e) => {
    switch(e.code) {
        case 'KeyS':
            keysPressed.KeyS = false;
            break;
        case 'KeyA':
            keysPressed.KeyA = false;           
            break;
        case 'KeyW':
            keysPressed.KeyW = false;        
            break;
        case 'KeyD':
            keysPressed.KeyD = false;     
            break;
    }
});

let spriteX = 0;

let tickCount = 0;
const ticksPerFrame = 10;
update = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    moveCharacter();
    let spriteY = spriteDirection[lastKey];
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
        if (isMoving) {
            spriteX=(spriteX+1)%4;
        } else {
            spriteX = 0;
        }
    }
    requestAnimationFrame(update)
}

moveCharacter = () => {
    isMoving = false;
    if (keysPressed.KeyW && lastKey == 'KeyW') {
        y -= speed;
        isMoving = true;
    } else if (keysPressed.KeyA && lastKey == 'KeyA'){
        x -= speed;
        isMoving = true;
    } else if (keysPressed.KeyS && lastKey == 'KeyS'){
        y += speed;
        isMoving = true;
    } else if (keysPressed.KeyD && lastKey == 'KeyD'){
        x += speed;
        isMoving = true;
    } 
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


