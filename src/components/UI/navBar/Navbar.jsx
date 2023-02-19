import React from 'react';
import { NavLink } from 'react-router-dom';
//! хук контекста useContext 
import { useContext } from 'react';
//! контекст
import { AuthContext } from '../../../context';
import MyButton from '../button/MyButton';

const Navbar = () => {
    //! КОНТЕКСТ
    const {isAuth, setIsAuth} = useContext(AuthContext);
    //! назначаем контекст = true 
    const logout = () => {
        setIsAuth(false);
        localStorage.removeItem('auth');
    }

    // стили (на месте) активной ссылки навигации (можно в App.css) 
    let activeStyle = {
        textDecoration: "underline",
        color: "red",
    };

    // имя класса (styleBlue), который нужно использовать 
    let activeClassName = "styleBlue" // .styleBlue в App.css

    return (
        <div className='navbar'>
            <MyButton onClick={logout}>
                Выйти
            </MyButton>
            <div className="navbar__links">
                <NavLink
                    to="/"
                    className={({ isActive }) => // className
                        isActive ? activeClassName : undefined
                    }
                >
                    Home
                </NavLink>
                
                {/* // если страница текущая, то ссылка на неё подсвечивается нашими стилями: style */}
                <NavLink
                    to="about"
                    style={({ isActive }) => // style
                        isActive ? activeStyle : undefined
                    }
                >
                    О нас
                </NavLink>
                {/* // также можно использовать CSS-классы: className */}
                <NavLink
                    to="posts"
                    className={({ isActive }) => // className
                        isActive ? activeClassName : undefined
                    }
                >
                    Posts
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;