import React from 'react';
import Slide from './slide.jsx';

const Slides = (props) => (
  <>
    {props.prods.map((prod, i) => (<Slide key = {i} image = {prod.image}/>))}
  </>
);

export default Slides;