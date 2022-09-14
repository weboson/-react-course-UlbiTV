import React from 'react';
import classes from './MyButton.module.css'
//!children
//children - хранит в себе значение, которое лежит внутри <component> Значение==children </component>
//children я также использовал в предыдущем проекте на GitHub - https://github.com/weboson/react-ToDoList/src/components/layout/Layout.jsx 
//? Кстати, поиск на GitHub осуществляется при помощи поля "Shearch or jump to ..." - примерный url: https://github.com/weboson/react-ToDoList/search?q=children
const MyButton = (props) => {
    return (
        <button className={classes.myBtn}>
            {props.children}
        </button>
    );
};

export default MyButton;

