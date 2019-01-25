const express = require('express');
const passport = require('passport');

const hostRouter = require('./routes/hostRouter');
const eventRouter = require('./routes/eventRouter');
const alertRouter = require('./routes/alertRouter');
const alarmRouter = require('./routes/alarmRouter');
const nodeRouter = require('./routes/nodeRouter');
const authenticateRouter = require('./routes/authenticateRouter');
const apiConfig = require('./config').api;

const app = express();

app.use(passport.initialize());
app.use('/authenticate', authenticateRouter);
app.use('/getHosts', hostRouter);
app.use('/events', eventRouter);
app.use('/alerts', alertRouter);
app.use('/getAlarms', alarmRouter)
app.use('/getNodes', nodeRouter);

app.listen(apiConfig.port, apiConfig.hostname, () => console.log(`Server running at http://${apiConfig.hostname}:${apiConfig.port}`));