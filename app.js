const express = require('express');
const passport = require('passport')
const dotenv = require('dotenv');
var cors = require('cors');

const userRouter = require('./routes/userRouter');
const accountRouter = require('./routes/accountRouter');
const machineryRouter = require('./routes/machineryRouter');
const authenticateRouter = require('./routes/authenticateRouter');
const procealarmas = require('./routes/procealarmasRouter');

dotenv.config();
const app = express();

app.use( (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.options('*', cors())

app.use(passport.initialize());

app.use('/users', userRouter);
app.use('/account', accountRouter);
app.use('/machineries', machineryRouter);
app.use('/authenticate', authenticateRouter);
app.use('/procealarmas', procealarmas);

const port = process.env.PORT || 8001;

app.listen(port, ()=> {
  console.log(`Api escuchando en el puerto ${port}`);
});
