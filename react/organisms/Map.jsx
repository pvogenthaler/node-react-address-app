import React from 'react';
import scriptLoader from 'react-async-script-loader';

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.map = null;
  }

  componentWillReceiveProps({ isScriptLoadSucceed, addressData }) {
    if (!!isScriptLoadSucceed) {
      this.map = new window.google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: { lat: 37.7749300, lng: -122.4194200 }
      });

      const bounds = new window.google.maps.LatLngBounds();

      addressData.forEach((address) => {
        const { lat, lng } = address.geolocationResults.geometry.location;
        const  marker = new window.google.maps.Marker({
          position: new window.google.maps.LatLng(lat, lng),
          title: address.addressLine,
          map: this.map
        });

        bounds.extend(marker.position);

        const infowindow = new google.maps.InfoWindow({
          content: `<span>${address.addressLine}</span>`
        });

        window.google.maps.event.addListener(marker, 'click', () => {
          infowindow.open(this.map, marker);
        });
      });

      this.map.fitBounds(bounds);
    }
  }

  render() {
    return (
      <div className="mapContainer">
        <div id="map" style={ { height: "600px" } }></div>
      </div>
    );
  }
}

export default scriptLoader(
  ['https://maps.googleapis.com/maps/api/js?key=AIzaSyCh6PRLuIMe4xCozd9eVLB3_KER9Ygr8DE']
)(Map);
