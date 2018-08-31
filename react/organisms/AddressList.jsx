import React from 'react';

class AddressList extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      addressData: this.props.addressData
    }

    this.filterAddresses = this.filterAddresses.bind(this);
  }

  filterAddresses(e) {
    const filteredAddressData = this.props.addressData.filter((address) => (
      address.addressLine.toLowerCase().indexOf(e.target.value.toLowerCase()) !== -1
    ));

    this.setState({ addressData : filteredAddressData });
  }

  render() {
    return (
      <React.Fragment>
        <input className="addressSearch" type="text" placeholder="Search..." onChange={ this.filterAddresses }></input>
        <ul className="addressList">
          {
            this.state.addressData.map((address, i) => {
              const { addressLine } = address;
              return (
                <li key={ addressLine + i }>{ address.addressLine }</li>
              )
            })
          }
        </ul>
      </React.Fragment>
    );
  }
}

export default AddressList;
