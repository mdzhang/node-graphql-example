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

// Catch all error handling
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.end(err.message);
// });

// ----------------------------------------
// server shutdown
// ----------------------------------------
process.on('message', (msg) => {
  if (msg === 'shutdown') {
    console.log('Closing all connections...');

    setTimeout(() => {
      console.log('Finished closing connections');
      process.exit(0);
    }, 300);
  }
});
