const app = require('./app');
const http = require('http');
const port = process.env.PORT || 5000;
const { initializeSocket } = require('./socket');

const server = http.createServer(app);

initializeSocket(server);

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
