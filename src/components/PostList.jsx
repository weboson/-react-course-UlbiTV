import React from 'react';
import PostItem from './PostItem';

//                props = {posts={[...]}}
const PostList = ({posts, title}) => { // так как props - это объект - то вместо (props) использовали "диструктуризацию" и сразу вытащили массив "posts"
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            {
                                                                           // number для нумерации поста  
                posts.map((post, index) => <PostItem post={post} key={post.id} number={index+1}/>)
            }
        </div>
    );
};

export default PostList;