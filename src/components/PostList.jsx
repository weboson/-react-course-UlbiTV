import React from 'react';
//! анимация плавная с плагином "react-transition-group": http://reactcommunity.org/react-transition-group/transition-group
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import PostItem from './PostItem';


const PostList = ({ posts, title, remove }) => { // так как props - это объект - то вместо (props) использовали "деструктуризацию" и сразу вытащили массив "posts"

    // Условие: если постов нет, то надпись "Постов не найдено"
    // Если постов нет (длина массива равна Null)
    if (!posts.length) {
        return (
            <h1 style={{ textAlign: 'center' }}>
                Постов не найдено
            </h1>
        )
    }
    // иначе рендер список имеющихся постов
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            {/*//! TransitionGroup анимация */}
            <TransitionGroup>
                {
                    posts.map((post, index) => (
                        //! CSSTransition - анимация 
                        <CSSTransition
                            key={post.id}
                            timeout={500}
                            classNames="post">

                            <PostItem post={post} key={post.id} number={index + 1} index={index} remove={remove} />
                        </CSSTransition>
                    )
                    )
                }
            </TransitionGroup>
        </div>
    );
};

export default PostList;