function Genes(size) {
    this.moves = this.initializeMovesRandom(size);
    this.size = size;
}

Genes.prototype.generateNewMove = function() {
    var newMove = random(-45, 45);
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
            newMoves.push(this.moves[i]);
        } else {
            newMoves.push(parentB.moves[i]);
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
