class Collectible extends GameObject {
    constructor(config){
        super(config);
        this.collectible = new Image();
        this.collectible.src = "/game_sprites/objects.png";

        //3 corresponds to heart, 4 corresponds to coin
        collectible_type = config.type || "heart";
    }
}