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
        // p.createCanvas(720, 400);
        //p.stroke((p.mouseX / p.windowWidth) * 255);

        //console.log((p.mouseX / p.windowWidth) * 255);

        p.noFill();

        // Defining global colors
        yellow = p.color(222, 207, 34);
        green = p.color(9, 141, 68);
        blue = p.color(0, 153, 202);
        pink = p.color(204, 25, 119);

        p.assignPositions();

        background = 255;
    };

    p.draw = function() {


        // for (var i = 0; i < 500; i += 20) {
        //     p.bezier(p.mouseX - (i / 2.0), 40 + i, 410, 20, 440, 300, 240 - (i / 16.0), 300 + (i / 8.0));
        // }

        var mousePos = new p.Point({
            x: p.mouseX / p.windowWidth,
            y: p.mouseY / p.windowHeight
        });

        var mode1 = new p.Point({
            x: p.mouseX,
            y: p.windowHeight / 3
        });

        var mode2 = new p.Point({
            x: p.mouseX,
            y: p.windowHeight * (2 / 3)
        });

        // mousePos.print();
        // console.log("x:" + mousePos.x + ", y: " + mousePos.yl);

        p.background(background);
        p.noStroke();
        p.blendMode(p.MULTIPLY);
        p.fill(blue);
        p.triangle(0, 0, 0, p.windowHeight, mode1.x, mode1.y);
        p.fill(pink);
        p.triangle(0, 0, 0, p.windowHeight, mode2.x, mode2.y);
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
