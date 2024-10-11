class NPC extends Person{
    constructor(config){
        super(config);
        this.xOriginal = this.x;
        this.yOriginal = this.y;
        this.obstacles = config.obstacles;
        this.pFinder = new PathFinder(this);
        this.onPath = true;
    }

    update(objs){

        let goalCol = 30;
        let goalRow = 2;

        //console.log(this.onPath);
        if(this.onPath){
            this.searchPath(goalCol, goalRow, this.obstacles);
        }

        this.moveCharacter(this.onPath, objs);
    }

    searchPath(goalCol, goalRow, obstacles){
        let startCol = (this.x + this.rectX)/32;
        let startRow = (this.y + this.rectY)/32;
        this.pFinder.setNodes(Math.round(startCol), Math.round(startRow), goalCol, goalRow, obstacles);

        if(this.pFinder.search() == true){
            let nextX = this.pFinder.pathList[0].col * 32;
            let nextY = this.pFinder.pathList[0].row * 32;
            
            let npcLeft = this.x + this.rectX;
            let npcRight = this.x + this.rectX + this.rectWidth;
            let npcTop = this.y + this.rectY;
            let npcBottom = this.y + this.rectY + this.rectHeight;

            if(npcTop > nextY && npcLeft >= nextX && npcRight < nextX + 32){
                this.direction = 'up';
            } else if(npcTop < nextY && npcLeft >= nextX && npcRight < nextX + 32){
                this.direction = 'down';
            } else if(npcTop >= nextY && npcBottom < nextY + 32) {
                if(npcLeft > nextX){
                    this.direction = 'left';
                }

                if(npcLeft < nextX){
                    this.direction = 'right';
                }
            } else if(npcTop > nextY && npcLeft > nextX) {
                this.direction = 'up';
                if(this.collisions.up){
                    this.direction = 'left';
                }
            } else if(npcTop > nextY && npcLeft < nextX){
                this.direction = 'up';
                if(this.collisions.up){
                    this.direction = 'right';
                }
            } else if(npcTop < nextY ** npcLeft > nextX){
                this.direction = 'down';
                if(this.collisions){
                    this.direction = 'left';
                }
            } else if(npcTop < nextY ** npcLeft < nextX){
                this.direction = 'down';
                if(this.collisions){
                    this.direction = 'right';
                }
            }

            
            let nextCol = this.pFinder.pathList[0].col;
            let nextRow = this.pFinder.pathList[0].row;
            if(nextCol == goalCol && nextRow == goalRow){
                this.onPath = false;
            }
        }
    } 
}

class Node {
    constructor(config){
        this.parent;
        this.col = config.col;
        this.row =  config.row;
        this.gCost;
        this.hCost;
        this.fCost;
        this.solid;
        this.open;
        this.checked;
    }
}

class PathFinder {

    constructor(){
        this.node = [];
        this.openList = [];
        this.pathList = [];
        this.startNode;
        this.goalNode;
        this.currentNode;
        this.goalReached = false;
        this.step = 0;
        this.instantiateNodes();
    }

    instantiateNodes() {
        for(let i = 0; i < 32; i++){
            this.node.push([]);
        }

        for(let i = 0; i < 32; i++){
            for(let j = 0; j < 16; j++){
                this.node[i][j] = new Node({col: i, row: j});
            }
        }
    }

    resetNodes() {
        for(let i = 0; i < 32; i++){
            for(let j = 0; j < 16; j++){
                this.node[i][j].open = false;
                this.node[i][j].checked = false;
                this.node[i][j].solid = false;
            }
        }

        this.openList = [];
        this.pathList = [];
        this.goalReached = false;
        this.step = 0;
    }

    setNodes(startCol, startRow, goalCol, goalRow, obstacles){
        this.resetNodes();

        this.startNode = this.node[startCol][startRow];
        this.currentNode = this.startNode;
        this.goalNode = this.node[goalCol][goalRow];
        this.openList.push(this.currentNode);

        for(let i = 0; i < obstacles.length; i++){
            for(let j = obstacles[i].solidTilesX[0]; j < obstacles[i].solidTilesX[1]; j++){
                for(let k = obstacles[i].solidTilesY[0]; k < obstacles[i].solidTilesY[1]; k++){
                    this.node[j][k].solid = true;
                }
            }
        }

        for(let i = 0; i < 32; i++){
            for(let j = 0; j < 16; j++){
                this.getCost[this.node[i][j]];
            }
        }    
    }

    getCost(node) {
        let xDist = Math.abs(node.col - this.startNode.col);
        let yDist = Math.abs(node.row - this.startNode.row);
        node.gCost = xDist + yDist;

        xDist = Math.abs(node.col - this.startNode.col);
        yDist = Math.abs(node.row - this.startNode.row);
        node.hCost = xDist + yDist;

        node.fCost = node.gCost + node.hCost;
    }

    search(){
        while(this.goalReached == false && this.step < 500){
            let col = this.currentNode.col;
            let row = this.currentNode.row;

            this.currentNode.checked = true;
            this.openList.splice(this.openList.indexOf(this.currentNode), 1);

            if(row - 1 >= 0) {
                this.openNode(this.node[col][row - 1]);
            }

            if(col - 1 >= 0) {
                this.openNode(this.node[col - 1][row]);
            }

            if(row + 1 < 16) {
                this.openNode(this.node[col][row + 1]);
            }

            if(col + 1 < 32) {
                this.openNode(this.node[col + 1][row]);
            }

            let bestNodeIndex = 0;
            let bestNodefCost = 999;

            for(let i = 0; i < this.openList.length; i++) {
                if(this.openList[i].fCost < bestNodefCost) {
                    bestNodeIndex = i;
                    bestNodefCost = this.openList[i].fCost;
                } else if (this.openList[i].fCost == bestNodefCost) {
                    if(this.openList[i].gCost < this.openList[bestNodeIndex].gCost){
                        bestNodeIndex = i;
                    }
                }
            }

            if(this.openList.length == 0) {
                break;
            }

            this.currentNode = this.openList[bestNodeIndex];

            if(this.currentNode == this.goalNode) {
                this.goalReached = true;
                this.trackThePath();
            }
            this.step++;
        }

        return this.goalReached;
    }

    openNode(node){
        if(node.open == false && node.checked == false && node.solid == false){
            node.open = true;
            node.parent = this.currentNode;
            this.openList.push(node);
        }
    }

    trackThePath(){
        let current = this.goalNode;

        while(current != this.startNode) {
            this.pathList.unshift(current);
            current = current.parent;
        }
    }
}