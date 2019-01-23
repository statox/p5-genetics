function Genes(size) {
    this.moves = this.initializeMovesRandom(size);
    this.size = size;

    /*
     *this.moves = [];
     *this.addMovesDirection("L", 1000);
     */
}

Genes.prototype.addMovesDirection = function(dir, size) {
    var newDir = new p5.Vector();
    switch(dir) {
        case "U":
            newDir.y = -1;
            break;
        case "D":
            newDir.y = 1;
            break;
        case "R":
            newDir.x = 1;
            break;
        case "L":
            newDir.x = -1;
            break;

    }
    for (var i=0; i<size; i++) {
        this.moves.push(newDir);
    }
}

Genes.prototype.generateNewMove = function() {
    var newMove = new p5.Vector(0, 0);

    /*
     *if (random() > 0.5) {
     *    //newMove.x = (random() > 0.5) ? 1 : -1;
     *    newMove.x = random(-10, 10);
     *} else {
     *    //newMove.y = (random() > 0.5) ? 1 : -1;
     *    newMove.y = random(-10, 10);
     *}
     */

    var x = (random() > 0.5) ? -5 : 5;
    var y = (random() > 0.5) ? -5 : 5;
    var newMove = new p5.Vector(x, y);
    return newMove;
}

Genes.prototype.initializeMovesRandom = function(size) {
    var moves = [];
    for (var i=0; i<size; i++) {
        moves.push(this.generateNewMove());
    }
    return moves;
}

Genes.prototype.merge = function(parentB) {
    var newMoves = [];
    for (var i=0; i<this.moves.length; i++) {
        if (i <= this.moves.length/2) {
            newMoves.push(this.moves[i].copy());
        } else {
            newMoves.push(parentB.moves[i].copy());
        }
    }

    return newMoves;
}

Genes.prototype.mutate = function() {
    var mutationCnt = 0;
    for (var i=0; i<this.moves.length; i++) {
        if (random() < MUTATION_RATE / 100) {
            mutationCnt++;
            this.moves[i] = this.generateNewMove();
        }
    }
}
