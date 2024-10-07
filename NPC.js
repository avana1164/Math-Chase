class NPC extends Person{
    constructor(config){
        super(config);
        this.xOriginal = this.x;
        this.yOriginal = this.y;
    }

    update(objs){
        
        if(this.yOriginal - this.y == 30 && this.x - this.xOriginal != 30){
            this.moveCharacter('right', true, objs);
        } else if(this.x - this.xOriginal == 30 && this.y - this.yOriginal != 30){
            this.moveCharacter('down', true, objs);
        } else if(this.y - this.yOriginal == 30 && this.xOriginal - this.x != 30){
            this.moveCharacter('left', true, objs);
        } else {
            this.moveCharacter('up', true, objs);
        }
    }
}