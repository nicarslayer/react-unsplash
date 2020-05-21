import React from 'react';
import './EmptyBlock.scss';
import epmtyImg from '../../images/epmty.png';

const EmptyBlock = () => (
  <div className="Empty-block">
    <img src={epmtyImg} alt="" />
    <p> ~ No results ~ </p>
  </div>
);
export default EmptyBlock;
