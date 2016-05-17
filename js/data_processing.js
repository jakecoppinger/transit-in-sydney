var dataProcessing=function(e){e.generateModesObject=function(o,r,a){var n=new e.Point({x:e.mouseX,y:e.mouseY}),t={"Walked only":{color:e.yellow,yLevel:.2*e.windowHeight},Bus:{color:e.green,yLevel:.4*e.windowHeight},Train:{color:e.blue,yLevel:.6*e.windowHeight},"Car - as driver":{color:e.pink,yLevel:.8*e.windowHeight}};for(var s in t)if(t.hasOwnProperty(s)){var u=1-a,i=a,l=r.below.suburb,d=r.above.suburb,b=e.suburbModeCounts[l][s],c=e.suburbModeCounts[d][s],g=e.suburbModePercentages[l][s],m=e.suburbModePercentages[d][s],P=n.y/e.windowHeight,f=u*g+i*m,v=u*b+i*c,y=f/e.maxPercentage,p=v/e.maxCount,w=P*y+(1-P)*p;t[s].interpolatedPercentage=y,t[s].interpolatedCount=v,t[s].percentageRatio=P,t[s].magnitude=w}return t},e.parseTransitData=function(o){var r=["Sydney","Haymarket","Darlinghurst","Ultimo","Woolloomooloo","Pyrmont","Surry Hills","Kings Cross","Chippendale","The Rocks - Millers Point - Dawes Point","Potts Point","Elizabeth Bay","Glebe - Forest Lodge","Rushcutters Bay","Redfern","Darlington","Paddington","Rosebery","Camperdown","Waterloo - Zetland","Green Square","Centennial Park - Moore Park","Erskineville - Eveleigh","Newtown","Alexandria - Beaconsfield"],a=["Car - as driver","Bus","Train","Walked only"];e.suburbModeCounts={},e.suburbModePercentages={},e.maxPercentage=0,e.maxCount=0;var n="2011",t=n+"%",s=[];for(var u in o)if(o.hasOwnProperty(u)&&-1!=r.indexOf(u)){var i=parseFloat(o[u]["Distance from CBD"]);e.suburbModeCounts[u]={},e.suburbModePercentages[u]={},s.push(i);for(var l=0;l<a.length;l++){mode=a[l];var d=parseFloat(o[u][mode][t])/100,b=parseFloat(o[u][mode][n]);e.suburbModeCounts[u][mode]=b,e.suburbModePercentages[u][mode]=d,d>e.maxPercentage&&(e.maxPercentage=d),b>e.maxCount&&(e.maxCount=b)}}e.suburbsDistance=e.generateSuburbDistances(o,r),e.maxDistance=Math.max.apply(Math,s),e.dataLoaded=1,console.log("JSON data is loaded and parsed."),console.log("Max count of any suburb mode: "+e.maxCount),console.log("Max percentage of any suburb mode: "+e.maxPercentage)},e.generateSuburbDistances=function(e,o){var r=[];for(var a in e)if(e.hasOwnProperty(a)&&-1!=o.indexOf(a)){var n=parseFloat(e[a]["Distance from CBD"]);r.push([a,n])}return r.sort(function(e,o){return e[1]-o[1]}),r},e.currentMouseDistanceKM=function(){return e.mouseX*(e.maxDistance/e.windowWidth)},e.prettyPrint=function(e){console.log(JSON.stringify(e,null,2))},e.nearestPointsToValue=function(e,o){for(var r,a,n=9999999,t=9999999,s=0;s<o.length;s++){var u=parseFloat(o[s][1]),i=o[s][0];u-e>0&&t>u-e&&(t=u-e,a=i),e-u>=0&&n>=e-u&&(n=e-u,r=i)}return{above:{suburb:a,kmFromSuburb:t},below:{suburb:r,kmFromSuburb:n}}}};