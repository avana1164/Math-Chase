class Player extends Person{
    constructor(config){
        super(config);
        this.directionInput = new DirectionInput();
        this.direction = null;
        this.isMoving = false; 
    }

    update(objs){
        this.lastKey = this.directionInput.lastKey;


        console.log("Up Move: " + (this.directionInput.keyDirections['KeyW'] && !this.collisions.top));
        console.log("Left Move: " + (this.directionInput.keyDirections['KeyA'] && !this.collisions.left));
        // console.log("Down Move: " + (this.directionInput.keyDirections['KeyS'] && !this.collisions.bottom));
        // console.log("Right Move: " + (this.directionInput.keyDirections['KeyD'] && !this.collisions.bottom));

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