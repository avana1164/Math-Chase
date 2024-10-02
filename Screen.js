class Screen {
    constructor(config){
        this.layout = new Image();
        this.people = config.people;
        this.collectibles = config.collectibles;
        this.buildings = config.buildings;
        this.layout.src = config.src;
        this.zOrder = [];
    } 

    //will load all the new sprites, will use a sorting algorithm to find z-index of character
    load (){
        
    }

    //unload method will remove all sprites from previous screen and load all the sprites into the new screen
    unload (){

    }
}