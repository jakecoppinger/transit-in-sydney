/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var dataProcessing = function(p) {
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

                    // p.suburbsDistancePoints.push({
                    //     label: suburb,
                    //     value: distance
                    // });

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

        var suburbsDistance = p.generateSuburbDistances(data, chosenSuburbs);

        console.log(suburbsDistance);

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

    p.calculateMagnitudeForMode = function(modeStr) {


        var currentMouseDistanceKM = p.mouseX * (p.maxDistance / p.windowWidth);
        // console.log(currentMouseDistanceKM);

        // console.log(currentMouseDistanceKM);

    };


    p.nearestPointsToValue = function(setpoint, data) {
        var belowDifference = 9999999;
        var belowName;

        var aboveDifference = 9999999;
        var aboveName;

        for (var i = 0; i < data.length; i++) {
            var fixedValue = data[i].value;
            var fixedLabel = data[i].label;

            // Above value
            if (fixedValue - setpoint >= 0 && fixedValue - setpoint <= aboveDifference) {
                aboveDifference = fixedValue - setpoint;
                aboveName = fixedLabel;
            }


            // Below value 
            if (setpoint - fixedValue > 0 && setpoint - fixedValue < belowDifference) {
                belowDifference = setpoint - fixedValue;
                belowName = fixedLabel;
            }
        }

        return {
            above: {
                label: aboveName,
                value: aboveDifference
            },
            below: {
                label: belowName,
                value: belowDifference
            }
        };

    };
};
