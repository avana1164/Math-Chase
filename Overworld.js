let c = document.querySelector(".game-canvas");
let ctx = c.getContext("2d");

ctx.imageSmoothingEnabled = false;

//there are 9 different screens, start with only one screen
/* 1 2 3
   4 5 6
   7 8 9*/

let obstacles = [new GameObject({x: 200, y: 25, type: 'house', xDim: 80, yDim: 80}), 
                 new GameObject({x: 400, y: 25, type: 'house', xDim: 80, yDim: 80})
];
let player = new Person({x: 20, y: 30, speed: 2, type: 'player', xDim: 16, yDim: 32});
const field = new Image();
field.src = "/game_sprites/grassy_field1.png";

let tickCount = 0;
const ticksPerFrame = 10;

update = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(field, 0, 0, 512, 256, 0, 0, 1024, 512);

    //will track player movement and will render all the objects to the screen 
    player.moveCharacter();
    render();

    //will change the player frame every 10 ticks
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

render = () => {
    zIndex = sort();
    for(let i = 0; i < obstacles.length; i++) {
        if (i == zIndex){
            player.draw(ctx);
        }
        obstacles[i].draw(ctx);
    }
    if(zIndex > obstacles.length - 1){
        player.draw(ctx);
    }
}

sort = () => {
    for(let i = 0; i < obstacles.length; i++){
        if (obstacles[i].y + 110 > player.y){
            return i;
        }     
    }
    return obstacles.length;
}

update();