function Moves(lifespan) {
    this.lifespan = lifespan;
    this.vectors = [];

    for (var i=0; i<this.lifespan; i++) {
        this.vectors.push(this.generateVector());
    }
}

Moves.prototype.generateVector = function() {
    var randomComponent = random();
    var randomComponentValue = random(-1, 1);
    var newVector = new p5.Vector(0, 0);

    if (randomComponent < 0.5) {
        newVector.x = randomComponentValue;
    } else {
        newVector.y = randomComponentValue;
    }
    newVector.setMag(5);
    newVector.numberOfUses = 100;

    return newVector;
}

Moves.prototype.merge = function (otherMoves) {
    var newMoves = new Moves();
    for (var i=0; i<this.vectors.length; i++) {
        if (i < this.vectors.length / 2) {
            newMoves.vectors[i] = otherMoves.vectors[i].copy();
            //newMoves.vectors[i].numberOfUses = otherMoves.vectors[i].numberOfUses;
            newMoves.vectors[i].numberOfUses = 100;
        } else {
            newMoves.vectors[i] = this.vectors[i].copy();
            //newMoves.vectors[i].numberOfUses = this.vectors[i].numberOfUses;
            newMoves.vectors[i].numberOfUses = 100;
        }
    }

    return newMoves;
}

Moves.prototype.mutate = function() {
    for (var i=0; i<this.vectors.length; i++) {
        if (random() < 0.03) {
        //if (random() < 0.5) {
            this.vectors[i] = this.generateVector();
        }
    }
}
