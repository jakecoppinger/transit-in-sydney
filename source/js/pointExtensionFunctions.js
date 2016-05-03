var pointExtensionFunctions = function(p) {
    p.bezierVertexPoint = function(firstControlPoint, secondControlPoint, anchorPoint) {
        p.bezierVertex(firstControlPoint.x, firstControlPoint.y,
            secondControlPoint.x, secondControlPoint.y,
            anchorPoint.x, anchorPoint.y);
    };

    p.vertexPoint = function(point) {
        p.vertex(point.x, point.y);
    };

};
