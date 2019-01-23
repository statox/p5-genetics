var W=700;
var L=400;
var CROWD_SIZE = 10;
var LIFESPAN = 300;
var GENERATION = 1;
var MUTATION_RATE = 5;
var HISTORY_SIZE = 100;

var robot;
var AGE;
var obstacles;
var crowd;

var TARGET;
var charts;

function setup() {
    initializeInterface();
    var myCanvas = createCanvas(W, L);
    myCanvas.parent("canvasDiv");

    crowd = new Crowd(CROWD_SIZE);
    TARGET = new p5.Vector();
    setRandomTarget();

    AGE = 0;
    charts = new DrawingChart();
}

function draw() {
    background(100, 100, 100);
    drawTarget();
    drawInfo();
    AGE ++;

    for (robot of crowd.robots) {
        robot.move();
        robot.show();
    }

    if (AGE === LIFESPAN) {
        var generationValues = crowd.evaluate();
        crowd.evolve();
        charts.addGenerationValues(GENERATION, generationValues);
        charts.drawChart();

        AGE = 0;
        GENERATION++;

        if (generationValues.foundTarget >= crowd.size /2) {
            setRandomTarget();
        }
    }
}

function setRandomTarget() {
    TARGET.x = random(20, W-20);
    TARGET.y = random(20, L-20);
}

function drawInfo() {
    fill(250, 250, 250)
    text("Gen. " + GENERATION, 10, 10);
    text("Lifespan. " + LIFESPAN, 10, 20);
    text("Mut. Rate" + MUTATION_RATE + "%", 10, 30);
}

function drawTarget() {
    fill(0, 0, 0);
    ellipse(TARGET.x, TARGET.y, 10, 10);
}

function mouseClicked() {
    if (mouseX > 0 && mouseX < W && mouseY > 0 && mouseY < L) {
        TARGET.x = mouseX;
        TARGET.y = mouseY;
    }
}

function createMaze() {
    var o;
    var res = [];
    var unitX = W / 8;
    var unitY = L / 8;

    //res.push({"x": 0 * unitX, "y": 0 * unitY, "w": 0 * unitX, "h": 0 * unitY})

    res.push({"x": 5 * unitX, "y": 0.6 * unitY, "w": 3 * unitX, "h": 0.4 * unitY})

    res.push({"x": 0 * unitX, "y": 2 * unitY, "w": 1 * unitX, "h": 0.4 * unitY})
    res.push({"x": 2 * unitX, "y": 2 * unitY, "w": 3 * unitX, "h": 0.4 * unitY})
    res.push({"x": 6 * unitX, "y": 2 * unitY, "w": 2 * unitX, "h": 0.4 * unitY})

    res.push({"x": 0 * unitX, "y": 4 * unitY, "w": 4 * unitX, "h": 0.4 * unitY})
    res.push({"x": 5 * unitX, "y": 4 * unitY, "w": 3 * unitX, "h": 0.4 * unitY})

    res.push({"x": 0 * unitX, "y": 6 * unitY, "w": 1.5 * unitX, "h": 0.4 * unitY})
    res.push({"x": 2.5 * unitX, "y": 6 * unitY, "w": 4 * unitX, "h": 0.4 * unitY})

    res.push({"x": 4 * unitX, "y": 0 * unitY, "w": 0.4 * unitX, "h": 3 * unitY})

    res.push({"x": 4.5 * unitX, "y": 6 * unitY, "w": 0.4 * unitX, "h": 3 * unitY})


    return res;
}

function createMazeCross() {
    var o;
    var res = [];
    var unitX = W / 8;
    var unitY = L / 8;

    //res.push({"x": 0 * unitX, "y": 0 * unitY, "w": 0 * unitX, "h": 0 * unitY})

    res.push({"x": 3.8 * unitX, "y": 0   * unitY, "w": 0.6 * unitX, "h": 0.8 * unitY, "color": [250, 0, 0]})
    res.push({"x": 3.8 * unitX, "y": 1.8 * unitY, "w": 0.6 * unitX, "h": 4.6 * unitY, "color": [250, 0, 0]})
    res.push({"x": 3.8 * unitX, "y": 8   * unitY, "w": 0.6 * unitX, "h": - 0.8 * unitY, "color": [250, 0, 0]})

    res.push({"x": 0   * unitX, "y": 3.8 * unitY, "w": 0.8 * unitX, "h": 0.6 * unitY, "color": [250, 0, 0]})
    res.push({"x": 1.8 * unitX, "y": 3.8 * unitY, "w": 4.6 * unitX, "h": 0.6 * unitY, "color": [250, 0, 0]})
    res.push({"x": 8   * unitX, "y": 3.8 * unitY, "w": - 0.8 * unitX, "h":  0.6 * unitY, "color": [250, 0, 0]})

    return res;
}

function createMaze1() {
    var res = [];
    res.push({"x": 0, "y": 60, "w": 250, "h":75});
    res.push({"x": 220, "y": 250, "w": 250, "h":25});
    res.push({"x": 220, "y": 200, "w": 90, "h":70});
    res.push({"x": 80, "y": 190, "w": 20, "h":150});
    res.push({"x": 80, "y": 260, "w": 150, "h":30});
    return res;
}

function createMaze2() {
    var res = [];
    res.push({"x": 0, "y": 100, "w": ( W / 2 ) - 20, "h":25});
    res.push({"x": ( W / 2 ) + 20, "y": 100, "w": ( W / 2 ) - 20, "h":25});
    res.push({"x": 100, "y": 100, "w": 40, "h":100});
    res.push({"x": 100, "y": 240, "w": 40, "h":200});
    res.push({"x": 200, "y": 200, "w": 150, "h":20});
    res.push({"x": 230, "y": 200, "w": 20, "h":250});

    return res;
}
