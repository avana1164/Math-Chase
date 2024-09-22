class Overworld {
    //config is an object literal with multiple keys corresponding to a value
    constructor(config){
        this.element = config.element;
        this.canvas = this.element.querySelector(".game-canvas");
        this.ctx = this.canvas.getContext("2d");
    }

    init() {
        this.ctx.imageSmoothingEnabled = false;
        for(let i = 0; i < 16; i++){
            for(let j = 0; j < 32; j++){
                const image = new Image();
                image.onload = () => {
                    this.ctx.drawImage(image, 0, 0, 16, 16, j*16, i*16, 16, 16);
                }
                image.src = "/game_sprites/Overworld.png";
            }    
        }

        const hero = new GameObject({
            x: 15,
            y: 20
        });
        
        const npc = new GameObject({
            x: 300,
            y: 150,
            src: "/game_sprites/NPC_test.png"
        });

        setTimeout(() => {
            hero.sprite.draw(this.ctx);
            npc.sprite.draw(this.ctx);
        }, 200)
    }
}
