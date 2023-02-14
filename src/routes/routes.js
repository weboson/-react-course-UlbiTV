//! файл в котором: массив из объектов данных для Роутинга (в AppRouter.jsx) 
// - для удобство добавления страниц и условий их отображения

// сами страницы (компоненты)
import About from "../pages/About";
import Error from "../pages/Error";
import Home from "../pages/Home";
import Login from "../pages/Login";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

//! массив маршрутов №1: для авторизованных пользователях 
export const privateRoutes = [ 
    {path: '/about', element: About, exact: true, errorElement: Home}, //! путь можно, как '/about', так и без слеша
    {path: '/', element: Home, exact: true, errorElement: Home}, //! и здесь главная страница
    {path: '/posts', element: Posts, exact: true, errorElement: Home}, //! exact#1 - для того, чтобы router, воспринимал указаннаые url, как РАЗНЫЕ
    {path: '/posts/:id', element: PostIdPage, exact: true, errorElement: Home},
    {path: '*', element: Error, exact: true, errorElement: Home},
]

//! массив маршрутов №2: для не авторизованных пользователях (публичный)
export const publicRoutes = [ 
    {path: '/login', element: Login, exact: true, errorElement: Login}, //! страница регистрации
    {path: '*', element: Login, exact: true, errorElement: Login}, //! перебрасывает на Login
]

// errorElement - это если компонент в About будет ошибка, то страница Home (как работает не понял, все ошибки About вылетают в react )