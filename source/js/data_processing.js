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
        var suburbsDistance = {};

        var absoluteYearKey = "2011";
        var percentageYearKey = absoluteYearKey + "%";

        for (var suburb in data) {
            if (data.hasOwnProperty(suburb)) {
                if (chosenSuburbs.indexOf(suburb) != -1) {
                    absoluteSuburbs[suburb] = {};
                    percentageSuburbs[suburb] = {};
                    suburbsDistance[suburb] = {};

                    for (var i = 0; i < chosenModes.length; i++) {
                        mode = chosenModes[i];
                        var percentage = data[suburb][mode][percentageYearKey];
                        var absolute = data[suburb][mode][absoluteYearKey];
                        var distance = data[suburb][mode][distance];

                        absoluteSuburbs[suburb][mode] = absolute;
                        percentageSuburbs[suburb][mode] = percentage;
                        suburbsDistance[suburb] = distance;
                    }

                }

            }
        }
        console.log(absoluteSuburbs);
        console.log("We have our data!");
    };
};