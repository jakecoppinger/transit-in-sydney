/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var dataProcessing = function(p) {

    p.generateModesObject = function(currentDistance, nearestPointsToValue, interpolationRatio) {

        var mousePos = new p.Point({
            x: p.mouseX,
            y: p.mouseY
        });

        // var windowCorners = p.windowCorners();

        // var mouseDiagonals = {
        //     "posSlope1": p.percentageToWindowCorner(mousePos, windowCorners.bottomLeft,
        //         windowCorners.topRight),
        //     "posSlope2": p.percentageToWindowCorner(mousePos, windowCorners.topRight,
        //         windowCorners.bottomLeft),
        //     "negSlope1": p.percentageToWindowCorner(mousePos, windowCorners.topLeft,
        //         windowCorners.bottomRight),
        //     "negSlope2": p.percentageToWindowCorner(mousePos, windowCorners.bottomRight,
        //         windowCorners.topLeft)
        // };

        var modes = {
            "Walked only": {
                color: p.yellow,
                // magnitude: mouseDiagonals.posSlope1,
                yLevel: p.windowHeight * (1 / 5)
            },
            "Bus": {
                color: p.green, //orange,
                //magnitude: mouseDiagonals.posSlope2,
                yLevel: p.windowHeight * (2 / 5)
            },
            "Train": {
                color: p.blue,
                //magnitude: mouseDiagonals.negSlope1,
                yLevel: p.windowHeight * (3 / 5)
            },
            "Car - as driver": {
                color: p.pink,
                //magnitude: mouseDiagonals.negSlope2,
                yLevel: p.windowHeight * (4 / 5)
            }
        };

        for (var mode in modes) {
            if (modes.hasOwnProperty(mode)) {

                var belowPercentage = 1 - interpolationRatio;
                var abovePercentage = interpolationRatio;

                var belowSuburb = nearestPointsToValue.below.suburb;
                var aboveSuburb = nearestPointsToValue.above.suburb;

                var belowModeCount = p.suburbModeCounts[belowSuburb][mode];

                var aboveModeCount;
                var aboveModePercentage;


                // If we're not past the end of the page
                // (only happens when resizing, weird things...)
                if(aboveSuburb) {
                    aboveModeCount = p.suburbModeCounts[aboveSuburb][mode];
                    aboveModePercentage= p.suburbModePercentages[aboveSuburb][mode];
                }  else {
                    aboveModeCount = 0;
                    aboveModePercentage = 0;
                }

                var belowModePercentage = p.suburbModePercentages[belowSuburb][mode];
                var percentageCountRatio = mousePos.y / p.windowHeight;

                // Here's the magic maths!
                var interpolatedPercentage = (belowPercentage * belowModePercentage + abovePercentage * aboveModePercentage);
                var interpolatedCount = (belowPercentage * belowModeCount + abovePercentage * aboveModeCount);

                var percentageMagnitude = interpolatedPercentage / p.maxPercentage;
                var countMagnitude = interpolatedCount / p.maxCount;

                var magnitude = (percentageCountRatio * percentageMagnitude) + ((1 - percentageCountRatio) * countMagnitude);

                modes[mode].interpolatedPercentage = percentageMagnitude;
                modes[mode].interpolatedCount = interpolatedCount;

                modes[mode].percentageRatio = percentageCountRatio;
                modes[mode].magnitude = magnitude;
            }
        }

        return modes;
    };

    p.parseTransitData = function(data) {
        var chosenSuburbs = ["Sydney",
            "Haymarket",
            "Darlinghurst",
            "Ultimo",
            "Woolloomooloo",
            "Pyrmont",
            "Surry Hills",
            "Kings Cross",
            "Chippendale",
            "The Rocks - Millers Point - Dawes Point",
            "Potts Point",
            "Elizabeth Bay",
            "Glebe - Forest Lodge",
            "Rushcutters Bay",
            "Redfern",
            "Darlington",
            "Paddington",
            "Rosebery",
            "Camperdown",
            "Waterloo - Zetland",
            "Green Square",
            "Centennial Park - Moore Park",
            "Erskineville - Eveleigh",
            "Newtown",
            "Alexandria - Beaconsfield"
        ];

        var chosenModes = [
            "Car - as driver",
            "Bus",
            "Train",
            "Walked only"
        ];

        p.suburbModeCounts = {};
        p.suburbModePercentages = {};

        p.maxPercentage = 0;
        p.maxCount = 0;

        var suburbsDistancePoints = [];
        var absoluteYearKey = "2011";
        var percentageYearKey = absoluteYearKey + "%";

        var distanceList = [];
        for (var suburb in data) {
            if (data.hasOwnProperty(suburb)) {
                if (chosenSuburbs.indexOf(suburb) != -1) {

                    var distance = parseFloat(data[suburb]["Distance from CBD"]);

                    p.suburbModeCounts[suburb] = {};
                    p.suburbModePercentages[suburb] = {};

                    distanceList.push(distance);

                    for (var i = 0; i < chosenModes.length; i++) {
                        mode = chosenModes[i];
                        var percentage = parseFloat(data[suburb][mode][percentageYearKey]) / 100;
                        var absolute = parseFloat(data[suburb][mode][absoluteYearKey]);

                        p.suburbModeCounts[suburb][mode] = absolute;
                        p.suburbModePercentages[suburb][mode] = percentage;

                        if (percentage > p.maxPercentage) {
                            p.maxPercentage = percentage;
                        }
                        if (absolute > p.maxCount) {
                            p.maxCount = absolute;
                        }

                    }
                }
            }
        }

        p.suburbsDistance = p.generateSuburbDistances(data, chosenSuburbs);

        p.maxDistance = Math.max.apply(Math, distanceList);
        p.dataLoaded = 1;

        console.log("JSON data is loaded and parsed.");


        console.log("Max count of any suburb mode: " + p.maxCount);
        console.log("Max percentage of any suburb mode: " + p.maxPercentage);

    };

    p.generateSuburbDistances = function(data, chosenSuburbs) {
        var suburbDistances = [];
        for (var suburb in data) {
            if (data.hasOwnProperty(suburb)) {
                if (chosenSuburbs.indexOf(suburb) != -1) {
                    var distance = parseFloat(data[suburb]["Distance from CBD"]);
                    suburbDistances.push([suburb, distance]);
                }
            }
        }

        suburbDistances.sort(function(a, b) {
            return a[1] - b[1];
        });

        return suburbDistances;
    };

    p.currentMouseDistanceKM = function() {
        return p.mouseX * (p.maxDistance / p.windowWidth);
    };


    p.prettyPrint = function(data) {
        console.log(JSON.stringify(data, null, 2));
    };

    p.nearestPointsToValue = function(setpoint, data) {
        var belowDifference = 9999999;
        var belowName;

        var aboveDifference = 9999999;
        var aboveName;

        for (var i = 0; i < data.length; i++) {
            var fixedValue = parseFloat((data[i])[1]);
            var fixedLabel = (data[i])[0];

            var aboveSetpoint = fixedValue - setpoint >= 0;

            // Above value
            if (fixedValue - setpoint > 0 && fixedValue - setpoint < aboveDifference) {
                aboveDifference = fixedValue - setpoint;
                aboveName = fixedLabel;
            }


            // Below value 
            if (setpoint - fixedValue >= 0 && setpoint - fixedValue <= belowDifference) {
                belowDifference = setpoint - fixedValue;
                belowName = fixedLabel;
            }
        }

        return {
            above: {
                suburb: aboveName,
                kmFromSuburb: aboveDifference
            },
            below: {
                suburb: belowName,
                kmFromSuburb: belowDifference
            }
        };

    };
};
