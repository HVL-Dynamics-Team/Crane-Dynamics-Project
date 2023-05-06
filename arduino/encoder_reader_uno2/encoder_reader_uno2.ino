#include <math.h>
#include <Wire.h>

int encoderChA = 3;
int encoderChB = 2;
int encoderChI = 4;

#define readA bitRead(PIND, 3)
#define readB bitRead(PIND, 2)
#define readI bitRead(PIND, 4)

#define I2C_ADDRESS 9

void readChA();

volatile float phi = 0.0;

void setup() 
{
  Wire.begin(I2C_ADDRESS);
  Wire.onRequest(sendData);

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
    phi += 2 * M_PI / 1000;
  } else {
    phi -= 2 * M_PI / 1000;
  }
  interrupts();
}

void sendData()
{
  char data[16];
  char strphi[8];
  dtostrf(phi, 7, 4, strphi);
  sprintf(data, "%s", strphi);
  Wire.write(data, sizeof(data));
}