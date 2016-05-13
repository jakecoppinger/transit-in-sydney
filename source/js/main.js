/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var main = function(p) {
    var purple;
    var blue;
    var green;
    var yellow;
    var background;
    var lastMouseY;
    var lastMouseX;

    // Defining "global" variables.
    // These are populated in p.parseTransitData()
    p.absoluteSuburbs = {};
    p.percentageSuburb = {};
    p.suburbsDistance = {};
    p.maxDistance = {};

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // Defining global colors
        yellow = p.color(222, 207, 34);
        green = p.color(9, 141, 68);
        blue = p.color(0, 153, 202);
        pink = p.color(204, 25, 119);
        orange = p.color(230, 73, 35);
        background = 255;

        // Send off AJAX request to get the sydney transport data
        var dataUrl = "/data/city_of_sydney_transport_data_2011.json";
        var xmlhttp = new XMLHttpRequest();
        var url = dataUrl;

        xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
                var data = JSON.parse(xmlhttp.responseText);
                p.parseTransitData(data);
            }
        };

        xmlhttp.open("GET", url, true);
        xmlhttp.send();

        var nearestPoints = p.nearestPointsToValue(1.4, [{
            label: "One",
            value: 1
        }, {
            label: "Two",
            value: 2
        }, {
            label: "Three",
            value: 3
        }]);

        // p.prettyPrint(nearestPoints);



    };

    p.draw = function() {
        // Only draw to screen when mouse is moving
        if (p.mouseX != lastMouseX || p.mouseY != lastMouseY && p.dataLoaded == 1) {
            //console.log("Drawing!");

            var mousePos = new p.Point({
                x: p.mouseX,
                y: p.mouseY
            });

            // var yellowMagnitude = p.calculateMagnitudeForMode("Walked only");


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
                "Yellow": {
                    color: yellow,
                    magnitude: mouseDiagonals.posSlope1,
                    yLevel: p.windowHeight * (1 / 5)
                },
                "Green": {
                    color: green, //orange,
                    magnitude: mouseDiagonals.posSlope2,
                    yLevel: p.windowHeight * (2 / 5)
                },
                "Blue": {
                    color: blue,
                    magnitude: mouseDiagonals.negSlope1,
                    yLevel: p.windowHeight * (3 / 5)
                },
                "Pink": {
                    color: pink,
                    magnitude: mouseDiagonals.negSlope2,
                    yLevel: p.windowHeight * (4 / 5)
                }
            };

            p.background(background);
            p.noStroke();
            p.blendMode(p.MULTIPLY);

            // Draw triangles
            p.drawTransitTriangles(modes);
            p.drawTransitCircles(modes);
            p.drawTransitArcs(modes);


            var currentDistance = p.currentMouseDistanceKM();
            var nps = p.nearestPointsToValue(currentDistance, p.suburbsDistance);
            p.drawCurrentSuburbs(nps);


            var above = (nps.below.kmFromSuburb);
            var below = (nps.above.kmFromSuburb);
            var betweenSum = above + below;

            var ratio = nps.below.kmFromSuburb / betweenSum;

            var belowSuburbWeighting = 1-ratio;
            var aboveSuburbWeighting = ratio;
            console.log(nps.below.suburb + ": " + belowSuburbWeighting + ", " + nps.above.suburb + ": " + aboveSuburbWeighting);

            var debugString = "";
            debugString += "fps: " + p.frameRate() + "\n";
            debugString += p.prettyStr(nps);
            p.drawDebugText(debugString);


        }
        lastMouseY = p.mouseY;
        lastMouseX = p.mouseX;
    };


    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.mouseMoved = function() {

    };

    p.prettyStr = function(data) {
        return JSON.stringify(data, null, 2);
    };
};
