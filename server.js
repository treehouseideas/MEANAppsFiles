/**
 * Created by SirNap on 5/13/15.
 */

var express = require('express'),
    stylus = require('stylus'),
    logger = require('morgan'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var env = process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var app = express();

function compile(str, path){
    return stylus(str).set('filename', path);
}

app.set('views', __dirname + '/server/views');
app.set('view engine', 'jade');
app.use(logger ('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(stylus.middleware(
    {
        src: __dirname + '/public',
        compile: compile
    }
));

app.use(express.static(__dirname + '/public'));

mongoose.connect('mongodb://localhost/MEANAppsFiles');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error...'));
db.once('open', function callback(){
    console.log('Database OPENED');
})

app.get('/partials/:partialPath', function (req, res){
    res.render('partials/' + req.params.partialPath);
})

app.get ('*', function(req, res){
    res.render('index');
});

var port = 3030;
app.listen(port);
console.log('Listening on port ' + port + '...');