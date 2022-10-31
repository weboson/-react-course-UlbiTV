import React from 'react';
import PostItem from './PostItem';


const PostList = ({posts, title, remove}) => { // так как props - это объект - то вместо (props) использовали "диструктуризацию" и сразу вытащили массив "posts"

// Условие: если постов нет, то надпись "Постов не найдено"
// Если постов нет (длина массива равна Null)
if(!posts.length) {
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
            {
                posts.map((post, index) => <PostItem post={post} key={post.id} number={index+1} index={index} remove={remove}/>)
            }
        </div>
    );
};

export default PostList;