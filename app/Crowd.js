function Crowd(size) {
    this.robots = [];
    this.matingPool = [];
    this.size = size;
    for (var i=0; i<size; i++) {
        this.robots.push(new Robot(W/2, L/2, ROBOT_SIZE, LIFESPAN));
    }
}

Crowd.prototype.evaluate = function() {
    var crashed = 0;
    var foundTarget = 0;
    for (robot of this.robots) {
        robot.setEfficiency();
        if (robot.crashed) {
            crashed++;
        }
        if (robot.foundTarget) {
            foundTarget++;
        }
    }

    var maxDistance = 0;
    var minDistance = this.robots[0].efficiency;
    var averageDistance = 0;

    for (robot of this.robots) {
        var distance = robot.efficiency;
        averageDistance += distance;
        if (distance > maxDistance) {
            maxDistance = distance;
        }
        if (distance < minDistance) {
            minDistance = distance;
        }
    }
    averageDistance /= this.robots.length;

    this.matingPool = [];
    for (robot of this.robots) {
        if (robot.efficiency <= averageDistance) {
            var rank = map(robot.efficiency, averageDistance, minDistance, 1, 10);
            for (var i=0; i<rank; i++) {
                this.matingPool.push(robot.genes);
            }
        }
    }

    return {
        'avg': averageDistance,
        'max': maxDistance,
        'min': minDistance,
        'crashed': crashed,
        'foundTarget': foundTarget
    };
}

Crowd.prototype.evolve = function() {
    for (robot of this.robots) {
        robot.reset();

        var parentA = random(this.matingPool);
        var parentB = random(this.matingPool);
        var child = parentA.merge(parentB);

        robot.genes.moves = child;
        robot.genes.mutate();
    }
}
