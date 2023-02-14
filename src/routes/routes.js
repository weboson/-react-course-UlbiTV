//! файл в котором: массив из объектов данных для Роутинга (в AppRouter.jsx) 
// - для удобство добавления страниц и условий их отображения

// сами страницы (компоненты)
import About from "../pages/About";
import Error from "../pages/Error";
import Home from "../pages/Home";
import PostIdPage from "../pages/PostIdPage";
import Posts from "../pages/Posts";

//! массив - маршруты 
export const routes = [
    {path: '/about', element: About, exact: true, errorElement: Home}, //! путь можно, как '/about', так и без слеша
    {path: '/', element: Home, exact: true, errorElement: Home}, //! и здесь главная страница
    {path: '/posts', element: Posts, exact: true, errorElement: Home}, //! exact#1 - для того, чтобы router, воспринимал указаннаые url, как РАЗНЫЕ
    {path: '/posts/:id', element: PostIdPage, exact: true, errorElement: Home},
    {path: '/posts/:id', element: Error, exact: true, errorElement: Home},
]

// errorElement - это если компонент в About будет ошибка, то страница Home (как работает не понял, все ошибки About вылетают в react )