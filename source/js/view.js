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
                var triangleXPoint = mode.magnitude * p.windowWidth / 2;
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
        p.push();
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
        p.pop();
    };

    p.drawTransitArcs = function(modes) {
        p.push();

        for (var modeName in modes) {
            if (modes.hasOwnProperty(modeName)) {
                var mode = modes[modeName];
                var leftPointPos = {
                    x: mode.magnitude * p.windowWidth,
                    y: mode.yLevel
                };

                p.noFill();
                p.stroke(255, 102, 0);

                // p.beginShape();
                // p.vertex(leftPointPos.x, leftPointPos.y);

                // p.bezierVertex(80, 0, 80, 75, 30, 75);
                // p.bezierVertex(50, 80, 60, 25, 30, 20);
                // p.endShape();

                var triangleXPoint = mode.magnitude * p.windowWidth / 2;
                var circleDiameter = mode.magnitude * p.windowHeight / 3;
                p.line(leftPointPos.x, mode.yLevel - (circleDiameter / 2), triangleXPoint, mode.yLevel);
                p.line(leftPointPos.x, mode.yLevel + (circleDiameter / 2), triangleXPoint, mode.yLevel);

            }
        }
        p.pop();
    };




};
