const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const router = require('./router');

const app = express();
const port = 4000;

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, '../client/dist')));

app.use('/api', bodyParser.json());
app.use('/api', bodyParser.urlencoded({ extended: true }));
app.use('/api', router);

app.listen(port, () => console.log(`Listening on port ${port}`));