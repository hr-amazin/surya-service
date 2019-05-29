import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import Slide from './Components/slide.jsx';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 90%;
  heigth: 280px
  diplay: inline-block;
  background-color: red
  padding: auto;
  margin: auto;
`;

class Carousel extends React.Component {
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
    const settings = {
      dots: false,
      infinite: false,
      speed: 500,
      slidesToShow: 7,
      slidesToScroll: 7,
      arrows: true
    };
    if (this.state.carData.length !== 0) {
      return (
        <Wrapper>
            <Slider {...settings}>
              {this.state.carData.map((prod, i) => (<Slide key = {i} image = {prod.image}/>))}
            </Slider>
        </Wrapper>
      )
    } else {
      return (
        <>
          Placeholder
        </>
      )
    }
  }
}

ReactDOM.render(<Carousel/>, document.getElementsByClassName('carousel')[0]);