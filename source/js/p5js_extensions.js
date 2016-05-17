var p5jsExtensions = function(p) {
    p.bezierVertexPoint = function(firstControlPoint, secondControlPoint, anchorPoint) {
        p.bezierVertex(firstControlPoint.x, firstControlPoint.y,
            secondControlPoint.x, secondControlPoint.y,
            anchorPoint.x, anchorPoint.y);
    };

    p.vertexPoint = function(point) {
        p.vertex(point.x, point.y);
    };

    p.drawCircle = function(color, position, diameter) {
        p.push();
        p.fill(color);
        p.ellipse(position.x, position.y, diameter, diameter);
        p.pop();
    };

    p.drawTriangle = function(points) {
        p.triangle(points.p1.x, points.p1.y, points.p2.x, points.p2.y,
            points.p3.x, points.p3.y);
    };

};
