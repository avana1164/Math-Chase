class Person extends GameObject {
    constructor(config){
        super(config);
        this.tickCount = 0;
        this.ticksPerFrame = 10;
        this.spriteX = 0;
        this.spriteY = 0;
        this.speed = config.speed;
        this.zIndex = null;
        this.direction = 'down';
        
        this.spriteDirections = {
            'up': 2,
            'down': 0,
            'left': 3,
            'right': 1
        };
    }

    moveCharacter (isMoving, objs) {
        this.spriteY = this.spriteDirections[this.direction];
        this.animate(isMoving);

        if(isMoving){
            if (this.direction == 'up' && !this.isTopColliding(objs)) {
                this.y -= this.speed;
            } else if (this.direction == 'left' && !this.isLeftColliding(objs)){
                this.x -= this.speed;
            } else if (this.direction == 'down' && !this.isBottomColliding(objs)){
                this.y += this.speed;
            } else if (this.direction == 'right' && !this.isRightColliding(objs)){
                this.x += this.speed;
            } 
        }   
    }

    draw (ctx) {
        ctx.drawImage(this.sheet, this.spriteX*this.xDim, this.spriteY*this.yDim, this.xDim, this.yDim, this.x, this.y, this.xDim*2, this.yDim*2);
        this.drawRect(ctx);
    }

    animate (isMoving) {
        this.tickCount+=1
        if (this.tickCount > this.ticksPerFrame){
            this.tickCount = 0;
            if (isMoving) {
                this.spriteX=(this.spriteX+1)%4;
            } else {
                this.spriteX = 0;
            }
        }
    }

    isTopColliding (objs) {
        for(let i = 0; i < objs.length; i++){
            if(((this.rectY + this.y == objs[i].rectY + objs[i].y + objs[i].rectHeight) && 
            (this.rectX + this.x + this.rectWidth > objs[i].rectX + objs[i].x) &&
            (this.rectX + this.x < objs[i].rectX + objs[i].x + objs[i].rectWidth)) || this.rectY + this.y <= 0){
                return [true, objs[i].type];
            }
        }
        return false;
    }

    isLeftColliding (objs) {
        for(let i = 0; i < objs.length; i++){
            if((this.rectX + this.x == objs[i].rectX + objs[i].x + objs[i].rectWidth) && 
            (this.rectY + this.y + this.rectHeight > objs[i].rectY + objs[i].y) &&
            (this.rectY + this.y < objs[i].rectY + objs[i].y + objs[i].rectHeight) || this.rectX + this.x <= 0){
                return true;
            }
        }
        return false;
    }

    isBottomColliding (objs) {
        for(let i = 0; i < objs.length; i++){
            if((this.rectY + this.y + this.rectHeight == objs[i].rectY + objs[i].y) && 
            (this.rectX + this.x + this.rectWidth > objs[i].rectX + objs[i].x) &&
            (this.rectX + this.x < objs[i].rectX + objs[i].x + objs[i].rectWidth) || this.rectY + this.y + this.rectHeight >= 512){
                return true;
            }
        }
        return false;
    }

    isRightColliding (objs) {
        for(let i = 0; i < objs.length; i++){
            if((this.rectX + this.x + this.rectWidth == objs[i].rectX + objs[i].x) && 
            (this.rectY + this.y + this.rectHeight > objs[i].rectY + objs[i].y) &&
            (this.rectY + this.y < objs[i].rectY + objs[i].y + objs[i].rectHeight) || this.rectX + this.x + this.rectWidth >= 1024){
                return true;
            }
        }
        return false;
    }

    npcCollidingPlayer(npc, player){
        if(npc.x + npc.rectX <= player.x + player.rectX + player.rectWidth &&
            npc.x + npc.rectX + npc.rectWidth >= player.x + player.rectX &&
            npc.y + npc.rectY + npc.rectHeight >= player.y + player.rectY &&
            npc.y + npc.rectY <= player.y + player.rectY + player.rectHeight
        ) {
            return true;
        }

        return false;
    }
}