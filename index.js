const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);

var variant = process.argv.slice(2);
console.log(variant);

if(variant == 'prod'){
  console.log("Initialing Raspberry Pi Librarys and GPIO")
  const raspi = require('raspi');
  const gpio = require('raspi-gpio');
  
  var input17 = null;
  var input22 = null;
  var input23 = null;
  var input24 = null;
  var input27 = null;
  
  raspi.init(() => {
    input17 = new gpio.DigitalInput({
      pin: 'GPIO17',
      pullResistor : gpio.PULL_UP
    });
  
    console.log("Intialized GPIO17 with values : " + input17.read());
  
    input22 = new gpio.DigitalInput({
      pin: 'GPIO22',
      pullResistor : gpio.PULL_UP
    });
  
    console.log("Intialized GPIO22 with values : " + input22.read());
  
    input23 = new gpio.DigitalInput({
      pin: 'GPIO23',
      pullResistor : gpio.PULL_UP
    });
  
    console.log("Intialized GPIO23 with value : " + input23.read());
  
    input24 = new gpio.DigitalInput({
      pin: 'GPIO24',
      pullResistor: gpio.PULL_UP
    });
  
    console.log("Intialized GPIO24 with value : " + input24.read());
  
    input27 = new gpio.DigitalInput({
      pin: 'GPIO27',
      pullResistor : gpio.PULL_UP
    });
    console.log("Intialized GPIO27 with value : " + input27.read());
  });
} else {
  console.log("RUNNING IN DEVELOPMENT MODE")
}


app.use(express.static(__dirname + '/public'));

app.get('/', function(req, res){
    res.sendFile('/index.html');
});

var is_running = true;
io.on('connection', function(socket){
    console.log('connected user');
    is_running = false;

    if(variant == 'dev'){
        console.log("SETTING UP SIMULATION LISTENER");
        socket.on('simulation', function(msg){
            console.log("Simulating GPIO: " + msg);
            socket.emit('detection', msg);
        });
    }

    socket.on('disconnect', function(socket){
        console.log('disconnected user');
        is_running = true;
    });
});

http.listen(3000, function(){
    console.log('listening on *:3000');
});

if(variant == 'prod'){
  setInterval(function(){
      if(!is_running){
          is_running = true;

          var gpio17Val = input17.read();
          if(gpio17Val == 0){
              io.emit('detection', '17');
          }
        
          var gpio22Val = input22.read();
          if(gpio22Val == 0){
              io.emit('detection', '22');
          }

          var gpio23Val = input23.read();
          if(gpio23Val == 0){
              io.emit('detection', '23');
          }

          var gpio24Val = input24.read();
          if(gpio24Val == 0){
              io.emit('detection', '24');
          }
      
          var gpio27Val = input27.read();
          if(gpio27Val == 0){
              io.emit('detection', '27');
          }

          is_running = false; 
      }
  }, 100);
}
