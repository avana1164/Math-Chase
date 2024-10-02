class DirectionInput {
    constructor(){
        this.spriteDirection = {'KeyW': [2, false], 'KeyA': [3, false], 'KeyS': [0, false], 'KeyD': [1, false]};
        this.lastKey = 'KeyS';
        window.addEventListener("keydown", (e) => this.handleKeyDown(e));
        window.addEventListener("keyup", (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        if(this.spriteDirection[e.code] != null){
            this.spriteDirection[e.code][1] = true;
            this.lastKey = e.code;
        }
    }

    handleKeyUp(e) {
        if(this.spriteDirection[e.code] != null){
            this.spriteDirection[e.code][1] = false;
        }
    }
}
