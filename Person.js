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
        this.collisions = {top: false, bottom: false, left: false, right: false};
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

        this.collisions.top = this.isTopColliding(objs);
        this.collisions.bottom = this.isBottomColliding(objs);
        this.collisions.left = this.isLeftColliding(objs);
        this.collisions.right = this.isRightColliding(objs);

        if(this.type == 'npc'){
            console.log(isMoving);
        }
        if(isMoving){
            if (this.direction == 'up' && !this.collisions.top) {
                this.y -= this.speed;
            } else if (this.direction == 'left' && !this.collisions.left){
                this.x -= this.speed;
            } else if (this.direction == 'down' && !this.collisions.bottom){
                this.y += this.speed;
            } else if (this.direction == 'right' && !this.collisions.right){
                //console.log("hello")
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
            if((this.rectY + this.y == objs[i].rectY + objs[i].y + objs[i].rectHeight) && 
            (this.rectX + this.x + this.rectWidth > objs[i].rectX + objs[i].x) &&
            (this.rectX + this.x < objs[i].rectX + objs[i].x + objs[i].rectWidth)){
                return true;
            }
        }
        return false;
    }

    isLeftColliding (objs) {
        for(let i = 0; i < objs.length; i++){
            if((this.rectX + this.x == objs[i].rectX + objs[i].x + objs[i].rectWidth) && 
            (this.rectY + this.y + this.rectHeight > objs[i].rectY + objs[i].y) &&
            (this.rectY + this.y < objs[i].rectY + objs[i].y + objs[i].rectHeight)){
                return true;
            }
        }
        return false;
    }

    isBottomColliding (objs) {
        for(let i = 0; i < objs.length; i++){
            if((this.rectY + this.y + this.rectHeight == objs[i].rectY + objs[i].y) && 
            (this.rectX + this.x + this.rectWidth > objs[i].rectX + objs[i].x) &&
            (this.rectX + this.x < objs[i].rectX + objs[i].x + objs[i].rectWidth)){
                return true;
            }
        }
        return false;
    }

    isRightColliding (objs) {
        for(let i = 0; i < objs.length; i++){
            if((this.rectX + this.x + this.rectWidth == objs[i].rectX + objs[i].x) && 
            (this.rectY + this.y + this.rectHeight > objs[i].rectY + objs[i].y) &&
            (this.rectY + this.y < objs[i].rectY + objs[i].y + objs[i].rectHeight)){
                return true;
            }
        }
        return false;
    }
}