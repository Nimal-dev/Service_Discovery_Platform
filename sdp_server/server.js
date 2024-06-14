const express = require('express');
const db = require('./config/db');
var bodyParser = require('body-parser');
var cors = require('cors');
const session = require('express-session');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
}));

const port = 4000;


const authRouter = require('./Routes/Router');
const adminRouter = require('./Routes/adminRouter');
const providerRouter = require('./Routes/providerRouter');
const customerRouter = require('./Routes/customerRouter');

db();

app.get('/', (req, res) => { res.send('Loaded'); });
app.use('/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/provider', providerRouter);
app.use('/customer', customerRouter);

app.listen(port, () => { console.log('Server Is Running'); });