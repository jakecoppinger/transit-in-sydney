/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var view = function(p) {
    p.drawTransitTriangle = function(color, tip) {
        p.fill(color);
        p.triangle(0, 0, 0, p.windowHeight, tip.x, tip.y);
    };
};
