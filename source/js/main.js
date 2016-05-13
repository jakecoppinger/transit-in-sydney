/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var main = function(p) {

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
        p.yellow = p.color(222, 207, 34);
        p.green = p.color(9, 141, 68);
        p.blue = p.color(0, 153, 202);
        p.pink = p.color(204, 25, 119);
        p.orange = p.color(230, 73, 35);

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
            // var yellowMagnitude = p.calculateMagnitudeForMode("Walked only");            

            var modes = p.generateModesObject();

            p.background(background);
            p.noStroke();
            p.blendMode(p.MULTIPLY);

            // Draw triangles
            p.drawTransitTriangles(modes);
            p.drawTransitCircles(modes);
            p.drawTransitArcs(modes);


            var currentDistance = p.currentMouseDistanceKM();
            var nearestPointsToValue = p.nearestPointsToValue(currentDistance, p.suburbsDistance);

            var above = (nearestPointsToValue.below.kmFromSuburb);
            var below = (nearestPointsToValue.above.kmFromSuburb);
            var betweenSum = above + below;

            var ratio = nearestPointsToValue.below.kmFromSuburb / betweenSum;


            var titleOpacity = 1 - Math.abs(ratio - (1 - ratio));

            p.drawCurrentSuburbs(nearestPointsToValue, titleOpacity);


            var debugString = "";
            debugString += "fps: " + p.frameRate() + "\n";
            debugString += p.prettyStr(nearestPointsToValue);
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
