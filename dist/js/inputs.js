var inputs=function(t){t.topLeftPercentage=function(){var o=t.windowCorners(),n={x:t.mouseX,y:t.mouseY};return t.percentageToWindowCorner(n,o.bottomLeft,o.topRight)},t.percentageToWindowCorner=function(o,n,e){var i=t.pointDistance(o,n),r=t.pointDistance(n,e);return i/r},t.windowCorners=function(){return{topLeft:{x:0,y:0},topRight:{x:t.windowWidth,y:0},bottomLeft:{x:0,y:t.windowWidth},bottomRight:{x:t.windowWidth,y:t.windowHeight}}}};