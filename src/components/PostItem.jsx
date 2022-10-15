import React from 'react';
import MyButton from './UI/button/MyButton';

// разбил деструктуризацией props = {remove, ...и оастльное в rest}
const PostItem = ({remove, ...props}) => {

//! метод удаления для кнопки "удалить"
const deletePost = (e) => {
    e.preventDefault() // сброс действия браузера по умолчанию
//! передаю поле id (объекта post)
    remove(props.post.id)
}

    return (
        <div>
            <div className='post'>
                <div className="post__content">
                    <strong>{props.number}. {props.post.title}</strong>
                    <div>
                        {props.post.body}
                    </div>
                </div>
                <div className="post__btns">
                    {/*//! кнопка удаления, при клике => обработчик deletePost */}
                    <MyButton onClick={deletePost}>Удалить</MyButton>
                </div>
            </div>
        </div>
    );
}

export default PostItem;