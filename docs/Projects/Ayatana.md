# [Ayatana](https://en.wikipedia.org/wiki/Ayatana)

A wireless sensor system to control Lluis house and Orxata

## NodeMCU

[NodeMCU](https://en.wikipedia.org/wiki/NodeMCU)
[A Beginner's Guide to the ESP8266](https://tttapa.github.io/ESP8266/Chap01%20-%20ESP8266.html)


## Saḷāyatana and Mano

### Sensors

For continuos data they should run a websocket server.
The frequency should be different for each sensor

Types of sensors:

- Voltage
- Current
- Temperture
- Humidy

### Actuators

Most of actuators could work on a rest api buy could also work on websockets

- Relay
- LED RGB
- Audio ?

### Layout

Master

Read sensors
- Have a registry or existing sensors
- Have a db table for sensor
- Stablish connection if does not exist
- Get data based on script
  - Frequency/continuos
  - Complex logic/events
  - User request via http or ws server
- Store sensor data by timestamp

Serve data
- Expose local ws or http server
  - Anyone can connect
- Expose public http server
  - Have a registry of valid keys

Serve UI
- Uses data server

Nodemcus sensor

- Expose http or ws server
- Stablish reading frequency
- Set serving frequency
- Read value
- Store value with its timestamp
- Serve values since asked until limit
    - 
### References

[Beautiful monitoring graphs and site design](https://apex.sh/ping/)
https://github.com/apexcharts/apexcharts.js


## Sensors

| To mesure   | Type   | Hz  | Devices          |
|-------------|--------|-----|------------------|
| Voltage     | Number | 10  | Nodemcu + sensor |
| Current     | Number | 10  | Nodemcu + sensor |
| Temperature | Number | 100 | Nodemcu + sensor |
| Humidity    | Number | 100 | Nodemcu + sensor |
| Video       | Stream | 10  | Camera           |
|             |        |     |                  |

## Actuators

| To mesure | Type   | Hz | Devices         |
|-----------|--------|----|-----------------|
| Gong      | Bool   | 10 | Nodemcu + relay |
| RGB led   | Number | 10 | Nodemcu + led   |
