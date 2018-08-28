const app = require('./app.js');
const http = require('http');
const initAddresses = require('./addressService').initAddresses;

const port = process.env.PORT || 3000;

http.createServer(app).listen(port, () => {
  console.log('Listening on port: ', port);

  initAddresses();
});
