#include <AccelStepper.h>
#include <MultiStepper.h>

#define body1pin1 53
#define body1pin2 51
#define body1pin3 49
#define body1pin4 47

#define body2pin1 43
#define body2pin2 41
#define body2pin3 39
#define body2pin4 37

#define body3pin1 33
#define body3pin2 31
#define body3pin3 29
#define body3pin4 27

#define _28BYJ48_FULLSTEP 4
#define _28BYJ48_HALFSTEP 8

// Define pins for indicator LED and start-signal
#define startPin 4
#define ledPin 6

// Info for the 28byj-48 stepper motors. (Common values.)
const float _28BYJ48_STEP_ANGLE = 0;
const int _28BYJ48_STEPS_PER_REVOLUTION = 2048; 
int _28BYJ48_SPEED = 300;
float _28BYJ48_target_revolutions = _28BYJ48_STEPS_PER_REVOLUTION * 2;

// Info for the Nema17 stepper motor.
const float NEMA17_STEP_ANGLE = 1.8;
const int NEMA17_STEPS_PER_REVOLUTION = 400; // 360 deg/rev / 1.8 deg/step * 2 (gear ratio) = 400 steps/rev
int NEMA17_SPEED = 150;
float NEMA17_target_revolutions = NEMA17_STEPS_PER_REVOLUTION * 3;

// Class objects for the stepper motors. (From the AccelStepper lib)
AccelStepper body1(_28BYJ48_FULLSTEP, body1pin1, body1pin3, body1pin2, body1pin4);
AccelStepper body2(AccelStepper::FULL4WIRE, body2pin1, body2pin2, body2pin3, body2pin4);
AccelStepper body3(_28BYJ48_FULLSTEP, body3pin1, body3pin3, body3pin2, body3pin4);

void setup()
{
  // Setup for body 1 (28byj-48)
  body1.setMaxSpeed(_28BYJ48_SPEED);
  body1.setAcceleration(300);
  body1.setSpeed(_28BYJ48_SPEED);
  body1.setCurrentPosition(0);
  body1.moveTo(_28BYJ48_target_revolutions);

  // Setup for body 2 (Nema17)
  body2.setMaxSpeed(NEMA17_SPEED);
  body2.setAcceleration(500);
  body2.setSpeed(NEMA17_SPEED);
  body2.setCurrentPosition(0);
  body2.moveTo(NEMA17_target_revolutions);

  // Setup for body 3 (28byj-48)
  body3.setMaxSpeed(_28BYJ48_SPEED);
  body3.setAcceleration(300);
  body3.setSpeed(_28BYJ48_SPEED);
  body3.setCurrentPosition(0);
  body3.moveTo(_28BYJ48_target_revolutions);

  pinMode(ledPin, OUTPUT);
  pinMode(startPin, INPUT);
  while(digitalRead(startPin) == LOW) {}
  digitalWrite(ledPin, HIGH);
  
  // TODO: Setup interrupts with buttons to turn off motors.
}

void loop()
{
  // Check if body 1 has finished it's revolutions.
  if (body1.distanceToGo() == 0 && body1.currentPosition() != 0)
  {
    body1.moveTo(0); // Move back to start.
  }

  // Check if body 2 has finished it's revolutions.
  if (body2.distanceToGo() == 0 && body2.currentPosition() != 0)
  {
    body2.moveTo(0); // Move back to start.
  }

  // Check if body 3 has finished it's revolutions.
  if (body3.distanceToGo() == 0 && body3.currentPosition() != 0)
  {
    body3.moveTo(0);
  }

  // TODO: Make check for wheter the motors should run or stand still depending on buttons pressed.
  body1.run(); // Run this as often as possible.
  body2.run(); // Run this as often as possible.
  body3.run(); // Run this as often as possible.
}