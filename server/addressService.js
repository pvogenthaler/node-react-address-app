const fs = require('fs');
const readline = require('readline');
const path = require('path');
const axios = require('axios');

let addressData = []; // address, lat lng, and location type
let filteredAddressData = []; // filtered by ROOFTOP location type
const addressLines = {};

function initAddresses() {
  const addressesJSONPath = path.resolve(__dirname, 'data/addresses.json');

  if (fs.existsSync(addressesJSONPath)) {
    addressData = JSON.parse(fs.readFileSync(addressesJSONPath, 'utf8'));
    return;
  }

  const addressCSVPath = path.resolve(__dirname, 'data/addresses.csv');

  readline
    .createInterface({
      input: fs.createReadStream(addressCSVPath),
      output: null,
      terminal: false
    })
    .on('line', handleAddressLine)
    .on('close', () => {
      geocodeAndFilterAddresses();
    });
}

function handleAddressLine(line) {
  line = line.replace(/"/g, '');

  // check for duplicates or non-address
  if (!!addressLines[line] || line.split(',').length < 3) {
    return;
  }

  addressLines[line] = true;

  addressData.push({
    addressLine: line
  });
}

function geocodeAndFilterAddresses() {
  let index = 0;

  const interval = setInterval(() => {
    if (index > addressData.length - 1) {
      clearInterval(interval);
      return;
    }

    geocodeAddress(index++);
  }, 200); // to avoid google geocode api query limit
}

function geocodeAddress(index) {
  axios
    .get(
      'https://maps.googleapis.com/maps/api/geocode/json?key= AIzaSyCh6PRLuIMe4xCozd9eVLB3_KER9Ygr8DE&address=' + addressData[index].addressLine
    )
    .then((res) => {
      const { status } = res.data;

      if (status !== 'OK') {
        console.info('Geocoding unsuccessful: ', status, 'Address line: ', addressData[index].addressLine);
        return;
      }

      addressData[index].geolocationResults = res.data.results[0];

      if (index === addressData.length - 1) { // address geocoding complete
        filteredAddressData = addressData.filter((address) => (
          !!address.geolocationResults &&
          address.geolocationResults.geometry.location_type === 'ROOFTOP'
        ));

        writeAddressesJSONFile();
      }
    })
    .catch((err) => {
      console.error('Error geocoding address: ', err, 'Index: ', index, 'Address: ', addressData[index]);
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
