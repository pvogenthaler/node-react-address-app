import React from 'react';
import axios from 'axios';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Map from '../organisms/Map';
import AddressList from '../organisms/AddressList';

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
        console.error('Error getting addresses: ', err);
      });
  }

  render() {
    const { addressData } = this.state;

    return (
      <Tabs>
        <TabList>
          <Tab>Map</Tab>
          <Tab>Address List</Tab>
        </TabList>
        <TabPanel>
          <Map { ...{ addressData } }/>
        </TabPanel>
        <TabPanel>
          <AddressList { ...{ addressData } }/>
        </TabPanel>
      </Tabs>
    );
  }
}

export default Addresses;
