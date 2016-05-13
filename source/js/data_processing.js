/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var dataProcessing = function(p) {


    p.generateModesObject = function() {

        var mousePos = new p.Point({
            x: p.mouseX,
            y: p.mouseY
        });
        var windowCorners = p.windowCorners();

        var mouseDiagonals = {
            "posSlope1": p.percentageToWindowCorner(mousePos, windowCorners.bottomLeft,
                windowCorners.topRight),
            "posSlope2": p.percentageToWindowCorner(mousePos, windowCorners.topRight,
                windowCorners.bottomLeft),
            "negSlope1": p.percentageToWindowCorner(mousePos, windowCorners.topLeft,
                windowCorners.bottomRight),
            "negSlope2": p.percentageToWindowCorner(mousePos, windowCorners.bottomRight,
                windowCorners.topLeft)
        };


        var modes = {
            "Walking": {
                color: p.yellow,
                magnitude: mouseDiagonals.posSlope1,
                yLevel: p.windowHeight * (1 / 5)
            },
            "Bus": {
                color: p.green, //orange,
                magnitude: mouseDiagonals.posSlope2,
                yLevel: p.windowHeight * (2 / 5)
            },
            "Train": {
                color: p.blue,
                magnitude: mouseDiagonals.negSlope1,
                yLevel: p.windowHeight * (3 / 5)
            },
            "Car": {
                color: p.pink,
                magnitude: mouseDiagonals.negSlope2,
                yLevel: p.windowHeight * (4 / 5)
            }
        };



        var currentDistance = p.currentMouseDistanceKM();
        var nps = p.nearestPointsToValue(currentDistance, p.suburbsDistance);




        var above = (nps.below.kmFromSuburb);
        var below = (nps.above.kmFromSuburb);
        var betweenSum = above + below;

        var ratio = nps.below.kmFromSuburb / betweenSum;

        var belowSuburbWeighting = 1 - ratio;
        var aboveSuburbWeighting = ratio;

        modes.Walking.magnitude = ratio;
        modes.Bus.magnitude = 1-ratio;


        var titleOpacity = 1 - Math.abs(ratio - (1-ratio));

        // p.drawCurrentSuburbs(nps,titleOpacity);

        // console.log(titleOpacity);
        // console.log(nps.below.suburb + ": " + belowSuburbWeighting + ", " + nps.above.suburb + ": " + aboveSuburbWeighting);











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

        var absoluteSuburbs = {};
        var percentageSuburbs = {};
        var suburbsDistancePoints = [];

        var absoluteYearKey = "2011";
        var percentageYearKey = absoluteYearKey + "%";

        var distanceList = [];
        for (var suburb in data) {
            if (data.hasOwnProperty(suburb)) {
                if (chosenSuburbs.indexOf(suburb) != -1) {

                    var distance = parseFloat(data[suburb]["Distance from CBD"]);

                    absoluteSuburbs[suburb] = {};
                    percentageSuburbs[suburb] = {};

                    distanceList.push(distance);

                    for (var i = 0; i < chosenModes.length; i++) {
                        mode = chosenModes[i];
                        var percentage = data[suburb][mode][percentageYearKey];
                        var absolute = data[suburb][mode][absoluteYearKey];

                        absoluteSuburbs[suburb][mode] = absolute;
                        percentageSuburbs[suburb][mode] = percentage;
                    }
                }
            }
        }

        p.suburbsDistance = p.generateSuburbDistances(data, chosenSuburbs);

        p.maxDistance = Math.max.apply(Math, distanceList);
        p.dataLoaded = 1;

        console.log("We have our data!");
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
