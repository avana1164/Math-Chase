class Person extends GameObject {
    constructor(config){
        super(config);
        this.directionInput = new DirectionInput();
        this.isMoving = false;
        this.spriteX = 0;
        this.speed = config.speed;
        this.collDirections = [];
    }

    movePlayer = (obj) => {
        this.lastKey = this.directionInput.lastKey;
        this.spriteY = this.directionInput.spriteDirection[this.lastKey][0];
        this.isMoving = false;

        if (this.directionInput.spriteDirection['KeyW'][1] && this.lastKey == 'KeyW' && !this.isTopColliding(obj)) {
            this.y -= this.speed;
            this.isMoving = true;
        } else if (this.directionInput.spriteDirection['KeyA'][1] && this.lastKey == 'KeyA' && !this.isLeftColliding(obj)){
            this.x -= this.speed;
            this.isMoving = true;
        } else if (this.directionInput.spriteDirection['KeyS'][1] && this.lastKey == 'KeyS' && !this.isBottomColliding(obj)){
            this.y += this.speed;
            this.isMoving = true;
        } else if (this.directionInput.spriteDirection['KeyD'][1] && this.lastKey == 'KeyD' && !this.isRightColliding(obj)){
            this.x += this.speed;
            this.isMoving = true;
        } 
    }

    draw = (ctx) => {
        ctx.drawImage(this.sheet, this.spriteX*this.xDim, this.spriteY*this.yDim, this.xDim, this.yDim, this.x, this.y, this.xDim*2, this.yDim*2);
        this.drawRect(ctx);
    }
}