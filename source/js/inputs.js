var inputs = function(p) {
    p.topLeftPercentage = function() {
        var windowCorners = p.windowCorners();
        var mousePos = {
            x: p.mouseX,
            y: p.mouseY

        };
        return p.percentageToWindowCorner(mousePos,windowCorners.bottomLeft, 
            windowCorners.topRight);
    };


    p.percentageToWindowCorner = function(mousePos,corner1, corner2) {
        var mouseDistance = p.pointDistance(mousePos, corner1);
        var maxDistance = p.pointDistance(corner1, corner2);
        return mouseDistance / maxDistance;
    }


    p.windowCorners = function() {
        return {
            "topLeft": {
                x: 0,
                y: 0
            },
            "topRight": {
                x: p.windowWidth,
                y: 0
            },
            "bottomLeft": {
                x: 0,
                y: p.windowWidth
            },
            "bottomRight": {
                x: p.windowWidth,
                y: p.windowHeight
            }
        };
    };

};
