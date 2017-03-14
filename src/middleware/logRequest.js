import morgan from 'morgan';

const LOG_FORMAT = '[:pid] :remote-addr - :remote-user\
[:date[clf]] ":method :url HTTP/:http-version" :status :res[content-length]';

morgan.token('pid', () => process.pid);

const logRequest = morgan(LOG_FORMAT);

export default logRequest;
