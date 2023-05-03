#include <math.h>
#include <Wire.h>

int encoderChA = 3;
int encoderChB = 2;
int encoderChI = 4;

#define readA bitRead(PIND, 3)
#define readB bitRead(PIND, 2)
#define readI bitRead(PIND, 4)

#define I2C_ADDRESS 8

void readChA();

volatile float theta = 0.0;

void setup() 
{
  Wire.begin(I2C_ADDRESS);
  Wire.onRequest(sendData);
  Serial.begin(9600);

  pinMode(encoderChA, INPUT_PULLUP);
  pinMode(encoderChB, INPUT_PULLUP);

  attachInterrupt(digitalPinToInterrupt(encoderChA), readChA, CHANGE);
}

void loop() 
{
  
}

void readChA()
{
  noInterrupts();
  if (readA != readB) {
    theta += 2 * M_PI / 1000;
  } else {
    theta -= 2 * M_PI / 1000;
  }
  interrupts();
}

void sendData()
{
  char data[16];
  char strTheta[8];
  dtostrf(theta, 7, 4, strTheta);
  sprintf(data, "%s", strTheta);
  Wire.write(data, sizeof(data));
}