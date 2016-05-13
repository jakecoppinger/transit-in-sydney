/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var view = function(p) {

    p.drawCurrentSuburb = function(nearestPoints, titleOpacity) {
        if (nearestPoints.above.suburb) {
            p.push();

            var color = (1 - titleOpacity) * 255;
            p.fill(color);

            var theValue;
            var theSuburb;

            if (parseFloat(nearestPoints.above.kmFromSuburb) <= parseFloat(nearestPoints.below.kmFromSuburb)) {
                theValue = nearestPoints.above.kmFromSuburb;
                theSuburb = nearestPoints.above.suburb;
            } else {
                theValue = nearestPoints.below.kmFromSuburb;
                theSuburb = nearestPoints.below.suburb;
            }

            var s = theSuburb;
            p.textSize(p.windowHeight / 9);
            var textIndent = p.windowHeight / 3;

            p.text(s, textIndent, textIndent);

            p.pop();
        }
    };

    p.drawTransitTriangle = function(color, tip) {
        p.push();
        p.fill(color);
        p.triangle(0, 0, 0, p.windowHeight, tip.x, tip.y);
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
        p.text(s, debugTextIndent, debugTextIndent);
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

                var controlLength = p.windowWidth / 10;

                var mode = modes[modeName];
                var circleCenter = {
                    x: mode.magnitude * p.windowWidth,
                    y: mode.yLevel
                };

                var triangleXPoint = mode.magnitude * p.windowWidth / 2;
                var circleDiameter = mode.magnitude * p.windowHeight / 3;

                var startPoint = {
                    x: triangleXPoint,
                    y: mode.yLevel
                };
                var topEndPoint = {
                    x: circleCenter.x,
                    y: mode.yLevel - (circleDiameter / 2)
                };
                var bottomEndPoint = {
                    x: circleCenter.x,
                    y: mode.yLevel + (circleDiameter / 2)
                };

                var top = {
                    startControlP: {
                        x: triangleXPoint + controlLength,
                        y: mode.yLevel - 50
                    },
                    endControlP: {
                        x: circleCenter.x - controlLength, // fiddle here
                        y: mode.yLevel - (circleDiameter / 2)
                    }
                };

                var bottom = {
                    startControlP: {
                        x: triangleXPoint + controlLength,
                        y: mode.yLevel + 50
                    },
                    endControlP: {
                        x: circleCenter.x - controlLength, // fiddle here
                        y: mode.yLevel + (circleDiameter / 2)
                    }
                };

                p.noStroke();
                p.fill(mode.color);

                p.beginShape();

                // Vertex at triangle tip
                p.vertex(startPoint.x, startPoint.y);

                // Draw top bezier
                p.bezierVertexPoint(top.startControlP, top.endControlP, topEndPoint);
                // Vertex at bottom of circle
                p.vertexPoint(bottomEndPoint);

                // Draw bottom bezier
                p.bezierVertexPoint(bottom.endControlP,
                    bottom.startControlP,
                    startPoint);

                p.endShape();

                // Draw guiding lines
                p.stroke(255, 102, 0);
                p.line(startPoint.x, startPoint.y, top.startControlP.x, top.startControlP.y);
                p.line(topEndPoint.x, topEndPoint.y, top.endControlP.x, top.endControlP.y);
                p.line(startPoint.x, startPoint.y, bottom.startControlP.x, bottom.startControlP.y);
                p.line(bottomEndPoint.x, bottomEndPoint.y, bottom.endControlP.x, bottom.endControlP.y);
                p.stroke(0, 0, 0);

                var dotRadius = 20;
                p.push();
                p.fill(0, 0, 255);
                p.ellipse(circleCenter.x, circleCenter.y, dotRadius, dotRadius);
                p.pop();
            }
        }
        p.pop();
    };


};
