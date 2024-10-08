class DirectionInput {
    constructor(){
        this.keyDirections = {'KeyW': false, 'KeyA': false, 'KeyS': false, 'KeyD': false};
        this.lastKey = 'KeyS';
        window.addEventListener("keydown", (e) => this.handleKeyDown(e));
        window.addEventListener("keyup", (e) => this.handleKeyUp(e));
    }

    handleKeyDown(e) {
        if(this.keyDirections[e.code] != null){
            this.keyDirections[e.code] = true;
            this.lastKey = e.code;
        }
    }

    handleKeyUp(e) {
        if(this.keyDirections[e.code] != null){
            this.keyDirections[e.code] = false;
        }
    }
}