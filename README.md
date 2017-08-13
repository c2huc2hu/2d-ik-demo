# Implementing Simple Inverse Kinematics

As an introduction to Arduinos, we're going to start by building a simple arm that runs inverse kinematics.

## Quick Introduction to Arduinos

Arduinos are inexpensive microcontrollers that can interface with a variety of electronic devices.
They're programmed in a variant of C++ called Arduino. Documentation is [here](https://www.arduino.cc/en/Reference/HomePage).
Install the editor from [here](https://www.arduino.cc/en/Main/Software). Download this while you read the rest of this page.
The functions you will need are:

* `Serial.print`: Prints to console
* `Serial.read`: Reads from console
* `Servo` methods (`attach`, `write`): See below
* `delay`: Waits for the number in milliseconds

## Controlling the Arm

We're going to make an arm with two servo motors.
A servo is a motor with a feedback controller that lets you move it to a given position.
The servos we're using can be controlled and powered directly from an Arduino using the Servo library.
See below for a simple code snippet showing how to control the arm.
Our servos are fairly small, and can't lift heavy loads, but they can position the arm.
Note that the position can be controlled directly, but the speed cannot.

Question: How can it be controlled at all?


    // Modified from Sweep.ino
    #include <Servo.h>

    Servo myservo;  // create servo object to control a servo

    int pos = 0;    // variable to store the servo position

    void setup()
    {
      myservo.attach(9);  // attaches the servo on pin 9 to the servo object
    }

    void loop()
    {
      for(pos = 0; pos <= 180; pos += 1) // goes from 0 degrees to 180 degrees
      {                                  // in steps of 1 degree
        myservo.write(pos);              // tell servo to go to position in variable 'pos'
        delay(15);                       // waits 15ms for the servo to reach the position
      }
      for(pos = 180; pos>=0; pos-=1)     // goes from 180 degrees to 0 degrees
      {
        myservo.write(pos);              // tell servo to go to position in variable 'pos'
        delay(15);                       // waits 15ms for the servo to reach the position
      }
    }


## Inverse Kinematics

Inverse Kinematics (IK) calculates the angles of joints in an arm to achieve a desired position for the end effector.
For example, in the demo below, you can move the end effector and it will automatically calculate the angles for the arm.
We will use this model of arm (two rotational degrees of freedom) because it can reach arbitrary points in x-y space.

<iframe src="demo.html" width="500" height="500"></iframe>


## Task

Your task is to construct an arm with the provided materials and to control it with inverse kinematics.
You should take input from Serial to determine the position.
These are the equations for the arm. They can be derived from the shape of the arm and the cosine law.

![d = \sqrt{x^2 + y^2}\\
\theta_1 = \arctan{\frac{y}{x}} \pm \arccos{\frac{d^2 + d_1^2 - d_2^2}{2 d d_1}} \\
\theta_2 = \arctan{\frac{y - d_1 \sin{\theta_1}}{x - d_1 \cos{\theta_1}}}](equation.gif)

<!-- <img src="https://latex.codecogs.com/gif.latex?d&space;=&space;\sqrt{x^2&space;&plus;&space;y^2}\\&space;\theta_1&space;=&space;\arctan{\frac{y}{x}}&space;\pm&space;\arccos{\frac{d^2&space;&plus;&space;d_1^2&space;-&space;d_2^2}{2&space;d&space;d_1}}&space;\\&space;\theta_2&space;=&space;\arctan{\frac{y&space;-&space;d_1&space;\sin{\theta_1}}{x&space;-&space;d_1&space;\cos{\theta_1}}}" title="d = \sqrt{x^2 + y^2}\\ \theta_1 = \arctan{\frac{y}{x}} \pm \arccos{\frac{d^2 + d_1^2 - d_2^2}{2 d d_1}} \\ \theta_2 = \arctan{\frac{y - d_1 \sin{\theta_1}}{x - d_1 \cos{\theta_1}}}" /> -->

<!--
d = \sqrt{x^2 + y^2}\\
\theta_1 = \arctan{\frac{y}{x}} \pm \arccos{\frac{d^2 + d_1^2 - d_2^2}{2 d d_1}} \\
\theta_2 = \arctan{\frac{y - d_1 \sin{\theta_1}}{x - d_1 \cos{\theta_1}}}
-->

### Hints:

Use atan2, not atan in your equations. This takes into account the signs.

## Additional Work

If you finish early, you can try any of these things:

* Add a gripper to the arm
* Connect the arm to the web demo (you will need an intermediate server for this that converts http to serial)