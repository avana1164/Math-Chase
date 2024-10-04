class NPC extends GameObject{
    constructor(config){
        super(config);
        this.spriteX = 0;
        this.spriteY = 0;
        this.speed = config.speed;
    }

    moveNPC = (collision) => {
        if(!collision){
            this.y -= this.speed;
        }
    }

    draw = (ctx) => {
        ctx.drawImage(this.sheet, this.spriteX*this.xDim, this.spriteY*this.yDim, this.xDim, this.yDim, this.x, this.y, this.xDim*2, this.yDim*2);
        //console.log('drawn')
        this.drawRect(ctx);
    }
}