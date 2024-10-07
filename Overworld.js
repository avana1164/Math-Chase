let c = document.querySelector(".game-canvas");
let ctx = c.getContext("2d");

ctx.imageSmoothingEnabled = false;

//there are 9 different screens, start with only one screen
/* 1 2 3
   4 5 6
   7 8 9*/

   //
let obstacles = [new GameObject({x: 200, y: 25, type: 'house', xDim: 80, yDim: 80}), 
                 new GameObject({x: 400, y: 25, type: 'house', xDim: 80, yDim: 80}),
                 new NPC({x: 250, y: 300, speed: 2, type: 'npc', xDim: 16, yDim: 32})];

let player = new Player({x: 20, y: 30, speed: 2, type: 'player', xDim: 16, yDim: 32});


const field = new Image();
field.src = "/game_sprites/grassy_field1.png";

update = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(field, 0, 0, 512, 256, 0, 0, 1024, 512);
    //will track player movement and will render all the objects to the screen 
    render();
    player.update(obstacles);
    obstacles[2].update(obstacles);

    requestAnimationFrame(update)
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
        if (obstacles[i].y + obstacles[i].zAdj > player.y){
            return i;
        }     
    }
    return obstacles.length;
}

update();