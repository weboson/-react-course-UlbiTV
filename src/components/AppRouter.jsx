import React from 'react';
// import About from '../pages/About'; // страница about
// import Posts from '../pages/Posts'; // cтраница posts
// import Error from '../pages/Error'; // cтраница error
// import PostIdPage from '../pages/PostIdPage';
// РОУТИНГ (многостраничное приложение) 
import { Route, Routes } from 'react-router-dom';
//! объекты маршрутов
import { privateRoutes, publicRoutes } from '../routes/routes'; 
const AppRouter = () => {
    //! флажок для авторизации (true/false)
    const isAuth = true; 
    return (
        // ДИНАМИЧЕСКИЙ роутинг - то есть роутинг формируется в зависимости от данных (объекта в routes.js)
        //! условие авторизации 
        isAuth
            ?
            <Routes>
                {privateRoutes.map((r,i) => //! для авторизованных пользователях (isAuth ==  true)
                    <Route
                        key={i+2} // уникальный ключ для React - а то ошибка в консоли
                        path={r.path}
                        element={<r.element />}
                        exact={r.exact}
                        errorElement={<r.errorElement />}
                    />
                )}
            </Routes>
            :
            <Routes>
                {publicRoutes.map((r,i) => //! для НЕ авторизованных пользователях (isAuth ==  false)
                    <Route
                        key={i+3} // ключ 
                        path={r.path}
                        element={<r.element />}
                        exact={r.exact}
                        errorElement={<r.errorElement />}
                    />
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