import React from 'react';
import About from '../pages/About'; //! страница about
import Posts from '../pages/Posts'; //! cтраница posts
import Error from '../pages/Error'; //! cтраница error
//! РОУТИНГ (многостраничное приложение) 
import { Route, Routes } from 'react-router-dom';
import PostIdPage from '../pages/PostIdPage';
const AppRouter = () => {
    return (
        <Routes>
            <Route
                path="about" //! путь можно, как '/about', так и без слеша
                element={<About />}
                errorElement={<Posts />} // если компонент в About будет ошибка, то страница Posts (как работает не понял, все ошибки About вылетают в react )
            />
            <Route
                exact path="posts" //! exact#1 - для того, чтобы router, воспринимал указаннаые url, как РАЗНЫЕ
                element={<Posts />}

            />
            <Route //! динамический путь (:id) к определенному посту - имя id может быть любым, главное после :
                exact path="posts/:id" //! exact#2
                element={<PostIdPage />}

            />
            <Route
                path='*' //! * - "все пути, кроме перечисленных выше"
                element={<Error />} //! будет направлять к странице /posts
            />
        </Routes>
    );
};

export default AppRouter;