#include <math.h>
#include <Wire.h>

int encoderChA = 3;
int encoderChB = 2;
int encoderChI = 4;

#define readA bitRead(PIND, 3)
#define readB bitRead(PIND, 2)
#define readI bitRead(PIND, 4)

#define I2C_ADDRESS 10

void readChA();

volatile float psi = 0.0;

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
    psi += 2 * M_PI / 1000;
  } else {
    psi -= 2 * M_PI / 1000;
  }
  interrupts();
}

void sendData()
{
  char data[16];
  char strpsi[8];
  dtostrf(psi, 7, 4, strpsi);
  sprintf(data, "%s", strpsi);
  Wire.write(data, 16);
}