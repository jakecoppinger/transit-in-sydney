var main=function(o){var e,n,i,t,r,w;o.setup=function(){o.createCanvas(o.windowWidth,o.windowHeight),i=o.color(222,207,34),n=o.color(9,141,68),e=o.color(0,153,202),pink=o.color(204,25,119),orange=o.color(230,73,35),t=255},o.draw=function(){if(o.mouseX!=w||o.mouseY!=r){console.log("Drawing!");var n=new o.Point({x:o.mouseX,y:o.mouseY}),a=o.windowCorners(),d={posSlope1:o.percentageToWindowCorner(n,a.bottomLeft,a.topRight),posSlope2:o.percentageToWindowCorner(n,a.topRight,a.bottomLeft),negSlope1:o.percentageToWindowCorner(n,a.topLeft,a.bottomRight),negSlope2:o.percentageToWindowCorner(n,a.bottomRight,a.topLeft)},g={Yellow:{color:i,magnitude:d.posSlope1,yLevel:.2*o.windowHeight},Green:{color:orange,magnitude:d.posSlope2,yLevel:.4*o.windowHeight},Blue:{color:e,magnitude:d.negSlope1,yLevel:.6*o.windowHeight},Pink:{color:pink,magnitude:d.negSlope2,yLevel:.8*o.windowHeight}};o.background(t),o.noStroke(),o.blendMode(o.MULTIPLY),o.drawTransitTriangles(g),o.drawDebugText(g),o.drawTransitCircles(g),o.drawTransitArcs(g)}r=o.mouseY,w=o.mouseX},o.windowResized=function(){o.resizeCanvas(o.windowWidth,o.windowHeight)},o.mouseMoved=function(){}};