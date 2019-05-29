import React from 'react';
import styled from 'styled-components';

const Image = styled.div`
  height: ;
  width: 75%
`;

const Slide = (props) => (
  <Image>
    <img src = {`${props.image}`} style = {{height: 160, width: 160, objectFit: 'contain'}}/>
  </Image>
);

export default Slide;