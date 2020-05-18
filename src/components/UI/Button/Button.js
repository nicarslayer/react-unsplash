import React from 'react' 
import './Button.scss'
import clsx from 'clsx';

const Button = props => {

    return(
        <button
            onClick={props.onClick}
            className={clsx('Button', [props.type])}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    )
}
export default Button