const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fs = require('fs');
const readline = require('readline');

app.use(express.static(__dirname));

app.get('/addresses', (req, res) => {
  const addressFilePath = `${__dirname}/addresses.csv`;
  const addressData = [];

  readline
    .createInterface({
      input: fs.createReadStream(addressFilePath),
      output: null,
      terminal: false
    })
    .on('line', (line) => {
      const address = line.split(',');

      if (address.length !== 3) {
        return; // must have address1, street, and state
      }

      const stateAndZip = address[2].trim().split(' ');
      const hasZip = stateAndZip.length > 1;

      addressData.push({
        address1: address[0],
        city: address[1],
        state: stateAndZip[0],
        zip: hasZip ? stateAndZip[1] : null
      });
    })
    .on('close', () => {
      res.send(addressData);
    });
});

app.listen(port, () => {
  console.info('Listening on port ' + port);
});
