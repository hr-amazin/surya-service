import React from 'react';
import styled from 'styled-components';

const Image = styled.img`
  height: 160px;
  width: 160px;
  object-fit: contain
`;

const Slide = (props) => (
  <>
    <Image src = {`${props.image}`}/>
    
  </>
);

export default Slide;