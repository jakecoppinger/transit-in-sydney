/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/


// Code for supporting touch devices
document.addEventListener('touchstart', function(e) {
    xStart = e.touches[0].screenX;
    yStart = e.touches[0].screenY;
});

document.addEventListener('touchmove', function(e) {
    e.preventDefault();
});


var main = function(p) {
    // This is so the frame will draw on data load
    var lastMouseY = -1;
    var lastMouseX = -1;

    // Defining "global" variables.
    // These are populated in p.parseTransitData()
    p.absoluteSuburbs = {};
    p.percentageSuburb = {};
    p.suburbsDistance = {};
    p.maxDistance = {};
    p.dataLoaded = 0;

    var redrawCanvas = 0;

    // = "Akzidenz-Grotesk Pro"; // Akzidenz-Grotesk Pro Medium

    p.globalDrawVals = {
        triangleSizeVsArc: 1 / 4
    };

    p.shortenedSuburbsHash = {
        "Alexandria - Beaconsfield": "Alexandria",
        "The Rocks - Millers Point - Dawes Point": "The Rocks",
        "Erskineville - Eveleigh": "Erskineville",
        "Centennial Park - Moore Park": "Moore Park",
        "Glebe - Forest Lodge": "Glebe",
        "Waterloo - Zetland": "Waterloo"
    };

    p.shorternedModesHash = {
        "Walked only": "Walk",
        "Car - as driver": "Car"
    };
    p.images = {};

    p.preload = function() {
        p.typeface = p.loadFont("fonts/Akzidenz Grotesk Pro Med Regular.otf");
        p.images = {
            "Walk": p.loadImage("images/walk.svg"),
            "Bus": p.loadImage("images/bus.svg"),
            "Train": p.loadImage("images/train.svg"),
            "Car": p.loadImage("images/car.svg")
        };
    };

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // Defining global colors
        p.yellow = p.color(222, 207, 34);
        p.green = p.color(9, 141, 68);
        p.blue = p.color(0, 153, 202);
        p.pink = p.color(204, 25, 119);
        p.orange = p.color(230, 73, 35);

        // Send off AJAX request to get the sydney transport data
        var dataUrl = "data/city_of_sydney_transport_data_2011.json";
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
    };

    p.draw = function() {
        // Only draw to screen when mouse is moving
        if ((p.touchX != lastMouseX || p.touchY != lastMouseY || p.redrawCanvas) && p.dataLoaded == 1) {
            var currentDistance = p.currentMouseDistanceKM();
            var nearestPointsToValue = p.nearestPointsToValue(currentDistance, p.suburbsDistance);

            var above = (nearestPointsToValue.below.kmFromSuburb);
            var below = (nearestPointsToValue.above.kmFromSuburb);
            var betweenSum = above + below;

            // Where 1 is at the suburb above, 0 is below
            var interpolationRatio = nearestPointsToValue.below.kmFromSuburb / betweenSum;

            // Where 1 is full opacity!
            var titleOpacity = Math.abs(interpolationRatio - 0.5) * 2;

            var debugString = "";
            debugString += "fps: " + p.frameRate() + "\n";
            debugString += p.prettyStr(nearestPointsToValue);

            var globalDrawVals = p.updateGlobalDrawVals(modes);
            var modes = p.generateModesObject(globalDrawVals, currentDistance, nearestPointsToValue, interpolationRatio);

            p.background(255);
            p.noStroke();
            p.blendMode(p.MULTIPLY);

            // Draw debug text
            // p.drawDebugText(debugString);

            // Draw current suburb title
            p.drawCurrentSuburb(nearestPointsToValue, titleOpacity, p.BLEND, 0.3, 1);

            // Draw sliders 
            p.drawBottomSlider(currentDistance);
            p.drawVerticalSlider(globalDrawVals, currentDistance);

            // Draw triangles
            p.drawTransitTriangles(modes);
            p.drawTransitCircles(modes, globalDrawVals);
            p.drawTransitArcs(modes, globalDrawVals);

            // Draw current suburb title
            p.drawCurrentSuburb(nearestPointsToValue, titleOpacity, p.BURN, 0.5, 1);

            // Draw percentage and count for each mode
            p.drawTransitFigures(modes, globalDrawVals);

            // Draw label for each mode
            p.drawModeLabels(modes);

            // Draw signiture
            p.drawJakeCoppinger();

            lastMouseY = p.touchY;
            lastMouseX = p.touchX;
            redrawCanvas = 0;
        }
    };


    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.redrawCanvas = 1;

    };

    p.mouseMoved = function() {

    };

    p.updateGlobalDrawVals = function(modes) {
        return {
            circleDiameterRatio: p.windowHeight / 1.6,
            triangleSizeVsArc: 1 / 4,
            percentageCountRatio: p.mouseY / p.windowHeight
        };
    };

    p.prettyStr = function(data) {
        return JSON.stringify(data, null, 2);
    };
};
