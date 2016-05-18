var dataProcessing=function(e){e.generateModesObject=function(r,o,a,n){var t={"Walked only":{color:e.yellow,yLevel:.2*e.windowHeight},Bus:{color:e.green,yLevel:.4*e.windowHeight},Train:{color:e.blue,yLevel:.6*e.windowHeight},"Car - as driver":{color:e.pink,yLevel:.8*e.windowHeight}};for(var u in t)if(t.hasOwnProperty(u)){var s,i,l=1-n,d=n,b=a.below.suburb,c=a.above.suburb,g=e.suburbModeCounts[b][u];c?(s=e.suburbModeCounts[c][u],i=e.suburbModePercentages[c][u]):(s=0,i=0);var m=e.suburbModePercentages[b][u],v=r.percentageCountRatio,f=l*m+d*i,P=l*g+d*s,p=f/e.maxPercentage,y=P/e.maxCount,h=v*p+(1-v)*y;t[u].interpolatedPercentage=p,t[u].interpolatedCount=P,t[u].percentageRatio=v,t[u].magnitude=h}return t},e.parseTransitData=function(r){var o=["Sydney","Haymarket","Darlinghurst","Ultimo","Woolloomooloo","Pyrmont","Surry Hills","Kings Cross","Chippendale","The Rocks - Millers Point - Dawes Point","Potts Point","Elizabeth Bay","Glebe - Forest Lodge","Rushcutters Bay","Redfern","Darlington","Paddington","Rosebery","Camperdown","Waterloo - Zetland","Green Square","Centennial Park - Moore Park","Erskineville - Eveleigh","Newtown","Alexandria - Beaconsfield"],a=["Car - as driver","Bus","Train","Walked only"];e.suburbModeCounts={},e.suburbModePercentages={},e.maxPercentage=0,e.maxCount=0;var n="2011",t=n+"%",u=[];for(var s in r)if(r.hasOwnProperty(s)&&-1!=o.indexOf(s)){var i=parseFloat(r[s]["Distance from CBD"]);e.suburbModeCounts[s]={},e.suburbModePercentages[s]={},u.push(i);for(var l=0;l<a.length;l++){mode=a[l];var d=parseFloat(r[s][mode][t])/100,b=parseFloat(r[s][mode][n]);e.suburbModeCounts[s][mode]=b,e.suburbModePercentages[s][mode]=d,d>e.maxPercentage&&(e.maxPercentage=d),b>e.maxCount&&(e.maxCount=b)}}e.suburbsDistance=e.generateSuburbDistances(r,o),e.maxDistance=Math.max.apply(Math,u),e.dataLoaded=1,console.log("JSON data is loaded and parsed."),console.log("Max count of any suburb mode: "+e.maxCount),console.log("Max percentage of any suburb mode: "+e.maxPercentage)},e.generateSuburbDistances=function(e,r){var o=[];for(var a in e)if(e.hasOwnProperty(a)&&-1!=r.indexOf(a)){var n=parseFloat(e[a]["Distance from CBD"]);o.push([a,n])}return o.sort(function(e,r){return e[1]-r[1]}),o},e.currentMouseDistanceKM=function(){return e.touchX*(e.maxDistance/e.windowWidth)},e.prettyPrint=function(e){console.log(JSON.stringify(e,null,2))},e.nearestPointsToValue=function(e,r){for(var o,a,n=9999999,t=9999999,u=0;u<r.length;u++){var s=parseFloat(r[u][1]),i=r[u][0];s-e>0&&t>s-e&&(t=s-e,a=i),e-s>=0&&n>=e-s&&(n=e-s,o=i)}return{above:{suburb:a,kmFromSuburb:t},below:{suburb:o,kmFromSuburb:n}}}};