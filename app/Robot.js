function Robot(x, y, r, lifespan) {
    this.initX = x;
    this.initY = y;
    this.pos = new p5.Vector();
    this.lifespan = lifespan;
    this.r = ROBOT_SIZE;
    this.genes = new Genes(this.lifespan);

    this.reset();
}

Robot.prototype.reset = function() {
    this.pos.x = this.initX;
    this.pos.y = this.initY;

    this.genesIndex = 0;
    this.crashed = false;
    this.foundTarget = false;
    this.efficiency = W * L;
}

Robot.prototype.move = function() {
    var distToTarget = TARGET.dist(this.pos);
    if (distToTarget <= this.r) {
        this.foundTarget = true;
        return;
    }

    if (!this.crashed && this.genesIndex < this.genes.moves.length) {
        this.pos.add(this.genes.moves[this.genesIndex]);
        this.genesIndex++;

        if (this.hasCrashed()) {
            this.crashed = true;
        }
    }
}

Robot.prototype.hasCrashed = function() {
    if (this.genesIndex >= this.genes.moves.length) {
        return;
    }

    var newPos = this.pos.copy().add(this.genes.moves[this.genesIndex]);

    // Check the walls
    if (newPos.x <= 0 || newPos.y <= 0
        || newPos.x + this.r >= W || newPos.y + this.r >= L) {
        return true;
    }
}

Robot.prototype.show = function() {
    if (this.crashed) {
        fill(200, 0, 0)
    } else if (this.foundTarget) {
        fill(0, 200, 0)
    } else {
        fill(0, 0, 200)
    }
    rect(this.pos.x, this.pos.y, this.r, this.r);
}

Robot.prototype.setEfficiency = function() {
    this.efficiency = TARGET.dist(this.pos);
}
