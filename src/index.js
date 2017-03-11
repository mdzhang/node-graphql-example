import express from 'express';
import routes from './routes';

const port = process.env.PORT || 8080;
const host = 'localhost';
const app = express();

// ----------------------------------------
// routes
// ----------------------------------------
app.use('/', routes);

// ----------------------------------------
// server start
// ----------------------------------------
app.listen(port, host, (err) => {
  if (err) console.log(err);
  else console.log(`Application listening on port: ${port}`);
});