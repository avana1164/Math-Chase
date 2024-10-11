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