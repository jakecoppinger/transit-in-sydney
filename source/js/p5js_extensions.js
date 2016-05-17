/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

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





    p.slope = function(x1, y1, x2, y2) {
        if (x1 == x2) return false;
        return (y1 - y2) / (x1 - x2);
    };
    p.yInt = function(x1, y1, x2, y2) {
        if (x1 === x2) return y1 === 0 ? 0 : false;
        if (y1 === y2) return y1;
        return y1 - this.slope(x1, y1, x2, y2) * x1;
    };
    p.getXInt = function(x1, y1, x2, y2) {
        var slope;
        if (y1 === y2) return x1 == 0 ? 0 : false;
        if (x1 === x2) return x1;
        return (-1 * ((slope = this.slope(x1, y1, x2, y2)) * x1 - y1)) / slope;
    };

    p.getIntersection = function(p1,p2,p3,p4) {
        var x11 = p1.x;
        var y11 = p1.y;
        var x12 = p2.x;
        var y12 = p2.y;
        var x21 = p3.x;
        var y21 = p3.y;
        var x22 = p4.x;
        var y22 = p4.y;

        var slope1, slope2, yint1, yint2, intx, inty;
        if (x11 == x21 && y11 == y21) return [x11, y11];
        if (x12 == x22 && y12 == y22) return [x12, y22];

        slope1 = this.slope(x11, y11, x12, y12);
        slope2 = this.slope(x21, y21, x22, y22);
        if (slope1 === slope2) return undefined;

        yint1 = this.yInt(x11, y11, x12, y12);
        yint2 = this.yInt(x21, y21, x22, y22);
        if (yint1 === yint2) return yint1 === false ? false : [0, yint1];

        if (slope1 === false) return [y21, slope2 * y21 + yint2];
        if (slope2 === false) return [y11, slope1 * y11 + yint1];
        intx = (slope1 * x11 + yint1 - yint2) / slope2;
        return {
            x: intx,
            y: slope1 * intx + yint1
        };
    };


};
