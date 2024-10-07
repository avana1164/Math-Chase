class Player extends Person{
    constructor(config){
        super(config);
        this.directionInput = new DirectionInput();
        this.direction = null;
        this.isMoving = false; 
    }

    update(objs){
        this.lastKey = this.directionInput.lastKey;

        this.isMoving = this.directionInput.keyDirections['KeyW'] || this.directionInput.keyDirections['KeyA']
        || this.directionInput.keyDirections['KeyS'] || this.directionInput.keyDirections['KeyD'];
        
        if(this.lastKey == 'KeyW'){
            this.direction = 'up';
        } else if(this.lastKey == 'KeyA'){
            this.direction = 'left';
        } else if(this.lastKey == 'KeyS'){
            this.direction = 'down';
        } else if(this.lastKey == 'KeyD'){
            this.direction = 'right';
        }

        this.moveCharacter(this.direction, this.isMoving, objs);
    }
}