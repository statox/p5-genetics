function initializeInterface() {
    document.getElementById("inputLifespan").value = LIFESPAN;
    document.getElementById("inputMutationRate").value = MUTATION_RATE;
    document.getElementById("inputHistorySize").value = HISTORY_SIZE;
}

function setLifespan() {
    LIFESPAN = document.getElementById("inputLifespan").value;
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
