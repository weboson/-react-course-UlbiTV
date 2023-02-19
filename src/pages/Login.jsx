//! страница регистрации (без бэкенда, просто true/false) 
import React from 'react';
import MyButton from '../components/UI/button/MyButton';
import MyInput from '../components/UI/input/MyInput';
//! хук контекста useContext 
import { useContext } from 'react';
//! сам контекст "AuthContext"
import { AuthContext } from '../context';

const Login = () => {
    //! доступ к контексту "AuthContext"
    const {isAuth, setIsAuth} = useContext(AuthContext)

    //! обработчик события нажатия на кнопку формы
    const login = (event) => {
        event.preventDefault();
        //! изменение 
        setIsAuth(true); 
        //! записываем в localStorage значение 'true' по ключу 'auth' (имя может быть любым)
        localStorage.setItem('auth', 'true');
    }

    return (
        <div>
            <h1>Страница для регистрации</h1>
            <form onSubmit={login}>
                <MyInput type='text' placeholder="Введите логин"/>
                <MyInput type='password' placeholder="Введите пароль"/>
                <MyButton>Войти</MyButton>
            </form>
        </div>
    );
};

export default Login;