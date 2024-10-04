let c = document.querySelector(".game-canvas");
let ctx = c.getContext("2d");

ctx.imageSmoothingEnabled = false;

//there are 9 different screens, start with only one screen
/* 1 2 3
   4 5 6
   7 8 9*/

let obstacles = [new GameObject({x: 200, y: 25, type: 'house', xDim: 80, yDim: 80}), 
                 new GameObject({x: 400, y: 25, type: 'house', xDim: 80, yDim: 80}),
                 
];

let npc = new NPC({x: 250, y: 300, speed: 2, type: 'npc', xDim: 16, yDim: 32});

let player = new Person({x: 20, y: 30, speed: 2, type: 'player', xDim: 16, yDim: 32});


const field = new Image();
field.src = "/game_sprites/grassy_field1.png";

let playerCollision = false;
let npcCollision = false;
let tickCount = 0;
const ticksPerFrame = 10;
let collidedObj;
update = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(field, 0, 0, 512, 256, 0, 0, 1024, 512);
    
    //will track player movement and will render all the objects to the screen 
    
    playerCollision = false;
    for(let i = 0; i < obstacles.length; i++){
        
        if(isColliding(player, obstacles[i])){
            playerCollision = true;
            collidedObj = obstacles[i];
            break;
        }
        // if(isColliding(npc, obstacles[i])){
        //     npcCollision = true;
        // }
    }

    // if(isColliding(player, npc)){
    //     playerCollision = true;
    //     npcCollision = true;
    // }
    player.movePlayer(playerCollision, collidedObj);
    npc.moveNPC(npcCollision);
    render();
    //ctx.drawImage(npc, 0, 0, 16, 32, 250, 300, 32, 64);

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
    npc.draw(ctx);
}

sort = () => {
    for(let i = 0; i < obstacles.length; i++){
        if (obstacles[i].y + obstacles[i].zAdj > player.y){
            return i;
        }     
    }
    return obstacles.length;
}

isColliding = (obj1, obj2) => {
    let objRectX1 = obj1.rectX + obj1.x;
    let objRectY1 = obj1.rectY + obj1.y;
    let objRectX2 = obj2.rectX + obj2.x;
    let objRectY2 = obj2.rectY + obj2.y;
    if(!(objRectX1 + obj1.rectWidth < objRectX2 ||
        objRectX1 > objRectX2 + obj2.rectWidth ||
        objRectY1 + obj1.rectHeight < objRectY2 ||
        objRectY1 > objRectY2 + obj2.rectHeight 
    )){
        return true; 
    }
    return false;
}



update();