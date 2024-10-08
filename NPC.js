class NPC extends Person{
    constructor(config){
        super(config);
        this.xOriginal = this.x;
        this.yOriginal = this.y;
    }

    update(objs){
        // create A* pathfinding algorithm here
        this.squareLength = 50;
        if(this.yOriginal - this.y == this.squareLength && this.x - this.xOriginal != this.squareLength){
            this.moveCharacter('right', true, objs);
        } else if(this.x - this.xOriginal == this.squareLength && this.y - this.yOriginal != this.squareLength){
            this.moveCharacter('down', true, objs);
        } else if(this.y - this.yOriginal ==  this.squareLength && this.xOriginal - this.x != this.squareLength){
            this.moveCharacter('left', true, objs);
        } else {
            this.moveCharacter('up', true, objs);
        }
    }
}