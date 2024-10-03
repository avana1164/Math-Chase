class GameObject {
    constructor(config){
        this.objectSrcKey = {'house': "/game_sprites/House.png", 'player': "/game_sprites/walk.png"};
        this.xDim = config.xDim;
        this.yDim = config.yDim;
        this.x = config.x;
        this.y = config.y;
        this.sheet = new Image();
        this.sheet.src = this.objectSrcKey[config.type]; 
    }

    draw(ctx) {
        ctx.drawImage(this.sheet, 0, 0, this.xDim, this.yDim, this.x, this.y, this.xDim*2, this.yDim*2);
    }
}