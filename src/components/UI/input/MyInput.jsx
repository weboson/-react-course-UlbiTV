import React from 'react';
import classes from './MyInput.module.css'

//! React.forwardRef((props, ref) => (<button ref={ref}/>)) - перенаправляет ref={useRef} в необходимое место СОБСТВЕННОГО компонента
 const MyInput = React.forwardRef((props, ref) => {
    return (
        <input ref={ref} {...props} className={classes.myInput} />
    );
});

export default MyInput;