/*

Jake Coppinger, 2016
jakecoppinger.com
jake@jakecoppinger.com

*/

var finalObject = function(p) {
    // Model
    dataProcessing(p);
    p5jsExtensions(p);
    pointClass(p);

    // View
    drawTextAndLabels(p);
    drawGeometricShapes(p);
    inputs(p);

    // Controller
    main(p);
};

var myp5 = new p5(finalObject);