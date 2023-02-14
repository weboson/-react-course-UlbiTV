import React from 'react';
// import About from '../pages/About'; // страница about
// import Posts from '../pages/Posts'; // cтраница posts
// import Error from '../pages/Error'; // cтраница error
//! РОУТИНГ (многостраничное приложение) 
import { Route, Routes } from 'react-router-dom';
import PostIdPage from '../pages/PostIdPage';
import { routes } from '../routes/routes'; //! объект маршрутов
const AppRouter = () => {
    console.log(routes[0].element)
    return (
        // ! ДИНАМИЧЕСКИЙ роутинг - то есть роутинг формируется в зависимости от данных (объекта в routes.js)
        <Routes>
            {routes.map((r) =>
                <Route 
                    path={r.path} 
                    element={<r.element/>}
                    exact={r.exact} 
                    errorElement={<r.errorElement/>} />
            )}    
        </Routes>


// статический роутинг (прошлый)
         //<Routes>
            // <Route
            //    path="about" //! путь можно, как '/about', так и без слеша
            //    element={<About />}
            //    errorElement={<Posts />} // если компонент в About будет ошибка, то страница Posts (как работает не понял, все ошибки About вылетают в react )
           // />
        //</Routes>
    );
};

export default AppRouter;