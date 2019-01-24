function DrawingChart() {
    this.labels = [];
    this.avg = [];
    this.max = [];
    this.min = [];
    this.crashed = [];
    this.foundTarget = [];

    this.drawChart = function() {
        this.drawChartDistances();
        this.drawChartCrash();
    }

    this.drawChartDistances = function() {
        var ctxDistances = document.getElementById("distancesChart");
        ctxDistances.height = 400;
        ctxDistances.width = 1500;

        var lineChart = new Chart(ctxDistances, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        borderColor: "#3e95cd",
                        label: "Averages",
                        data: this.avg
                    },
                    /*
                     *{
                     *    borderColor: "#8e5ea2",
                     *    label: "Max",
                     *    data: this.max
                     *},
                     */
                    {
                        borderColor: "#3cba9f",
                        label: "Min",
                        data: this.min
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Distance to the target'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Generations'
                        }
                    }]
                }
            }
        })
    }

    this.drawChartCrash = function() {
        var ctxDistances = document.getElementById("crashChart");
        ctxDistances.height = 400;
        ctxDistances.width = 1500;

        var lineChart = new Chart(ctxDistances, {
            type: 'line',
            data: {
                labels: this.labels,
                datasets: [
                    {
                        borderColor: "#ff0000",
                        label: "Crashed",
                        data: this.crashed
                    },
                    {
                        borderColor: "#33cc33",
                        label: "Reached the target",
                        data: this.foundTarget
                    }
                ]
            },
            options: {
                scales: {
                    yAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Number of robots'
                        }
                    }],
                    xAxes: [{
                        scaleLabel: {
                            display: true,
                            labelString: 'Generations'
                        }
                    }]
                }
            }
        })
    }

    window.onload =  this.drawChart();
}

DrawingChart.prototype.addGenerationValues = function(label, values) {
    this.labels.push(label);
    while (this.labels.length >= HISTORY_SIZE) {
        this.labels.splice(0, 1);
    }

    if (values.avg) {
        this.avg.push(values.avg);
    } else {
        this.avg.push(0)
    }
    while (this.avg.length >= HISTORY_SIZE) {
        this.avg.splice(0, 1);
    }

    if (values.max) {
        this.max.push(values.max);
    } else {
        this.max.push(0)
    }
    while (this.max.length >= HISTORY_SIZE) {
        this.max.splice(0, 1);
    }

    if (values.min) {
        this.min.push(values.min);
    } else {
        this.min.push(0)
    }
    while (this.min.length >= HISTORY_SIZE) {
        this.min.splice(0, 1);
    }

    this.crashed.push(values.crashed);
    while (this.crashed.length >= HISTORY_SIZE) {
        this.crashed.splice(0, 1);
    }

    this.foundTarget.push(values.foundTarget);
    while (this.foundTarget.length >= HISTORY_SIZE) {
        this.foundTarget.splice(0, 1);
    }
}
