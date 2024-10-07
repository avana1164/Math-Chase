class NPC extends Person{
    constructor(config){
        super(config);
    }

    update(objs){
        this.moveCharacter('up', true, objs);   
    }
}