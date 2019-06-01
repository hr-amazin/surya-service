import React from 'react';
import styled from 'styled-components';
import StarRatings from 'react-star-ratings';

const SlideWrapper = styled.div`
  :hover {
    cursor: pointer;
  }
  display: flex;
  flex-direction: column
  justify-content: center;
  margin-left: 27px
`;

const NameWrapper = styled.div`
  font-family: Arial,sans-serif;
  white-space: normal;
  overflow-wrap: break-word;
  text-overflow: ellipsis;
  max-height: 76px;
  box-sizing: border-box;
  color: #0066c0;
  text-align: left;
  font-size: 13px;
  line-height: 19px;
  :hover {
    text-decoration: underline;
    color: #c45500;
  }
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

const PriceWrapper = styled.div`
  position: relative;
  color: #B12704;
  font-weight: 400;
  font-family: Arial,sans-serif;
  white-space: normal;
  text-align: left;
  font-size: 13px;
  line-height: 19px;
`;

const Image = styled.img`
  height: 160px;
  width: 160px;
  object-fit: contain
`;

// const ReviewWrapper = styled.div`
//   font-family: Arial,sans-serif;
//   white-space: normal;
//   color: #0066c0;
//   font-size: 13px;
//   line-height: 19px;
//   :hover {
//     color: #c45500;
//   }
//   overflow: hidden;
// `;

const Stars = styled.span`
  text-align: left
  font-family: Arial,sans-serif;
  white-space: normal;
  color: #0066c0;
  font-size: 13px;
  line-height: 19px;
  :hover {
    color: #c45500;
  }
  overflow: hidden;
`;

const Slide = (props) => {
  const price = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(props.price);
  return (
    <>
      <SlideWrapper>
        <Image src = {`${props.image}`}/>
        <NameWrapper>{props.name}</NameWrapper>
        <Stars>
        <StarRatings
          rating={(Math.random() * 5)}
          starRatedColor="rgb(255, 167, 0)"
          starSpacing=".2px"
          starDimension="15px"
          numberOfStars={5}
          name='rating'
        />
        <>{Math.floor(Math.random() * 100)}</>
        </Stars>
        <PriceWrapper>{price}</PriceWrapper>
      </SlideWrapper>
    </>
  )
};

export default Slide;