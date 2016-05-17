/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var drawGeometricShapes = function(p) {

    p.minimumWindowSize = function() {
        var windowWidth = p.windowWidth;
        var windowHeight = p.windowHeight;

        if (windowWidth < windowHeight) {
            return windowWidth;
        } else {
            return windowHeight;
        }
    };

    p.drawBottomSlider = function(currentDistance) {
        p.push();
        p.fill(0);

        var triangleCentre = {
            x: (currentDistance / p.maxDistance) * p.windowWidth,
            y: p.windowHeight - (p.windowHeight / 15)
        };

        var triangleSize = p.minimumWindowSize() / 50;

        var trianglePoints = {
            p1: {
                x: triangleCentre.x - triangleSize,
                y: triangleCentre.y - triangleSize
            },
            p2: {
                x: triangleCentre.x - triangleSize,
                y: triangleCentre.y + triangleSize
            },
            p3: {
                x: triangleCentre.x,
                y: triangleCentre.y
            }
        };

        p.drawTriangle(trianglePoints);
        p.pop();
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
                // (mode.magnitude / p.maxSuburbPercentage) * p.windowWidth

                var triangleXPoint = mode.magnitude * p.windowWidth * p.globalDrawVals.triangleSizeVsArc;
                p.push();
                p.fill(mode.color);
                p.triangle(0, 0, 0, p.windowHeight, triangleXPoint, mode.yLevel);
                p.pop();
            }
        }
    };

    p.drawTransitCircles = function(modes, globalDrawVals) {
        p.push();
        for (var modeName in modes) {
            if (modes.hasOwnProperty(modeName)) {
                var mode = modes[modeName];
                var circlePosition = {
                    x: mode.magnitude * p.windowWidth,
                    y: mode.yLevel
                };
                var circleDiameter = mode.magnitude * globalDrawVals.circleDiameterRatio;

                p.drawCircle(mode.color, circlePosition, circleDiameter);
            }
        }
        p.pop();
    };

    p.drawTransitArcs = function(modes, globalDrawVals) {
        p.push();

        for (var modeName in modes) {
            if (modes.hasOwnProperty(modeName)) {
                var mode = modes[modeName];

                // Define the length and angle of the control lines
                // that define the top and bottom of the mode arcs
                var controlLength = mode.magnitude * globalDrawVals.circleDiameterRatio / 2;
                var controlAngle = Math.PI / 4;

                var circleCenter = {
                    x: mode.magnitude * p.windowWidth,
                    y: mode.yLevel
                };

                var triangleXPoint = mode.magnitude * p.windowWidth * p.globalDrawVals.triangleSizeVsArc;
                var circleDiameter = mode.magnitude * globalDrawVals.circleDiameterRatio;

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

                var rightArrowPoint = {
                    x: circleCenter.x + (circleDiameter / 2),
                    y: circleCenter.y
                };

                var top = {
                    startControlP: {
                        x: triangleXPoint + controlLength * Math.cos(controlAngle),
                        y: mode.yLevel - controlLength * Math.sin(controlAngle)
                    },
                    endControlP: {
                        x: circleCenter.x - controlLength,
                        y: mode.yLevel - (circleDiameter / 2)
                    }
                };

                var bottom = {
                    startControlP: {
                        x: triangleXPoint + controlLength * Math.cos(controlAngle),
                        y: mode.yLevel + controlLength * Math.sin(controlAngle)
                    },
                    endControlP: {
                        x: circleCenter.x - controlLength,
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


                // Vertex at right side of circle
                p.vertexPoint(rightArrowPoint);

                // Vertex at bottom of circle
                p.vertexPoint(bottomEndPoint);

                // Draw bottom bezier
                p.bezierVertexPoint(bottom.endControlP,
                    bottom.startControlP,
                    startPoint);

                p.endShape();

                // Draw guiding lines
                // p.stroke(255, 102, 0);
                // p.line(startPoint.x, startPoint.y, top.startControlP.x, top.startControlP.y);
                // p.line(topEndPoint.x, topEndPoint.y, top.endControlP.x, top.endControlP.y);
                // p.line(startPoint.x, startPoint.y, bottom.startControlP.x, bottom.startControlP.y);
                // p.line(bottomEndPoint.x, bottomEndPoint.y, bottom.endControlP.x, bottom.endControlP.y);
                // p.stroke(0, 0, 0);

                var dotDiameter = circleDiameter * 9.4 / 10;
                //(Math.sqrt(Math.pow(circleDiameter,2)/2));
                p.push();
                //p.blendMode(p.OVERLAY);

                p.blendMode(p.OVERLAY);

                p.noStroke();
                p.fill(175);
                p.ellipse(circleCenter.x, circleCenter.y, dotDiameter, dotDiameter);
                p.pop();
            }
        }
        p.pop();
    };

};
