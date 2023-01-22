import React from 'react';
import cl from './MyModal.module.css'

//!модальное окно
// при нажатие на темную сторону, модально исчезает: onClick={() => setVisible(false)}
const MyModal = ({children, visible, setVisible}) => {

    //условие появления окна
    const rootClasses = [cl.myModal]; // массив классов, чтобы можно было добавлять, в условии, класс .active
    // в зависимости от visible, будет добавлен: .active - и будет строка (join - ниже)  ".myModal.active" (окноп появится)
    if(visible) {
        rootClasses.push(cl.active); // [cl.myModal, cl.active] - join потом соединит в строку: "myModal" либо "myModal_active"
    } 
    return (
        // arr.join(glue) - создаёт строку из элементов arr, вставляя glue (в нашем случае пробел) между ними.
        // выйдет строка: "myModal active" - если убрать active - форма исчезнет
        //! stopPropagation - убирает "всплытие события": https://learn.javascript.ru/bubbling-and-capturing#prekraschenie-vsplytiya
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myModalContent} onClick={(event)=> event.stopPropagation()}> 
                {children}
            </div>
        </div>
    );
};

export default MyModal;