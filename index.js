const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


console.log("Initialing Raspberry Pi Librarys and GPIO");
const raspi = require('raspi');
const gpio = require('raspi-gpio');

var inputs = [
    { io: { pin: "GPIO4",  PullResistor: gpio.PULL_UP}, output: "04" },
    { io: { pin: "GPIO5",  PullResistor: gpio.PULL_UP}, output: "05" },
    { io: { pin: "GPIO6",  PullResistor: gpio.PULL_UP}, output: "06" },
    { io: { pin: "GPIO12", PullResistor: gpio.PULL_UP}, output: "12" },
    { io: { pin: "GPIO13", PullResistor: gpio.PULL_UP}, output: "13" },
    { io: { pin: "GPIO16", PullResistor: gpio.PULL_UP}, output: "16" },
    { io: { pin: "GPIO17", PullResistor: gpio.PULL_UP}, output: "17" },
    { io: { pin: "GPIO19", PullResistor: gpio.PULL_UP}, output: "19" },
    { io: { pin: "GPIO20", PullResistor: gpio.PULL_UP}, output: "20" },
    { io: { pin: "GPIO21", PullResistor: gpio.PULL_UP}, output: "21" },
    { io: { pin: "GPIO22", PullResistor: gpio.PULL_UP}, output: "22" },
    { io: { pin: "GPIO25", PullResistor: gpio.PULL_UP}, output: "25" },
    { io: { pin: "GPIO26", PullResistor: gpio.PULL_UP}, output: "26" },
    { io: { pin: "GPIO27", PullResistor: gpio.PULL_UP}, output: "27" }
    ];

raspi.init(() => {
    inputs.forEach( function(element) {
        element.input = new gpio.DigitalInput(element.io);
        console.log("Intialized" + element.io.pin + " with values : " + element.input.read());
    });
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile('/index.html');
});

var is_running = true;
io.on('connection', function(socket){
    console.log('connected user');
    is_running = false;

    socket.on('disconnect', function(socket){
        console.log('disconnected user');
        is_running = true;
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

setInterval(function(){
    if(!is_running){
        is_running = true;

        inputs.forEach( function(element) {
            if (element.input.read() == 0)
            {
                io.emit("detection", element.output);
            }
         });

        is_running = false; 
    }
  }, 100);