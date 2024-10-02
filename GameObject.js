class GameObject {
    constructor(config){
        this.xDim = config.xDim;
        this.yDim = config.yDim;
        this.x = config.x;
        this.y = config.y;
        this.sheet = new Image();
        this.sheet.src = config.src; 
    }

    draw() {

    }
}