'use strict';
const express = require('express');
var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
const app = express();
const exphbs = require('express-handlebars');
const PORT = process.env.PORT || 5000;
const path = require('path');
const pg = require('pg');
const Pool = pg.Pool;

let useSSL = false;
const local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}

const connectionString =
  process.env.DATABASE_URL ||
  'postgresql://diction:19970823@localhost:5432/greetings';

const pool = new Pool({
    connectionString,
    ssl: useSSL
});

const GreetingsRoutes = require('./greetRoutes');
const Greetings = require('./greet-manager/greet');

const instance = Greetings(pool);
const route = GreetingsRoutes(instance);

app.use(cookieParser('secret'));
app.use(
    session({
        secret: 'secret',
        saveUninitialized: true,
        resave: true
    })
);
app.use(flash());

app.use(express.static('public'));
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

const handlebarSetup = exphbs({
    partialsDir: './views/partials',
    viewPath: './views',
    layoutsDir: './views/layouts'
});

app.engine('handlebars', handlebarSetup);
app.set('view engine', 'handlebars');

app.get('/', route.index);
app.post('/greet', route.addName);
app.get('/greeted', route.greeted);
app.get('/delete', route.delet);
app.get('/user/:userName', route.countFor);

app.listen(PORT, function () {
    console.log('App started at port:', PORT);
});
