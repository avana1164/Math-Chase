class Person extends GameObject {
    constructor(config){
        super(config);
        this.xDim = 16;
        this.yDim = 32;
        this.isPlayer = config.isPlayer || true;
    }
}