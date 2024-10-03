let c = document.querySelector(".game-canvas");
let ctx = c.getContext("2d");

ctx.imageSmoothingEnabled = false;

//there are 9 different screens, start with only one screen
/* 1 2 3
   4 5 6
   7 8 9*/

let obstacleKey = {'house': "/game_sprites/House.png"};
let obstacles = [['house', 200, 25], ['house', 400, 25]];
let player = new Person({x: 20, y: 30, speed: 2, src: "/game_sprites/walk.png", xDim: 16, yDim: 32});
const field = new Image();
field.src = "/game_sprites/grassy_field1.png";

let tickCount = 0;
const ticksPerFrame = 10;

update = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(field, 0, 0, 512, 256, 0, 0, 1024, 512);

    player.moveCharacter();
    
    zIndex = sort();
    for(let i = 0; i < obstacles.length; i++) {
        let obstacle = new Image();
        obstacle.src = obstacleKey[obstacles[i][0]];
        if (i == zIndex){
            player.draw(ctx);
        }
        ctx.drawImage(obstacle, 0, 0, 80, 80, obstacles[i][1], obstacles[i][2], 160, 160);
    }
    if(zIndex > obstacles.length - 1){
        player.draw(ctx);
    }
    tickCount++;
    animate();
    requestAnimationFrame(update)
}

animate = () => {
    if (tickCount > ticksPerFrame){
        tickCount = 0;
        if (player.isMoving) {
            player.spriteX=(player.spriteX+1)%4;
        } else {
            player.spriteX = 0;
        }
    }
}

sort = () => {
    for(let i = 0; i < obstacles.length; i++){
        if (obstacles[i][2] + 110 > player.y){
            return i;
        }     
    }
    return obstacles.length;
}

update();