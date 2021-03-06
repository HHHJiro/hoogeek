var express = require('express');
var path= require('path')
var session = require('express-session')
var mongoose = require('mongoose')
var fs = require('fs')
mongoose.Promise = require('bluebird');
var mongoStore = require('connect-mongo')(session)

var logger = require('morgan')
var bodyParser= require('body-parser')
var cookieParser = require('cookie-parser')

var port = process.env.PORT || 3000 ;
var app = express();
var dbUrl = 'mongodb://localhost/imooc'
app.locals.moment = require('moment')

mongoose.connect(dbUrl)
//model loading
var models_path = __dirname + '/app/models'
var walk = function(path){
	fs
		.readdirSync(path)
		.forEach(function(file){
			var newPath = path + '/' + file
			var stat = fs.statSync(newPath) 
		if(stat.isFile()){
			if (/(.*)\.(js|coffee)/.test(file)) {
				require(newPath)
			}
		}
		else if (stat.isDirectory()){
				walk(newPath)
			}
		})
}
walk(models_path)
//视图的根目录
app.set('views', './app/views/pages')
app.set('view engine', 'jade')
// app.use(express.bodyParser())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(require('connect-multiparty')());
app.use(cookieParser())
app.use(session({
  secret: 'imooc',
  store:new mongoStore({
  	url:dbUrl,
  	collection:'sessions'
  })
}))
app.use(express.static(path.join(__dirname, 'public')))



if ('development' === app.get('env')) {
	app.set('showStackError',true)
	app.use(logger(':method :url :response-time'))
	app.locals.pretty = true
	mongoose.set('debug',true)
}


app.listen(port)
require('./config/routes')(app)
console.log('imooc started on port :'+ port)