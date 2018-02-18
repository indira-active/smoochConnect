const baseScript = (io)=>{
    const express = require('express');
    const path = require('path');
    const favicon = require('serve-favicon');
    const logger = require('morgan');
    const cookieParser = require('cookie-parser');
    const bodyParser = require('body-parser');
    const SmoochCore = require('smooch-core');
    const cors = require('cors');
    const smooch = new SmoochCore({
        keyId: process.env.KEY_ID,
        secret: process.env.SECRET,
        scope: 'app', // account or app
    });
     /* smooch.appUsers.getMessages('a40202931d3f6780bf418279').then((response) => {
      console.log("\n".repeat(5));
       console.log(response.messages);
       console.log("\n".repeat(5));
   }).catch(err=>{
     console.error('looks like there was an error see it below');
     console.error(err)
   }) */ 
    const api = require('./routes/api')(smooch);
    const hook = require('./routes/hook')(io,smooch);
    
    
    const app = express();
    
    // view engine setup
    app.set('views', path.join(__dirname, 'views'));
    app.set('view engine', 'jade');
    
    // uncomment after placing your favicon in /public
    //app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
    app.use(logger('dev'));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use(cors());
    app.use('/api', api);
    app.use('/hook', hook);
    
    app.use(express.static(path.join(__dirname,'public')));
    app.get("*",(req,res)=>{
      res.json({welcome:"to indira api endpoint, docs to be placed here soon"})
    })
    
    // catch 404 and forward to error handler
    app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
    });
    
    // error handler
    app.use(function(err, req, res, next) {
      // set locals, only providing error in development
      res.locals.message = err.message;
      res.locals.error = req.app.get('env') === 'development' ? err : {};
    
      // render the error page
      res.status(err.status || 500);
      res.render('error');
    });
    
    return {app,smooch}
    }
    
    module.exports = baseScript;
    