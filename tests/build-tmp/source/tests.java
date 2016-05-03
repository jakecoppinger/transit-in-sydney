import processing.core.*; 
import processing.data.*; 
import processing.event.*; 
import processing.opengl.*; 

import java.util.HashMap; 
import java.util.ArrayList; 
import java.io.File; 
import java.io.BufferedReader; 
import java.io.PrintWriter; 
import java.io.InputStream; 
import java.io.OutputStream; 
import java.io.IOException; 

public class tests extends PApplet {

int dotRadius = 10;



public void setup() {
    
}

public void draw() {



    ellipse(80, 75, dotRadius, dotRadius);


    beginShape();


    vertex(30, 20);

    ellipse(80, 0, dotRadius, dotRadius);
    
    bezierVertex(80, 0, 80, 75, 30, 75);
    bezierVertex(50, 80, 60, 25, 30, 20);
    endShape();

}
  public void settings() {  size(640, 360); }
  static public void main(String[] passedArgs) {
    String[] appletArgs = new String[] { "tests" };
    if (passedArgs != null) {
      PApplet.main(concat(appletArgs, passedArgs));
    } else {
      PApplet.main(appletArgs);
    }
  }
}
