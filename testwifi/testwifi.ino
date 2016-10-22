#include <WiFi.h>
#include <SoftwareSerial.h>
#include <Brain.h>

char ssid[] = "Minnetronix Guest WiFi";     //  your network SSID (name) 
char pass[] = "6519174060";    // your network password
int status = WL_IDLE_STATUS;     // the Wifi radio's status

WiFiClient client;
//IPAddress server(173,194,73,105);  // numeric IP for Google (no DNS)
IPAddress server(192,168,60,64);  //IP for local computer 

Brain brain(Serial);

void setup() {
  // initialize serial:
  Serial.begin(9600);

  // attempt to connect using WPA2 encryption:
  Serial.println("Attempting to connect to WPA network...");
  status = WiFi.begin(ssid, pass);

  // if you're not connected, stop here:
  if ( status != WL_CONNECTED) { 
    Serial.println("Couldn't get a wifi connection");
    while(true);
  } 
  // if you are connected, print out info about the connection:
  else {
    Serial.println("Connected to network");
  }

  if (client.connect(server, 3000)) {
    Serial.println("Server connection opened");
  } else {
    Serial.println("Server connection error");
  }
}

void loop() {

  if (brain.update()) {
    //Serial.println(brain.readErrors()); //error messages from brainflex
    Serial.println(brain.readCSV());
    
    String data = String(brain.readCSV());

    Serial.println("\nStarting connection to server...");
    client.println("POST /dataStream?data="+data+" HTTP/1.1");
    client.println("Host:192.168.60.64:3000");
    client.println();
    }
  
  // if there are incoming bytes available 
  // from the server, read them and print them:
  while (client.available()) {
    char c = client.read();
    Serial.write(c);
  }

  // if the server's disconnected, stop the client:
//  if (!client.connected()) {
//    Serial.println();
//    Serial.println("disconnecting from server.");
//    client.stop();
//
//    // do nothing forevermore:
//    while(true);
//  }
}

