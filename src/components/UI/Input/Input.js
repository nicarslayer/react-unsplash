import React from 'react';
import './Input.scss';

const Input = (props) => (
  <input
    type={props.type}
    className="Input"
    defaultValue={props.defaultValue}
    placeholder={props.placeholder}
    onChange={props.onChange}
    onKeyPress={props.onKeyPress}
  />
);
export default Input;
