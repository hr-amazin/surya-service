import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import styled from 'styled-components';
import Slider from 'react-slick';
import Slide from './Components/slide.jsx';

const Wrapper = styled.div`
  box-sizing: border-box;
  position: relative;
  width: 95%;
  height: 280px;
  display: inline-block;
  margin: auto
`;
const HeaderWrap = styled.h2`
  text-align: left;
  color: #C60!important;
  font-size: 16px!important;
  font-family: verdana,arial,helvetica,sans-serif!important;
  font-weight: 700;
  box-sizing: border-box;
  display: block;
  margin-block-start: 0.83em;
  margin-block-end: 0.83em;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  font-weight: bold;
`;

const ArrowWrap = styled.img`
  overflow: visible;
`;

function CarNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, top: "100px", display: "block", marginLeft: "10px auto", marginRight: "10px auto"}}
      onClick={onClick}
    >
      <ArrowWrap src ='https://s3.amazonaws.com/fec.amazin/Forward.png'/>
    </div>
  );
}

function CarPrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, top: "100px", display: "block", marginRight: 'auto'}}
      onClick={onClick}
    >
      <ArrowWrap src ='https://s3.amazonaws.com/fec.amazin/Back.png'/>
    </div>
  );
}

class Carousel extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			carData: [],
    };
    this.handleClick = this.handleClick.bind(this);
  }
  componentDidMount() {
    // let uuid = 1001; //TESTING REMOVE WHEN DEPLOYING
    let uuid = this.props.uuid;
    axios
      // .get('/api/carousel', { //TESTING REMOVE WHEN DEPLOYING
      .get('http://carousel.us-east-1.elasticbeanstalk.com/api/carousel', {
        params: {
          _id: uuid
        }
      })
      .then(prodData => {
        this.setState({
          carData: prodData.data,
        });
      })
      .catch(err => {
        console.log(err);
      });
  }
	componentDidUpdate(prevProps) {
    if (this.props.uuid !== prevProps.uuid) {
      let uuid = this.props.uuid;
      axios
        .get('http://carousel.us-east-1.elasticbeanstalk.com/api/carousel', {
          params: {
            _id: uuid
          }
        })
        .then(prodData => {
          this.setState({
            carData: prodData.data,
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
  
  handleClick(event, newUuid) {
    event.preventDefault();
    this.props.setUuid(newUuid);
    window.scrollTo(0, 0);
    // console.log(newUuid);
  }
	render() {
		const settings = {
      dots: false,
			infinite: false,
			speed: 200,
			slidesToShow: 8,
			slidesToScroll: 8,
      arrows: true,
      nextArrow: <CarNextArrow />,
      prevArrow: <CarPrevArrow />,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1500,
          settings: {
            slidesToShow: 7,
            slidesToScroll: 7,
          }
        },
        {
          breakpoint: 1340,
          settings: {
            slidesToShow: 6,
            slidesToScroll: 6,
          }
        },
        {
          breakpoint: 1165,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 5
          }
        }
      ]
		};
		if (this.state.carData.length !== 0) {
			return (
				<Wrapper>
          <HeaderWrap>
            Customers also shopped for
          </HeaderWrap>
					<Slider {...settings}>
						{this.state.carData.map((prod) => (
							<Slide handleClick={this.handleClick} key={prod._id} image={prod.image} price={prod.price} prodName={prod.prodName} prodId = {prod._id}/>
						))}
					</Slider>
				</Wrapper>
			);
		} else {
			return <>Placeholder</>;
		}
	}
}

window.Carousel = Carousel;
// ReactDOM.render(<Carousel />, document.getElementsByClassName('carousel')[0]); //TESTING REMOVE WHEN DEPLOYING
