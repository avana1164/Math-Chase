class Sprite {
    constructor(config){
        this.image = new Image();
        this.image.src = config.src;
        this.image.onload = () => {
            this.isLoaded = true;
        }

        this.animations = config.animations || {
            idleDown: [[0, 0]]
        }
        this.currentAnimation = config.currentAnimation || "idleDown";
        this.currentAnimationFrame = 0;

        //Reference the game object
        this.gameObject = config.gameObject;
    }

    draw(ctx){
        let scale = 2;
        const x = this.gameObject.x;
        const y = this.gameObject.y;
        ctx.drawImage(this.image, 0, 0, 16, 32, x, y, 16*scale, 32*scale);
    }
}