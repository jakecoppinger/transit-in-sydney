var dataProcessing=function(e){e.generateModesObject=function(o,r,n){var t=new e.Point({x:e.mouseX,y:e.mouseY}),a=e.windowCorners(),i={posSlope1:e.percentageToWindowCorner(t,a.bottomLeft,a.topRight),posSlope2:e.percentageToWindowCorner(t,a.topRight,a.bottomLeft),negSlope1:e.percentageToWindowCorner(t,a.topLeft,a.bottomRight),negSlope2:e.percentageToWindowCorner(t,a.bottomRight,a.topLeft)},s={"Walked only":{color:e.yellow,magnitude:i.posSlope1,yLevel:.2*e.windowHeight},Bus:{color:e.green,magnitude:i.posSlope2,yLevel:.4*e.windowHeight},Train:{color:e.blue,magnitude:i.negSlope1,yLevel:.6*e.windowHeight},"Car - as driver":{color:e.pink,magnitude:i.negSlope2,yLevel:.8*e.windowHeight}};for(var u in s)if(s.hasOwnProperty(u)){var l=1-n,b=n,d=r.below.suburb,g=r.above.suburb,p=e.percentageSuburbs[d][u],c=e.percentageSuburbs[g][u],m=(l*p+b*c)/100;s[u].magnitude=m,console.log(m)}return s},e.parseTransitData=function(o){var r=["Sydney","Haymarket","Darlinghurst","Ultimo","Woolloomooloo","Pyrmont","Surry Hills","Kings Cross","Chippendale","The Rocks - Millers Point - Dawes Point","Potts Point","Elizabeth Bay","Glebe - Forest Lodge","Rushcutters Bay","Redfern","Darlington","Paddington","Rosebery","Camperdown","Waterloo - Zetland","Green Square","Centennial Park - Moore Park","Erskineville - Eveleigh","Newtown","Alexandria - Beaconsfield"],n=["Car - as driver","Bus","Train","Walked only"];e.absoluteSuburbs={},e.percentageSuburbs={};var t="2011",a=t+"%",i=[];for(var s in o)if(o.hasOwnProperty(s)&&-1!=r.indexOf(s)){var u=parseFloat(o[s]["Distance from CBD"]);e.absoluteSuburbs[s]={},e.percentageSuburbs[s]={},i.push(u);for(var l=0;l<n.length;l++){mode=n[l];var b=o[s][mode][a],d=o[s][mode][t];e.absoluteSuburbs[s][mode]=d,e.percentageSuburbs[s][mode]=b}}e.suburbsDistance=e.generateSuburbDistances(o,r),e.maxDistance=Math.max.apply(Math,i),e.dataLoaded=1,console.log("We have our data!")},e.generateSuburbDistances=function(e,o){var r=[];for(var n in e)if(e.hasOwnProperty(n)&&-1!=o.indexOf(n)){var t=parseFloat(e[n]["Distance from CBD"]);r.push([n,t])}return r.sort(function(e,o){return e[1]-o[1]}),r},e.currentMouseDistanceKM=function(){return e.mouseX*(e.maxDistance/e.windowWidth)},e.prettyPrint=function(e){console.log(JSON.stringify(e,null,2))},e.nearestPointsToValue=function(e,o){for(var r,n,t=9999999,a=9999999,i=0;i<o.length;i++){var s=parseFloat(o[i][1]),u=o[i][0];s-e>0&&a>s-e&&(a=s-e,n=u),e-s>=0&&t>=e-s&&(t=e-s,r=u)}return{above:{suburb:n,kmFromSuburb:a},below:{suburb:r,kmFromSuburb:t}}}};