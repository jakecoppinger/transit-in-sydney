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
        p.blendMode(p.DODGE);
        p.textAlign(p.CENTER);
        for (var modeName in modes) {
            if (modes.hasOwnProperty(modeName)) {
                var mode = modes[modeName];

                var textPos = {
                    x: mode.magnitude * p.windowWidth + (p.windowWidth / 20),
                    y: mode.yLevel
                };

                var percentageColor = (1 - mode.percentageRatio) * 255;
                var countColor = mode.percentageRatio * 255;

                var percentageString = (Math.round(mode.interpolatedPercentage * 100 * 10) / 10).toString() + "%";
                var countString = Math.round(mode.interpolatedCount).toString();

                var s = percentageString + "\n" + countString;

                p.textSize(mode.magnitude * globalDrawVals.circleDiameterRatio / 4);

                var countTextYoffset = mode.magnitude * 120;

                p.fill(percentageColor);
                p.text(percentageString, textPos.x, textPos.y);
                p.fill(countColor);

                p.text(countString, textPos.x, textPos.y + countTextYoffset);
            }
        }
        p.pop();
    };


    p.drawModeLabels = function(modes) {
        p.push();
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
                    width: p.windowHeight / 15,
                    height: p.windowHeight / 15
                };


                p.image(p.images[displayString], image.x, image.y, dWidth = image.width, dHeight = image.height);
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

            displayString = displayString.toLowerCase() + ".";


            p.textSize(p.windowWidth / 7.5);

            p.textAlign(p.CENTER);
            var textPos = {
                x: p.windowWidth / 2,
                y: p.windowHeight / 2
            };

            // p.rectMode(p.CENTER);
            p.text(displayString, textPos.x, textPos.y);

            p.pop();
        }
    };

};
