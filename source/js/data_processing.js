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

        p.absoluteSuburbs = {};
        p.percentageSuburbs = {};
        p.suburbsDistance = {};

        var distanceList = [];

        var absoluteYearKey = "2011";
        var percentageYearKey = absoluteYearKey + "%";

        for (var suburb in data) {
            if (data.hasOwnProperty(suburb)) {
                if (chosenSuburbs.indexOf(suburb) != -1) {
                    p.absoluteSuburbs[suburb] = {};
                    p.percentageSuburbs[suburb] = {};
                    p.suburbsDistance[suburb] = {};

                    for (var i = 0; i < chosenModes.length; i++) {
                        mode = chosenModes[i];
                        var percentage = data[suburb][mode][percentageYearKey];
                        var absolute = data[suburb][mode][absoluteYearKey];
                        var distance = parseFloat(data[suburb]["Distance from CBD"]);

                        p.absoluteSuburbs[suburb][mode] = absolute;
                        p.percentageSuburbs[suburb][mode] = percentage;
                        p.suburbsDistance[suburb] = distance;
                        distanceList.push(distance);
                    }

                }

            }
        }

        p.maxDistance = Math.max.apply(Math, distanceList);
        p.dataLoaded = 1;
        console.log("We have our data!");
    };


    p.calculateMagnitudeForMode = function(modeStr) {


        var currentMouseDistanceKM = p.mouseX * (p.maxDistance / p.windowWidth);
        console.log(currentMouseDistanceKM);



    };
};