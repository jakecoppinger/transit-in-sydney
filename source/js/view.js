/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var view = function(p) {

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

    p.drawCurrentSuburb = function(nearestPoints, titleOpacity) {
        if (nearestPoints.above.suburb) {
            p.push();

            var color = 255 - (titleOpacity * 255);
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


            p.blendMode(p.NORMAL);


            var s = theSuburb;
            p.textSize(p.windowWidth / 9);

            p.textAlign(p.CENTER);
            var textPos = {
                x: p.windowWidth / 2,
                y: p.windowHeight / 2
            };


            // p.rectMode(p.CENTER);
            p.text(s, textPos.x, textPos.y);

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
                // (mode.magnitude / p.maxSuburbPercentage) * p.windowWidth

                var triangleXPoint = (mode.magnitude / p.maxSuburbPercentage) * p.windowWidth / 5;
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
                    x: (mode.magnitude / p.maxSuburbPercentage) * p.windowWidth,
                    y: mode.yLevel
                };
                var circleDiameter = mode.magnitude * p.windowHeight;
                p.drawCircle(mode.color, circlePosition, circleDiameter);
            }
        }
        p.pop();
    };

    p.drawTransitFigures = function(modes) {
        p.push();

        p.textSize(p.windowHeight / 19);

        for (var modeName in modes) {
            if (modes.hasOwnProperty(modeName)) {

                var mode = modes[modeName];
                var textPos = {
                    x: (mode.magnitude / p.maxSuburbPercentage) * p.windowWidth,
                    y: mode.yLevel
                };

                var countTextYoffset = 50;


                var percentageColor = (1 - mode.percentageRatio) * 255;
                var countColor = mode.percentageRatio * 255;



                var percentageString = (Math.round(mode.interpolatedPercentage * 100 * 10) / 10).toString() + "%";
                var countString = Math.round(mode.interpolatedCount).toString() + "people";

                var s = percentageString + "\n" + countString;

                p.fill(percentageColor);
                p.text(percentageString, textPos.x, textPos.y);
                p.fill(countColor);

                p.text(countString, textPos.x, textPos.y + countTextYoffset);


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
                    x: (mode.magnitude / p.maxSuburbPercentage) * p.windowWidth,
                    y: mode.yLevel
                };

                var triangleXPoint = (mode.magnitude / p.maxSuburbPercentage) * p.windowWidth / 5;
                var circleDiameter = mode.magnitude * p.windowHeight;

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
