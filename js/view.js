var view=function(e){e.drawTransitTriangle=function(t,n){e.push(),e.fill(t),e.triangle(0,0,0,e.windowHeight,n.x,n.y),e.pop()},e.drawTransitTriangles=function(t){for(var n in t)if(t.hasOwnProperty(n)){var o=t[n],r=o.magnitude*e.windowWidth/2;e.push(),e.fill(o.color),e.triangle(0,0,0,e.windowHeight,r,o.yLevel),e.pop()}},e.drawDebugText=function(t){e.push(),e.fill(0),e.textSize(e.windowHeight/40);var n=e.windowHeight/20,o="";o+="fps: "+e.frameRate()+"\n",e.text(o,n,n),e.pop()},e.drawTransitCircles=function(t){e.push();for(var n in t)if(t.hasOwnProperty(n)){var o=t[n],r={x:o.magnitude*e.windowWidth,y:o.yLevel},i=o.magnitude*e.windowHeight/3;e.drawCircle(o.color,r,i)}e.pop()},e.drawTransitArcs=function(t){e.push();for(var n in t)if(t.hasOwnProperty(n)){var o=e.windowWidth/10,r=t[n],i={x:r.magnitude*e.windowWidth,y:r.yLevel},l=r.magnitude*e.windowWidth/2,a=r.magnitude*e.windowHeight/3,d={x:l,y:r.yLevel},y={x:i.x,y:r.yLevel-a/2},w={x:i.x,y:r.yLevel+a/2},x={startControlP:{x:l+o,y:r.yLevel-50},endControlP:{x:i.x-o,y:r.yLevel-a/2}},s={startControlP:{x:l+o,y:r.yLevel+50},endControlP:{x:i.x-o,y:r.yLevel+a/2}};e.noStroke(),e.fill(r.color),e.beginShape(),e.vertex(d.x,d.y),e.bezierVertexPoint(x.startControlP,x.endControlP,y),e.vertexPoint(w),e.bezierVertexPoint(s.endControlP,s.startControlP,d),e.endShape(),e.stroke(255,102,0),e.line(d.x,d.y,x.startControlP.x,x.startControlP.y),e.line(y.x,y.y,x.endControlP.x,x.endControlP.y),e.line(d.x,d.y,s.startControlP.x,s.startControlP.y),e.line(w.x,w.y,s.endControlP.x,s.endControlP.y),e.stroke(0,0,0);var p=20;e.push(),e.fill(0,0,255),e.ellipse(i.x,i.y,p,p),e.pop()}e.pop()}};