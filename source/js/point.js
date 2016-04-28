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
};
