class Player extends Person{
    constructor(config){
        super(config);
        this.directionInput = new DirectionInput();
        this.direction = null;
        this.isMoving = false; 
    }

    update(objs){
        this.lastKey = this.directionInput.lastKey;
        this.collisions = {top: this.isTopColliding(objs), bottom: this.isBottomColliding(objs), 
            left: this.isLeftColliding(objs), right: this.isRightColliding(objs)};

        this.isMoving = (this.directionInput.keyDirections['KeyW'] && !this.collisions.top) 
        || (this.directionInput.keyDirections['KeyA'] && !this.collisions.left) 
        || (this.directionInput.keyDirections['KeyS'] && !this.collisions.bottom) 
        || (this.directionInput.keyDirections['KeyD'] && !this.collisions.right);
        
        if(this.lastKey == 'KeyW'){
            this.direction = 'up';
        } else if(this.lastKey == 'KeyA'){
            this.direction = 'left';
        } else if(this.lastKey == 'KeyS'){
            this.direction = 'down';
        } else if(this.lastKey == 'KeyD'){
            this.direction = 'right';
        }

        this.moveCharacter(this.direction, this.isMoving);
    }
}