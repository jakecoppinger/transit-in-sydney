/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var drawTextAndLabels = function(p) {
    p.drawDebugText = function(s) {
        p.push();
        p.fill(0);
        p.textSize(p.windowHeight / 40);
        var debugTextIndent = p.windowHeight / 20;
        p.text(s, debugTextIndent, debugTextIndent);
        p.pop();
    };

    p.drawTransitFigures = function(modes, globalDrawVals) {
        p.push();

        p.textFont(p.typeface);
        // p.blendMode(p.DODGE);
        p.textAlign(p.LEFT, p.CENTER);

        for (var modeName in modes) {
            if (modes.hasOwnProperty(modeName)) {
                var mode = modes[modeName];
                var circleDiameter = mode.magnitude * globalDrawVals.circleDiameterRatio;

                var maximumYtextOffset = p.windowHeight * mode.magnitude / 7;

                var percentagePos = {
                    x: mode.magnitude * p.windowWidth + circleDiameter / 1.8,
                    y: mode.yLevel + (1 - mode.percentageRatio) * maximumYtextOffset
                };

                var countPos = {
                    x: mode.magnitude * p.windowWidth + circleDiameter / 1.8,
                    y: mode.yLevel - mode.percentageRatio * maximumYtextOffset
                };

                var percentageColor = (1 - mode.percentageRatio) * 255;
                var countColor = mode.percentageRatio * 255;

                var percentageString = (Math.round(mode.interpolatedPercentage * 100 * 10) / 10).toString() + "%";
                var countString = Math.round(mode.interpolatedCount).toString() + " people";

                p.textSize(mode.magnitude * globalDrawVals.circleDiameterRatio / 4);

                //var countTextYoffset = mode.magnitude * 120;

                p.fill(percentageColor);
                p.text(percentageString, percentagePos.x, percentagePos.y);

                p.fill(countColor);
                p.text(countString, countPos.x, countPos.y);
            }
        }
        p.pop();
    };


    p.drawModeLabels = function(modes) {
        p.push();
        p.textFont(p.typeface);

        p.imageMode(p.CENTER);
        p.textSize(p.windowHeight / 10);

        for (var modeName in modes) {
            if (modes.hasOwnProperty(modeName)) {
                var mode = modes[modeName];

                var displayString;
                if (modeName in p.shorternedModesHash) {
                    displayString = p.shorternedModesHash[modeName];
                } else {
                    displayString = modeName;
                }

                var image = {
                    x: mode.magnitude * p.windowWidth, //p.windowWidth * 95 / 100,
                    y: mode.yLevel,
                    size: mode.magnitude * p.windowWidth / 5
                };

                p.image(p.images[displayString], image.x, image.y, dWidth = image.size, dHeight = image.size);
                p.textAlign(p.RIGHT);
                //p.text(displayString, p.windowWidth * 97 / 100, mode.yLevel);
            }
        }

        p.pop();
    };

    p.drawCurrentSuburb = function(nearestPoints, titleOpacity, blendMode, opacity, sign) {
        if (nearestPoints.above.suburb) {
            p.push();
            p.blendMode(blendMode);
            p.textFont(p.typeface);

            var color = 255 - (titleOpacity * opacity * 255);

            if (sign < 1) {
                color = 255 - color;
            }

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

            var displayString;
            if (theSuburb in p.shortenedSuburbsHash) {
                displayString = p.shortenedSuburbsHash[theSuburb];
            } else {
                displayString = theSuburb;
            }

            displayString = displayString + ".";

            p.textSize(p.windowWidth / 7.5);

            p.textAlign(p.CENTER, p.CENTER);

            var textPos = {
                x: p.windowWidth / 2,
                y: p.windowHeight / 2
            };

            // p.rectMode(p.CENTER);
            p.text(displayString, textPos.x, textPos.y);

            p.pop();
        }
    };

    p.drawBottomSlider = function(currentDistance) {
        p.push();
        p.fill(0);

        var triangleCentre = {
            x: (currentDistance / p.maxDistance) * p.windowWidth,
            y: (p.windowHeight / 20)
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

        p.textFont(p.typeface);
        var displayString = (Math.round(currentDistance * 10) / 10).toString() + "km from CBD";

        p.fill(125);

        p.textSize(p.minimumWindowSize() / 40);

        p.textAlign(p.RIGHT, p.CENTER);

        var textPos = {
            x: trianglePoints.p3.x - (p.windowWidth / 40),
            y: trianglePoints.p3.y
        };

        // p.rectMode(p.CENTER);
        p.text(displayString, textPos.x, textPos.y);
        p.pop();
    };



    p.drawVerticalSlider = function(globalDrawVals, currentDistance) {
        p.push();
        p.fill(0);

        var triangleCentre = {
            x: p.windowWidth * 98 / 100,
            y: p.windowHeight * globalDrawVals.percentageCountRatio
        };

        var triangleSize = p.minimumWindowSize() / 50;

        var trianglePoints = {
            p1: {
                x: triangleCentre.x - triangleSize,
                y: triangleCentre.y
            },
            p2: {
                x: triangleCentre.x + triangleSize,
                y: triangleCentre.y
            },
            p3: {
                x: triangleCentre.x,
                y: triangleCentre.y - triangleSize
            }
        };


        p.textFont(p.typeface);

        var percentageRatioString = Math.round(globalDrawVals.percentageCountRatio * 100).toString();
        var countRatioString = Math.round((1 - globalDrawVals.percentageCountRatio) * 100).toString();

        var displayString = percentageRatioString + "% percentage\n" + countRatioString + "% absolute";

        p.fill(125);

        p.textSize(p.minimumWindowSize() / 40);

        var textPos = {
            x: trianglePoints.p3.x - (p.windowWidth / 40),
            y: trianglePoints.p3.y
        };

        p.drawTriangle(trianglePoints);
        // p.translate(textPos.x,textPos.y);
        // p.rotate(-p.HALF_PI);

        p.textAlign(p.RIGHT, p.CENTER);
        p.text(displayString, textPos.x, textPos.y);


        p.pop();
    };

    p.drawJakeCoppinger = function() {
        p.push();

        p.textFont(p.typeface);
        p.fill(220);
        p.textSize(p.minimumWindowSize() / 40);

        var textPos = {
            x: p.windowWidth * 3 / 100,
            y: p.windowHeight * 94 / 100
        };

        // p.translate(textPos.x,textPos.y);
        // p.rotate(-p.HALF_PI);

        p.textAlign(p.LEFT, p.BOTTOM);


        p.textLeading(0);

        p.text("Jake Coppinger / \n2016", textPos.x, textPos.y);
        p.pop();
    };


};
