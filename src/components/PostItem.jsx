import React from 'react';
import MyButton from './UI/button/MyButton';
//import Posts from '../pages/Posts';
//! хук от react-router-dom (вместо устаревшего ueHistory):
import { useNavigate  } from "react-router-dom"; 

// разбил деструктуризацией props = {remove, ...и оастльное в rest}
const PostItem = (props) => {
    //! 
    const router = useNavigate();
    //console.dir(NavLink);

    return (
        <div>
            <div className='post'>
                <div className="post__content">
                    <strong>{props.id}. {props.post.title}</strong>
                    <div>
                        {props.post.body}
                    </div>
                </div>
                <div className="post__btns">
                    {/* //! кнопка "открыть" пост*/}
                    {/*//! Пример динамич. url: http://localhost:3000/posts/1 */}
                    <MyButton onClick={() => router(`${props.post.id}`)}>Открыть</MyButton> 
                    <MyButton onClick={() => props.remove(props.post)}>Удалить</MyButton>
                </div>
            </div>
        </div>
    );
}

export default PostItem;