int dotRadius = 10;



void setup() {
    size(640, 360);
}

void draw() {



    ellipse(80, 75, dotRadius, dotRadius);


    beginShape();


    vertex(30, 20);

    ellipse(80, 0, dotRadius, dotRadius);
    
    bezierVertex(80, 0, 80, 75, 30, 75);
    bezierVertex(50, 80, 60, 25, 30, 20);
    endShape();

}
