/* eslint-disable no-console */
// express error-handling middleware always takes four arguments
const handleError = (err, req, res, next) => { // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const title = err.name || 'InternalServerError';
  const message = err.message || 'Whoops, something went wrong.';

  console.error(err.stack);
  res.statusCode = status;

  const accept = req.headers.accept;

  if (accept.includes('html')) {
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.end(`<html><body>${message}</body></html>`);
  } else if (accept.includes('json')) {
    const body = {
      errors: [
        {
          status,
          title,
          detail: message,
        },
      ],
    };

    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(body));
  } else {
    res.setHeader('Content-Type', 'text/plain');
    res.end(message);
  }
};

export default handleError;
