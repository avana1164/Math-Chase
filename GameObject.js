class GameObject {
    constructor(config){
        //include hitboxes for characters
        this.objectSrcKey = 
        {'house': {src: "/game_sprites/House.png", 
                    rectX: 16, rectY: 55, rectWidth: 128, rectHeight: 96}, 
        'player': {src: "/game_sprites/walk.png",
                    rectX: 6, rectY: 36, rectWidth: 20, rectHeight: 20},
        'npc': {src: "/game_sprites/NPC_test.png",
            rectX: 6, rectY: 36, rectWidth: 20, rectHeight: 20}
        };

        this.xDim = config.xDim;
        this.yDim = config.yDim;
        this.x = config.x;
        this.y = config.y;
        this.sheet = new Image();
        this.type = config.type;
        this.sheet.src = this.objectSrcKey[config.type].src; 
        this.rectX = this.objectSrcKey[config.type].rectX;
        this.rectY = this.objectSrcKey[config.type].rectY;
        this.rectWidth = this.objectSrcKey[config.type].rectWidth;
        this.rectHeight = this.objectSrcKey[config.type].rectHeight;

        this.solidTilesX = [(this.rectX + this.x)/32, (this.rectX + this.x + this.rectWidth)/32];
        this.solidTilesY = [(this.rectY + this.y)/32, (this.rectY + this.y + this.rectHeight)/32];
    }

    draw(ctx) {
        ctx.drawImage(this.sheet, 0, 0, this.xDim, this.yDim, this.x, this.y, this.xDim*2, this.yDim*2);
        
        this.drawRect(ctx);
    }

    drawRect(ctx){
        for(let i = 0; i < 10; i++){
            ctx.strokeStyle = "yellow";
            ctx.beginPath();
            ctx.rect(this.rectX + this.x, this.rectY + this.y, this.rectWidth, this.rectHeight);
            ctx.stroke();
        }
    }
}