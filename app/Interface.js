function initializeInterface() {
    // Set the values of the different inputs on the page based on the default values
    document.getElementById("inputLifespan").value = LIFESPAN;
    document.getElementById("inputMutationRate").value = MUTATION_RATE;
    document.getElementById("inputHistorySize").value = HISTORY_SIZE;
    document.getElementById("inputPopulationSize").value = CROWD_SIZE;
    document.getElementById("inputRobotsObjective").value = ROBOTS_IN_OBJECTIVE;
    document.getElementById("inputRobotSize").value = ROBOT_SIZE;

     /*
      *Collapse mechanism of buttons
      */
    // Intro
    $("#intro-content").on("hide.bs.collapse", (e) => {
        $("#btn-collapse-intro").removeClass("fa-chevron-right")
        $("#btn-collapse-intro").addClass("fa-chevron-down")
    });
    $("#intro-content").on("show.bs.collapse", (e) => {
        $("#btn-collapse-intro").removeClass("fa-chevron-down")
        $("#btn-collapse-intro").addClass("fa-chevron-right")
    });
    // Settings
    $("#settings-content").on("hide.bs.collapse", (e) => {
        $("#btn-settings-intro").removeClass("fa-chevron-right")
        $("#btn-settings-intro").addClass("fa-chevron-down")
    });
    $("#settings-content").on("show.bs.collapse", (e) => {
        $("#btn-settings-intro").removeClass("fa-chevron-down")
        $("#btn-settings-intro").addClass("fa-chevron-right")
    });
    // Simulation
    $("#simulation-content").on("hide.bs.collapse", (e) => {
        $("#btn-simulation-intro").removeClass("fa-chevron-right")
        $("#btn-simulation-intro").addClass("fa-chevron-down")
    });
    $("#simulation-content").on("show.bs.collapse", (e) => {
        $("#btn-simulation-intro").removeClass("fa-chevron-down")
        $("#btn-simulation-intro").addClass("fa-chevron-right")
    });
    // Charts
    $("#charts-content").on("hide.bs.collapse", (e) => {
        $("#btn-charts-intro").removeClass("fa-chevron-right")
        $("#btn-charts-intro").addClass("fa-chevron-down")
    });
    $("#charts-content").on("show.bs.collapse", (e) => {
        $("#btn-charts-intro").removeClass("fa-chevron-down")
        $("#btn-charts-intro").addClass("fa-chevron-right")
    });
}

function setLifespan() {
    var newValue = document.getElementById("inputLifespan").value;
    LIFESPAN = Math.max(newValue, 1);
    resetSimulation();
}

function setPopulationSize() {
    var newValue = document.getElementById("inputPopulationSize").value;
    CROWD_SIZE = Math.max(newValue, 1);
    ROBOTS_IN_OBJECTIVE = CROWD_SIZE / 2;
    resetSimulation();
}

function setRobotSize() {
    var newValue = document.getElementById("inputRobotSize").value;
    var errorMessage = $("#errorRobotSize");

    if (newValue >= 0) {
        ROBOT_SIZE = Number.parseInt(newValue);
        errorMessage.addClass("hidden");
        resetSimulation();
    } else {
        errorMessage.removeClass("hidden");
    }
}

function setRobotsInObjective() {
    var newValue = document.getElementById("inputRobotsObjective").value;
    var errorMessage = $("#errorRobotsObjective");

    if (newValue >= 0) {
        ROBOTS_IN_OBJECTIVE = newValue;
        errorMessage.addClass("hidden");
    } else {
        errorMessage.removeClass("hidden");
    }
}

function setMutationRate() {
    var newValue = document.getElementById("inputMutationRate").value;
    var errorMessage = $("#errorMutationRate");

    if (newValue >= 0 && newValue <= 100) {
        MUTATION_RATE = newValue;
        errorMessage.addClass("hidden");
    } else {
        errorMessage.removeClass("hidden");
    }
}

function setHistorySize() {
    var newValue = document.getElementById("inputHistorySize").value;
    var errorMessage = $("#errorHistorySize");

    if (newValue >= 0) {
        HISTORY_SIZE = newValue + 2;
        errorMessage.addClass("hidden");
    } else {
        errorMessage.removeClass("hidden");
    }
}
