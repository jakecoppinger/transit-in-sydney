var sketchObject = function(p) {


    p.setup = function() {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // p.createCanvas(720, 400);
        //p.stroke((p.mouseX / p.windowWidth) * 255);

        //console.log((p.mouseX / p.windowWidth) * 255);

        p.noFill();
    }

    p.draw = function() {

        p.background(0);

        for (var i = 0; i < 200; i += 20) {
            //console.log(p.mouseX);
            p.bezier(p.mouseX - (i / 2.0), 40 + i, 410, 20, 440, 300, 240 - (i / 16.0), 300 + (i / 8.0));
        }

    }


    p.windowResizes = function() {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
    }

    p.mouseMoved = function() {
        var color = (p.mouseX / p.windowWidth) * 255;
        console.log(color);
        p.stroke(color);
    }

}

var myp5 = new p5(sketchObject);
