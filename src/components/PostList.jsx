import React from 'react';
import PostItem from './PostItem';
//! ключи

//                props = {posts={[...]}}
const PostList = ({posts, title}) => { // так как props - это объект - то вместо (props) использовали "диструктуризацию" и сразу вытащили массив "posts"
    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>{title}</h1>
            {
                                                    //! ключи - key  
                posts.map(post => <PostItem post={post} key={post.id} />)
            }
        </div>
    );
};

export default PostList;