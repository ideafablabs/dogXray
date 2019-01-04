const express = require('express');
const app = express();
const http = require('http').Server(app);
const io = require('socket.io')(http);


console.log("Initialing Raspberry Pi Librarys and GPIO")
const raspi = require('raspi');
const gpio = require('raspi-gpio');
  
var input04 = null;
var input05 = null;
var input06 = null;
var input12 = null;
var input13 = null;
var input16 = null;
var input17 = null;
var input19 = null;
var input20 = null;
var input21 = null;
var input22 = null;
var input25 = null;
var input26 = null;
var input27 = null;
 
raspi.init(() => {
  input04 = new gpio.DigitalInput({
      pin: 'GPIO4',
      pullResistor : gpio.PULL_UP
  });
   
  console.log("Intialized GPIO04 with values : " + input04.read());

  input05 = new gpio.DigitalInput({
      pin: 'GPIO5',
      pullResistor : gpio.PULL_UP
  });
    
  console.log("Intialized GPIO05 with values : " + input05.read());      

  input06 = new gpio.DigitalInput({
      pin: 'GPIO6',
      pullResistor : gpio.PULL_UP
  });
    
  console.log("Intialized GPIO06 with values : " + input06.read());

  input12 = new gpio.DigitalInput({
      pin: 'GPIO12',
      pullResistor : gpio.PULL_UP
  });
    
  console.log("Intialized GPIO12 with values : " + input12.read());

  input13 = new gpio.DigitalInput({
      pin: 'GPIO13',
      pullResistor : gpio.PULL_UP
  });
    
  console.log("Intialized GPIO13 with values : " + input13.read());

  input16 = new gpio.DigitalInput({
      pin: 'GPIO16',
      pullResistor : gpio.PULL_UP
  });
    
  console.log("Intialized GPIO16 with values : " + input16.read());


  input17 = new gpio.DigitalInput({
    pin: 'GPIO17',
    pullResistor : gpio.PULL_UP
  });
  
  console.log("Intialized GPIO17 with values : " + input17.read());

  input19 = new gpio.DigitalInput({
      pin: 'GPIO19',
      pullResistor : gpio.PULL_UP
  });
    
  console.log("Intialized GPIO19 with values : " + input19.read());
  
  input20 = new gpio.DigitalInput({
      pin: 'GPIO20',
      pullResistor : gpio.PULL_UP
  });
    
  console.log("Intialized GPIO20 with values : " + input20.read());

  input21 = new gpio.DigitalInput({
      pin: 'GPIO21',
      pullResistor : gpio.PULL_UP
  });
    
  console.log("Intialized GPIO21 with values : " + input21.read());

  input22 = new gpio.DigitalInput({
      pin: 'GPIO22',
      pullResistor : gpio.PULL_UP
  });
  
  console.log("Intialized GPIO22 with values : " + input22.read());
  
  input25 = new gpio.DigitalInput({
      pin: 'GPIO25',
      pullResistor : gpio.PULL_UP
  });
  
  console.log("Intialized GPIO25 with value : " + input25.read());
  
  input26 = new gpio.DigitalInput({
      pin: 'GPIO26',
      pullResistor: gpio.PULL_UP
  });
  
  console.log("Intialized GPIO26 with value : " + input26.read());
  
  input27 = new gpio.DigitalInput({
      pin: 'GPIO27',
      pullResistor : gpio.PULL_UP
  });
  
  console.log("Intialized GPIO27 with value : " + input27.read());
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

        var gpio04Val = input04.read();
        if(gpio04Val == 0){
            io.emit('detection', '04');
        }
          
        var gpio05Val = input05.read();
        if(gpio05Val == 0){
            io.emit('detection', '05');
        }

        var gpio06Val = input06.read();
        if(gpio06Val == 0){
            io.emit('detection', '06');
        }

        var gpio12Val = input12.read();
        if(gpio12Val == 0){
            io.emit('detection', '12');
        }

        var gpio13Val = input13.read();
        if(gpio13Val == 0){
            io.emit('detection', '13');
        }

        var gpio16Val = input16.read();
        if(gpio16Val == 0){
            io.emit('detection', '16');
        }

        var gpio17Val = input17.read();
        if(gpio17Val == 0){
            io.emit('detection', '17');
        }

        var gpio19Val = input19.read();
        if(gpio19Val == 0){
            io.emit('detection', '19');
        }

        var gpio20Val = input20.read();
        if(gpio20Val == 0){
            io.emit('detection', '20');
        }

        var gpio21Val = input21.read();
        if(gpio21Val == 0){
            io.emit('detection', '21');
        }
       
        var gpio22Val = input22.read();
        if(gpio22Val == 0){
            io.emit('detection', '22');
        }

        var gpio25Val = input25.read();
        if(gpio25Val == 0){
            io.emit('detection', '25');
        }

        var gpio26Val = input26.read();
        if(gpio26Val == 0){
            io.emit('detection', '26');
        }
      
        var gpio27Val = input27.read();
        if(gpio27Val == 0){
            io.emit('detection', '27');
        }

        is_running = false; 
    }
  }, 100);