let c = document.querySelector(".game-canvas");
let ctx = c.getContext("2d");

ctx.imageSmoothingEnabled = false;

//there are 9 different screens, start with only one screen
/* 1 2 3
   4 5 6
   7 8 9*/

   //

let obstacles = [new GameObject({x: 176, y: 41, type: 'house', xDim: 80, yDim: 80}), 
                 new GameObject({x: 400, y: 41, type: 'house', xDim: 80, yDim: 80})];

let characters = [new Player({x: 32, y: 32, speed: 2, type: 'player', xDim: 16, yDim: 32}), 
                new NPC({x: 550, y: 110, speed: 2, type: 'npc', xDim: 16, yDim: 32, obstacles: obstacles})];

const field = new Image();
field.src = "/game_sprites/grassy_field1.png";

update = () => {
    ctx.clearRect(0, 0, c.width, c.height);
    ctx.drawImage(field, 0, 0, 512, 256, 0, 0, 1024, 512);
    

    //will track player movement and will render all the objects to the screen
    
    let objects = sort(); 
    render(objects);
    drawGrid();
    for(let i = 0; i < characters.length; i++){
        characters[i].update(objects);
        if(characters[i].type == 'npc'){
            characters[i].drawPath(ctx);
        }
    }   

    requestAnimationFrame(update)
}

render = (objects) => {
    for(let i = 0; i < objects.length; i++) {
        objects[i].draw(ctx);
    }
}

drawGrid = () => {
    ctx.strokeStyle = "black";
    for(let i = 0; i < 32; i++){
        ctx.beginPath();
        ctx.moveTo(i*32, 0);
        ctx.lineTo(i*32, 512);
        ctx.stroke();
    }

    for(let i = 0; i < 16; i++){
        ctx.beginPath();
        ctx.moveTo(0, i*32);
        ctx.lineTo(1024, i*32);
        ctx.stroke();
    }
}

sort = () => {
    let objects = [];
    //insert the characters into obstacles
    let pointer1 = 0;
    let pointer2 = 0;
    
    if(characters[0].rectY + characters[0].y > characters[1].rectY + characters[1].y){
        let temp = characters[1];
        characters[1] = characters[0];
        characters[0] = temp;
    }

    for(let i = 0; i < obstacles.length + characters.length; i++){
        if(pointer1 < obstacles.length && pointer2 < characters.length){
            if (obstacles[pointer1].rectY + obstacles[pointer1].y + obstacles[pointer1].rectHeight <= characters[pointer2].rectY + characters[pointer2].y){
                objects.push(obstacles[pointer1]);
                pointer1++;
            } else if (obstacles[pointer1].rectY + obstacles[pointer1].y + obstacles[pointer1].rectHeight > characters[pointer2].rectY + characters[pointer2].y){
                objects.push(characters[pointer2]);
                pointer2++;
            } else {
                objects.push(obstacles[pointer1]);
                objects.push(characters[pointer2]);
                pointer1++;
                pointer2++;
            }
        } else if (pointer1 < obstacles.length) {
            objects.push(obstacles[pointer1]);
            pointer1++;
        } else if (pointer2 < obstacles.length){
            objects.push(characters[pointer2]);
            pointer2++;
        }
    }
    return objects;
}

update();