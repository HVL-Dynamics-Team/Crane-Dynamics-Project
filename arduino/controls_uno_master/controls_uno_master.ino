#include <Wire.h>

// Declare addresses on the I2C network to 'slave' boards.
#define addressBody1 8
#define addressBody2 9
#define addressBody3 10

// Declare size of requested message over I2C
#define sizeOfI2CData 16

// Declare pins for starting the program and for turning on the indicator LED.
#define startPin 4
#define ledPin 6

unsigned int TIME_BETWEEN_DATA_TRANSMISSIONS = 500;

void setup() 
{
  Serial.begin(9600); // Set baud rate for serial communicatoin.
  Wire.begin(); // Set empty address for I2C communication. Empty address implies that this board is the 'master' or 'controller'

  pinMode(startPin, OUTPUT);
  pinMode(ledPin, OUTPUT);
  digitalWrite(ledPin, HIGH);
  digitalWrite(startPin, HIGH);

  char startMsg[64];
  char strTime[8];
  unsigned long int starttime;
  starttime = millis();
  dtostrf(starttime, 7, 0, strTime);
  sprintf(startMsg, "b_ t: %s \t th: 0 \t ph: 0 \t ps: 0 e_", strTime);
  Serial.println(startMsg);

  //delay(100);
  //digitalWrite(startPin, LOW);
}

void loop() 
{
  delay(TIME_BETWEEN_DATA_TRANSMISSIONS); // Wait 500ms before requesting data from I2C network and sending over serial. Waiting so that it does not flood the database with variables.

  // Reserve memory for message buffers receiving data from the I2C network, as well as buffers for messages being sent over serial.
  char dataBody1[17];
  char dataBody2[17];
  char dataBody3[17];

  // Request data from the UNO-board for body-1
  int i = 0;
  Wire.requestFrom(addressBody1, sizeOfI2CData);
  while (Wire.available())
  {
    dataBody1[i] = Wire.read();
    i += 1;
  }
  dataBody1[i] = '\0';

  // Request data from the UNO-board for body-2
  i = 0;
  Wire.requestFrom(addressBody2, sizeOfI2CData);
  while (Wire.available())
  {
    dataBody2[i] = Wire.read();
    i += 1;
  }
  dataBody2[i] = '\0';

  // Request data from the UNO-board for body-3
  i = 0;
  Wire.requestFrom(addressBody3, sizeOfI2CData);
  while (Wire.available())
  {
    dataBody3[i] = Wire.read();
    i += 1;
  }
  dataBody3[i] = '\0';

  char msg[64];
  char strTime[8];
  unsigned long int timestamp = millis();
  dtostrf(timestamp, 7, 0, strTime);
  sprintf(msg, "b_ t: %s th: %s ph: %s ps: %s s_", strTime, dataBody1, dataBody2, dataBody3);
  //Serial.print("Byte size: ");
  //Serial.print(sizeof(msg));
  //Serial.print(" ");
  Serial.println(msg);
}