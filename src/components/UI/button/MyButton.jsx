import React from 'react';
import classes from './MyButton.module.css'

// разделим props на {children, ...datas} - datas - имя любое, но чтобы не отходить от стиля React - назовем props
const MyButton = ({children, ...props}) => {  // деструктуризация, так как нам нужно в пропсы предавать данные для кнопку, чтобы не путать с children...
    return (
        <button {...props} className={classes.myBtn}>
            {children}
        </button>
    );
};

export default MyButton;

