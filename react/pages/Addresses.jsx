import React from 'react';
import axios from 'axios';
import Map from '../organisms/Map';

class Addresses extends React.Component {
  constructor() {
    super();

    this.state = {
      addresses: []
    }
  }

  componentDidMount() {
    axios
      .get('/addresses')
      .then((res) => {
        this.setState({
          addressData: res.data
        });
      })
      .catch((err) => {
        debugger;
        console.error('Error getting addresses: ', err);
      });
  }

  render() {
    const { addressData } = this.state;

    return (
      <div>
        <Map { ...{ addressData } }/>
      </div>
    );
  }
}

export default Addresses;
