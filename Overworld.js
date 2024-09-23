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
                object.x+=0.5;
                object.sprite.draw(this.ctx);
            })

            //this upper layer of the map will prevent any character from being draw on top of the house
            //this.map.drawUpperImage(this.ctx); 
            requestAnimationFrame(() => {
                step();
            });
        }
        step();
    }

    init() {
        this.ctx.imageSmoothingEnabled = false;
        this.map = new OverworldMap(window.OverworldMaps.GrassyField);
        this.startGameLoop();
    }
}
