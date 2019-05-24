import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      carData: []
    };
  }
  componentDidMount () {
    axios.get('/api/carousel')
      .then(prodData => {
        this.setState({
          carData: prodData.data
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
  render () {
    return (
      <>
        <img src={this.state.carData[0] ? this.state.carData[0].image : `https://s3.amazonaws.com/fec.amazin/1000_1.jpg`}/>
        <div>
          {this.state.carData[0]? this.state.carData[0].prodName : `Placeholder`}
        </div>
      </>
    )
  }
}

ReactDOM.render(<App/>, document.getElementsByClassName('carousel')[0]);