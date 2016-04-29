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

    // Constant positions
    var topLeft;
    var topRight;
    var bottomLeft;
    var bottomRight;

    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);

        // Defining global colors
        yellow = p.color(222, 207, 34);
        green = p.color(9, 141, 68);
        blue = p.color(0, 153, 202);
        pink = p.color(204, 25, 119);
        orange = p.color(230, 73, 35);
        background = 255;

        // Assign topLeft et al. point objects
        p.assignPositions();
    };

    p.draw = function() {
        // for (var i = 0; i < 500; i += 20) {
        //     p.bezier(p.mouseX - (i / 2.0), 40 + i,
        //      410, 20, 440, 300, 240 - (i / 16.0), 300 + (i / 8.0));
        // }

        var mousePos = new p.Point({
            x: p.mouseX,
            y: p.mouseY
        });

        var xTriangleScaler = 6 / 10;

        var yellowPos = {
            x: p.pointDistance(mousePos, bottomLeft) * xTriangleScaler,
            y: p.windowHeight * (1 / 5)
        };

        var greenPos = {
            x: p.pointDistance(mousePos, bottomRight) * xTriangleScaler,
            y: p.windowHeight * (2 / 5)
        };

        var bluePos = {
            x: p.pointDistance(mousePos, topLeft) * xTriangleScaler,
            y: p.windowHeight * (3 / 5)
        };

        var pinkPos = {
            x: p.pointDistance(mousePos, topRight) * xTriangleScaler,
            y: p.windowHeight * (4 / 5)
        };

        p.background(background);
        p.noStroke();
        p.blendMode(p.MULTIPLY);

        p.drawTransitTriangle(blue, bluePos);
        p.drawTransitTriangle(pink, pinkPos);
        p.drawTransitTriangle(yellow, yellowPos);
        p.drawTransitTriangle(orange, greenPos);

        bluePos.x += 50;
        p.drawCircle(blue, bluePos, 100);


        p.fill(0);
        p.textSize(p.windowHeight / 40);
        var debugTextIndent = p.windowHeight / 20;
        
        var debugString = "";


        p.text("hello\nworld", debugTextIndent, debugTextIndent);



    };


    p.windowResized = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        p.assignPositions();
    };

    p.mouseMoved = function() {
        var color = (p.mouseY / p.windowWidth) * 255;
        p.stroke(color);
    };

    p.assignPositions = function() {
        topLeft = new p.Point({
            x: 0,
            y: 0
        });

        topRight = new p.Point({
            x: p.windowWidth,
            y: 0
        });

        bottomLeft = new p.Point({
            x: 0,
            y: p.windowHeight
        });

        bottomRight = new p.Point({
            x: p.windowWidth,
            y: p.windowHeight
        });

    };

};
