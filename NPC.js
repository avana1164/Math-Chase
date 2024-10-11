class NPC extends Person{
    constructor(config){
        super(config);
        this.xOriginal = this.x;
        this.yOriginal = this.y;
        this.obstacles = config.obstacles;
        this.onPath = true;
    }

    update(objs){
        let player;
        for(let i = 0; i < objs.length; i++){
            if(objs[i].type == 'player'){
                player = objs[i];
            }
        }

        let goalCol = Math.round((player.x + player.rectX)/32);
        let goalRow = Math.round((player.y + player.rectY)/32);

        if(!this.npcCollidingPlayer(this, player)){
            this.searchPath(goalCol, goalRow, this.obstacles, objs);
        }

        this.moveCharacter(!this.npcCollidingPlayer(this, player), objs);
    }

    searchPath(goalCol, goalRow, obstacles, objs){
        let startCol = (this.x + this.rectX)/32;
        let startRow = (this.y + this.rectY)/32;
        this.pFinder.setNodes(Math.round(startCol), Math.round(startRow), goalCol, goalRow, obstacles);

        if(this.pFinder.search() == true){
            let nextX = this.pFinder.pathList[0].col * 32;
            let nextY = this.pFinder.pathList[0].row * 32;
            
            let npcLeft = this.x + this.rectX;
            let npcRight = this.x + this.rectX + this.rectWidth;
            let npcTop = this.y + this.rectY;
            let npcBottom = this.y + this.rectY + this.rectHeight;

            if(npcTop > nextY && npcLeft >= nextX && npcRight < nextX + 32){
                this.direction = 'up';
            } else if(npcTop < nextY && npcLeft >= nextX && npcRight < nextX + 32){
                this.direction = 'down';
            } else if(npcTop >= nextY && npcBottom < nextY + 32) {
                if(npcLeft > nextX){
                    this.direction = 'left';
                }

                if(npcLeft < nextX){
                    this.direction = 'right';
                }
            } else if(npcTop > nextY && npcLeft > nextX) {
                this.direction = 'up';
                if(this.isTopColliding(objs)){
                    this.direction = 'left';
                }
            } else if(npcTop > nextY && npcLeft < nextX){
                this.direction = 'up';
                if(this.isTopColliding(objs)){
                    this.direction = 'right';
                }
            } else if(npcTop < nextY && npcLeft > nextX){
                this.direction = 'down';
                if(this.isBottomColliding(objs)){
                    this.direction = 'left';
                }
            } else if(npcTop < nextY && npcLeft < nextX){
                this.direction = 'down';
                if(this.isBottomColliding(objs)){
                    this.direction = 'right';
                }
            }
        }
    } 
}