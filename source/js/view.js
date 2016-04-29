/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var view = function(p) {
    p.drawTransitTriangle = function(color, tip) {
        p.push();
        p.fill(color);
        p.triangle(0, 0, 0, p.windowHeight, tip.x, tip.y);
        p.pop();
    };

    p.drawCircle = function(color, position, diameter) {
        p.push();
        p.fill(color);
        p.ellipse(position.x, position.y, diameter, diameter);
        p.pop();
    };


    p.drawTransitTriangles = function(modes) {
        // Draw triangles
        for (var modeName in modes) {
            if (modes.hasOwnProperty(modeName)) {
                var mode = modes[modeName];
                var triangleXPoint = mode.magnitude * p.windowWidth;
                p.push();
                p.fill(mode.color);
                p.triangle(0, 0, 0, p.windowHeight, triangleXPoint, mode.yLevel);
                p.pop();
            }
        }
    };

    p.drawDebugText = function(s) {
        p.push();
        p.fill(0);
        p.textSize(p.windowHeight / 40);
        var debugTextIndent = p.windowHeight / 20;
        var debugString = "";
        debugString += "fps: " + p.frameRate() + "\n";
        p.text(debugString, debugTextIndent, debugTextIndent);
        p.pop();
    };

    p.drawTransitCircles = function(modes) {
        for (var modeName in modes) {
            if (modes.hasOwnProperty(modeName)) {
                var mode = modes[modeName];
                var circlePosition = {
                    x: mode.magnitude * p.windowWidth,
                    y: mode.yLevel
                };
                var circleDiameter = mode.magnitude * p.windowHeight / 3;
                p.drawCircle(mode.color, circlePosition, circleDiameter);
            }
        }
    };

};
