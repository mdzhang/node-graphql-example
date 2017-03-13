import express from 'express';
import routes from './routes';
import morgan from 'morgan';

const port = process.env.PORT || 8080;
const host = 'localhost';
const app = express();

// ----------------------------------------
// logger
// ----------------------------------------
morgan.token('pid', () => process.pid);

app.use(morgan('[:pid] :remote-addr - :remote-user [:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]'));

// ----------------------------------------
// routes
// ----------------------------------------
app.use('/', routes);

// ----------------------------------------
// default error handler
// ----------------------------------------
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.end(err.message);
});

// ----------------------------------------
// server start
// ----------------------------------------
const server = app.listen(port, host, (err) => {
  if (err) console.log(err);
  else {
    console.log(`[${process.pid}] Application listening on port: ${port}`);
    process.send('ready');
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
