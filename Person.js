class Person extends GameObject {
    constructor(config){
        super(config);
        this.directionInput = new DirectionInput();
        this.isMoving = false;
        this.spriteX = 0;
        this.speed = config.speed;
        this.collDirections = [];
    }

    movePlayer = (collision, collidedObj) => {
        this.lastKey = this.directionInput.lastKey;
        this.spriteY = this.directionInput.spriteDirection[this.lastKey][0];
        this.isMoving = false;

        
        if(collision){
            if(this.collDirections.indexOf(this.lastKey) != null){
                this.collDirections.push(this.lastKey);
                if((this.collDirections[0] == 'KeyW' || this.collDirections[0] == 'KeyS') && (this.x + this.rectX + this.rectWidth == collidedObj.rectX + collidedObj.x
                || this.x + this.rectX + 1 == collidedObj.x + collidedObj.rectX + collidedObj.rectWidth)){
                    this.collDirections = [];
                }
                
                if((this.collDirections[0] == 'KeyA' || this.collDirections[0] == 'KeyD') && (this.y + this.rectY == collidedObj.y + collidedObj.rectY + collidedObj.rectHeight
                || this.y + this.rectY + this.rectHeight == collidedObj.y + collidedObj.rectY)){
                    this.collDirections = [];
                }
            }     
        } else {
            this.collDirections = [];
        }

        if (this.directionInput.spriteDirection['KeyW'][1] && this.lastKey == 'KeyW' && this.collDirections[0] != 'KeyW') {
            this.y -= this.speed;
            this.isMoving = true;
        } else if (this.directionInput.spriteDirection['KeyA'][1] && this.lastKey == 'KeyA' && this.collDirections[0] != 'KeyA'){
            this.x -= this.speed;
            this.isMoving = true;
        } else if (this.directionInput.spriteDirection['KeyS'][1] && this.lastKey == 'KeyS' && this.collDirections[0] != 'KeyS'){
            this.y += this.speed;
            this.isMoving = true;
        } else if (this.directionInput.spriteDirection['KeyD'][1] && this.lastKey == 'KeyD' && this.collDirections[0] != 'KeyD'){
            this.x += this.speed;
            this.isMoving = true;
        } 
    }

    

    draw = (ctx) => {
        ctx.drawImage(this.sheet, this.spriteX*this.xDim, this.spriteY*this.yDim, this.xDim, this.yDim, this.x, this.y, this.xDim*2, this.yDim*2);
        //console.log('drawn')
        this.drawRect(ctx);
    }


}