/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var pointClass = function(p) {
    p.Point = function(d) {
        this.x = d.x;
        this.y = d.y;
        this.print = function() {
            console.log("x: " + x + ", y: " + y);
        };
    };

    p.pointDistance = function(p1,p2) {
        var xDist = p1.x - p2.x;
        var yDist = p1.y - p2.y;
        var dist = Math.sqrt(Math.pow(xDist,2) + Math.pow(yDist,2));
        return dist;
    };
};
