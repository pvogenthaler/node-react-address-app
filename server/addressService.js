const fs = require('fs');
const readline = require('readline');
const path = require('path');
const axios = require('axios');

let addressData = []; // address, lat lng, and location type
let filteredAddressData = []; // filtered by ROOFTOP location type

function initAddresses() {
  const addressesJSONPath = path.resolve(__dirname, 'data/addresses.json');

  if (fs.existsSync(addressesJSONPath)) {
    addressData = JSON.parse(fs.readFileSync(addressesJSONPath, 'utf8'));
    return;
  }

  const addressCSVPath = path.resolve(__dirname, 'data/addressesTest.csv');

  readline
    .createInterface({
      input: fs.createReadStream(addressCSVPath),
      output: null,
      terminal: false
    })
    .on('line', parseAddressLine)
    .on('close', () => {
      geocodeAndFilterAddresses();
    });
}

function parseAddressLine(line) {
  line = line.replace(/"/g, '');
  const address = line.split(',');

  if (address.length < 3) {
    return; // must have address1, street, and state
  }

  const stateAndZip = address[2].trim().split(' ');
  const hasZip = stateAndZip.length > 1;

  addressData.push({
    addressLine: line,
    address1: address[0],
    city: address[1],
    state: stateAndZip[0],
    zip: hasZip ? stateAndZip[1] : null
  });
}

function geocodeAndFilterAddresses() {
  let index = 0;

  const interval = setInterval(() => {
    if (index > addressData.length - 1) {
      clearInterval(interval);
      return;
    }

    geocodeAddress(index);
    index++;
  }, 200); // to avoid google geocode api query limit
}

function geocodeAddress(index) {
  axios
    .get(
      'http://maps.googleapis.com/maps/api/geocode/json?address=' +
      addressData[index].addressLine
    )
    .then((res) => {
      const { status } = res.data;

      if (status !== 'OK') {
        console.info('Geocoding unsuccessful: ', status, 'Address line: ', addressData[index].addressLine);
        return;
      }

      const { location, location_type } = res.data.results[0].geometry;

      addressData[index].location = location;
      addressData[index].locationType = location_type;

      if (index === addressData.length - 1) { // address geocoding complete
        filteredAddressData = addressData.filter((address) => (
          address.locationType === 'ROOFTOP'
        ));

        writeAddressesJSONFile();
      }
    })
    .catch((err) => {
      console.log('Error geocoding address: ', err, 'Index: ', index);
    });
}

function writeAddressesJSONFile() {
  fs.writeFile('server/data/addresses.json', JSON.stringify(filteredAddressData), 'utf8', () => {});
}

function getAddresses() {
  return filteredAddressData;
}

module.exports = {
  initAddresses,
  getAddresses
};
