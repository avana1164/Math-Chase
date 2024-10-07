class NPC extends Person{
    constructor(config){
        super(config);
    }

    update(objs){
        this.collisions = {top: this.isTopColliding(objs), bottom: this.isBottomColliding(objs), 
            left: this.isLeftColliding(objs), right: this.isRightColliding(objs)};
        this.isMoving = !this.collisions.top;
        this.moveCharacter('up', this.isMoving);   
    }
}