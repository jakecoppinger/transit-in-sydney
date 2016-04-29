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
    // Constant positions
    // var topLeft;
    // var topRight;
    // var bottomLeft;
    // var bottomRight;

    p.setup = function() {
        // p.frameRate(10);
        p.createCanvas(p.windowWidth, p.windowHeight);

        // Defining global colors
        yellow = p.color(222, 207, 34);
        green = p.color(9, 141, 68);
        blue = p.color(0, 153, 202);
        pink = p.color(204, 25, 119);
        orange = p.color(230, 73, 35);
        background = 255;
    };

    p.draw = function() {
        // Only draw to screen when mouse is moving
        if (p.mouseX != lastMouseX || p.mouseY != lastMouseY) {
            console.log("Drawing");

            var mousePos = new p.Point({
                x: p.mouseX,
                y: p.mouseY
            });

            var xTriangleScaler = 6 / 10;

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
                    color: orange,
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
            p.drawDebugText(modes);
            // p.drawTransitCircles(modes);
        }
        lastMouseY = p.mouseY;
        lastMouseX = p.mouseX;
    };


    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    };

    p.mouseMoved = function() {



    };
};
