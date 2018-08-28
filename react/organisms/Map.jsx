import React from 'react';
import scriptLoader from 'react-async-script-loader';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
    this.geocoder = null;
  }

  componentWillReceiveProps({ isScriptLoadSucceed, addressData }) {
    if (!!isScriptLoadSucceed) {
      var markers = [];

      this.map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 37.7749300, lng: -122.4194200 }
      });

      addressData.forEach((address) => {
        console.log(address, address)
        // const { lat, lng } = address.location;
        //
        // const  marker = new window.google.maps.Marker({
        //   position: new google.maps.LatLng(lat, lng),
        //   map: this.map
        // });
      });
    } else {
      console.error('google maps script not loaded');
    }
  }

  render() {
    return (
      <div>
        <div id="map" style={ { height: "600px" } }></div>
      </div>
    );
  }
}

export default scriptLoader(
  ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCrc1S-X-ms57CIrEe7IUDQCFJvuirvxPQ']
)(Map);
