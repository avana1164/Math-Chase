class Overworld {
    //config is an object literal with multiple keys corresponding to a value
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
        this.map = null;
    }

    startGameLoop() {
        const step = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            
            //the lower layer will draw the first layer of the map
            this.map.drawLowerImage(this.ctx);

            //this method draw all the characters in gameObjects
            Object.values(this.map.gameObjects).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction
                });
                object.sprite.draw(this.ctx);
            })

            //this upper layer of the map will prevent any character from being drawn on top of the house
            //this.map.drawUpperImage(this.ctx);
            
            //updates every frame rather than instantly
            requestAnimationFrame(() => {
                step();
            });
        }
        step();
    }

    init() {
        this.ctx.imageSmoothingEnabled = false;
        this.map = new OverworldMap(window.OverworldMaps.GrassyField);
        this.directionInput = new DirectionInput();
        this.directionInput.init();
        this.startGameLoop();
    }
}
