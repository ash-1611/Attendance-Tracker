const fs = require('fs');
const path = require('path');

const logDir = path.join(__dirname, '../../logs');

// Create logs directory if it doesn't exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

const getTimestamp = () => {
  return new Date().toISOString();
};

const logger = {
  info: (message, data = {}) => {
    const logMessage = `[${getTimestamp()}] [INFO] ${message}`;
    console.log(logMessage, data);
  },

  error: (message, error = {}) => {
    const logMessage = `[${getTimestamp()}] [ERROR] ${message}`;
    console.error(logMessage, error);
    
    // Write to error log file
    fs.appendFileSync(
      path.join(logDir, 'error.log'),
      `${logMessage}\n${JSON.stringify(error)}\n\n`
    );
  },

  warn: (message, data = {}) => {
    const logMessage = `[${getTimestamp()}] [WARN] ${message}`;
    console.warn(logMessage, data);
  },

  debug: (message, data = {}) => {
    if (process.env.NODE_ENV === 'development') {
      const logMessage = `[${getTimestamp()}] [DEBUG] ${message}`;
      console.log(logMessage, data);
    }
  },
};

module.exports = logger;
