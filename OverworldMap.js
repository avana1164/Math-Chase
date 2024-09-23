class OverworldMap {
    constructor(config){
        this.gameObjects = config.gameObjects; 
        this.upperImage = new Image();
        this.lowerImage = new Image();
        this.lowerImage.src = config.lowerSrc;
        this.upperImage.src = config.upperSrc;
    }

    drawLowerImage(ctx) {
        ctx.drawImage(this.lowerImage, 0, 0, 512, 256, 0, 0, 1024, 512);
    }

    drawUpperImage(ctx) {
        ctx.drawImage(this.upperImage, 0, 0);
    }
}

window.OverworldMaps = {
    GrassyField: {
        lowerSrc: "/game_sprites/grassy_field.png",
        upperSrc: "/game_sprites/grassy_field.png",
        gameObjects: {
            hero: new Person({
                isPlayerControlled: true,
                x: 15,
                y: 20
            }),
            npc: new Person({
                x: 300,
                y: 150,
                src: "/game_sprites/NPC_test.png"
            })
        }
    }
}