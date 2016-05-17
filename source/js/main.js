/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var main = function(p) {

    var background;

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


    p.preload = function() {
       p.typeface = p.loadFont("fonts/Akzidenz Grotesk Pro Med Regular.otf");
    };

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
        if ((p.mouseX != lastMouseX || p.mouseY != lastMouseY) && p.dataLoaded == 1) {
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

            var modes = p.generateModesObject(currentDistance, nearestPointsToValue, interpolationRatio);

            p.background(background);
            p.noStroke();
            p.blendMode(p.MULTIPLY);

            // Draw debug text
            // p.drawDebugText(debugString);

            // Draw current suburb title
            p.drawCurrentSuburb(nearestPointsToValue, titleOpacity,p.BLEND,0.1,1);



            p.drawGreenTriangleFix(modes);

            // Draw slider at bottom of window
            p.drawBottomSlider(currentDistance);

            // Draw triangles
            p.drawTransitTriangles(modes);
            p.drawTransitCircles(modes);
            p.drawTransitFigures(modes);
            p.drawTransitArcs(modes);


            // Draw current suburb title
            p.drawCurrentSuburb(nearestPointsToValue, titleOpacity,p.BURN,0.7,1);


            lastMouseY = p.mouseY;
            lastMouseX = p.mouseX;
        }
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
