class GameObject {
    constructor(config){
        //include hitboxes for characters
        this.objectSrcKey = 
        {'house': {src: "/game_sprites/House.png", 
                    rectX: 12, rectY: 55, rectWidth: 136, rectHeight: 100, zAdj: 110}, 
            
        'player': {src: "/game_sprites/walk.png",
                    rectX: 6, rectY: 36, rectWidth: 20, rectHeight: 20},
        'npc': {src: "/game_sprites/NPC_test.png",
            rectX: 6, rectY: 36, rectWidth: 20, rectHeight: 20, zAdj: 10
        }
        };
        this.xDim = config.xDim;
        this.yDim = config.yDim;
        this.x = config.x;
        this.y = config.y;
        this.sheet = new Image();
        this.sheet.src = this.objectSrcKey[config.type].src; 
        this.rectX = this.objectSrcKey[config.type].rectX;
        this.rectY = this.objectSrcKey[config.type].rectY;
        this.rectWidth = this.objectSrcKey[config.type].rectWidth;
        this.rectHeight = this.objectSrcKey[config.type].rectHeight;
        this.zAdj = this.objectSrcKey[config.type].zAdj;
        
    }

    draw(ctx) {
        ctx.drawImage(this.sheet, 0, 0, this.xDim, this.yDim, this.x, this.y, this.xDim*2, this.yDim*2);
        ctx.strokeStyle = "black";
        this.drawRect(ctx);
    }

    drawRect(ctx){
        for(let i = 0; i < 10; i++){
            ctx.beginPath();
            ctx.rect(this.rectX + this.x, this.rectY + this.y, this.rectWidth, this.rectHeight);
            ctx.stroke();
        }
    }

    isTopColliding(objs){
        for(let i = 0; i < objs.length; i++){
            if((this.rectY + this.y == objs[i].rectY + objs[i].y + objs[i].rectHeight) && 
            (this.rectX + this.x + this.rectWidth > objs[i].rectX + objs[i].x) &&
            (this.rectX + this.x < objs[i].rectX + objs[i].x + objs[i].rectWidth)){
                return true;
            }
        }
        return false;
    }

    isLeftColliding(objs){
        for(let i = 0; i < objs.length; i++){
            if((this.rectX + this.x == objs[i].rectX + objs[i].x + objs[i].rectWidth) && 
            (this.rectY + this.y + this.rectHeight > objs[i].rectY + objs[i].y) &&
            (this.rectY + this.y < objs[i].rectY + objs[i].y + objs[i].rectHeight)){
                return true;
            }
        }
        return false;
    }

    isBottomColliding(objs){
        for(let i = 0; i < objs.length; i++){
            if((this.rectY + this.y + this.rectHeight == objs[i].rectY + objs[i].y) && 
            (this.rectX + this.x + this.rectWidth > objs[i].rectX + objs[i].x) &&
            (this.rectX + this.x < objs[i].rectX + objs[i].x + objs[i].rectWidth)){
                return true;
            }
        }
        return false;
    }

    isRightColliding(objs){
        for(let i = 0; i < objs.length; i++){
            if((this.rectX + this.x + this.rectWidth == objs[i].rectX + objs[i].x) && 
            (this.rectY + this.y + this.rectHeight > objs[i].rectY + objs[i].y) &&
            (this.rectY + this.y < objs[i].rectY + objs[i].y + objs[i].rectHeight)){
                return true;
            }
        }
        return false;
    }

    isRightCollidingTest(obj){
        if((this.rectX + this.x + this.rectWidth == obj.rectX + obj.x) && 
            (this.rectY + this.y + this.rectHeight > obj.rectY + obj.y) &&
            (this.rectY + this.y < obj.rectY + obj.y + obj.rectHeight)){
                return true;
            }
            return false;
    }
}