import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class NodeAddressApp extends React.Component {
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
          addresses: res.data
        });
      })
      .catch((err) => {
        console.error('Error getting addresses: ', err);
      });
  }

  render() {
    return (
      <div>here!!!</div>
    );
  }
}

ReactDOM.render(
  <NodeAddressApp />,
  document.getElementById('react-root')
);
