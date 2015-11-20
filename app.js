var express = require('express'),
  fs = require('fs'),
  config = require('./config/config'),
  session        = require('express-session'),
	flash          = require('connect-flash');

var ejs = require('ejs');

var app = express();

app.use(flash());

app.set('views', __dirname + '/app/views');
app.engine('.ejs', require('ejs-locals'));
app.set('view engine', '.ejs');
//app.locals.layout = 'layout.ejs';
app.locals._layoutFile = '../layout';
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: 'helloworld', // TODO - change this to something more unique and random - PJ
    maxAge: new Date(Date.now() + 1800000)    //half hour
  }));
app.use(function(req,res,next){
	res.locals.hasMessages = function(){
      return Object.keys(req.session.flash || {}).length;
    };

    res.locals.messages = function(){
      return (function(){
        var msgs = req.flash();
        return Object.keys(msgs).reduce(function(arr, type){
          var message = {};
          message.type = type;
          message.message = msgs[type];
          return [message];
        }, []);
      })();
    };
    next();
})

require('./config/express')(app, config);
require('./config/routes')(app);

app.listen(config.port,function(){
  console.log("server started"+config.port);
});
