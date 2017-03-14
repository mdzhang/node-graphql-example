/* eslint-disable no-console */
import express from 'express';
import routes from './routes';
import handleError from './middleware/handleError';
import logRequest from './middleware/logRequest';

const port = process.env.PORT || 8080;
const host = 'localhost';
const app = express();

// ----------------------------------------
// logger
// ----------------------------------------
app.use(logRequest);

// ----------------------------------------
// routes
// ----------------------------------------
app.use('/', routes);

// ----------------------------------------
// default error handler
// ----------------------------------------
app.use(handleError);

// ----------------------------------------
// server start
// ----------------------------------------
const server = app.listen(port, host, (err) => {
  if (err) console.log(err);
  else {
    console.log(`[${process.pid}] Application listening on port: ${port}`);

    if (process.send) {
      process.send('ready');
    }
  }
});

// ----------------------------------------
// server shutdown
// ----------------------------------------
process.on('message', (msg) => {
  if (msg === 'shutdown') {
    console.log(`[${process.pid}] Closing all connections...`);

    setTimeout(() => {
      console.log(`[${process.pid}] Failed to close connections in time, forcing shutdown`);
      process.exit(1);
    }, 300);

    server.close((err) => {
      if (err) {
        console.log(`[${process.pid}] Failed to close connections: ${err.message}`);
        process.exit(1);
      }

      console.log(`[${process.pid}] Finished closing connections`);
      process.exit(0);
    });
  }
});
