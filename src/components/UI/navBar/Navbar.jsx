import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {


    //! стили (на месте) активной ссылки навигации (можно в App.css) 
    let activeStyle = {
        textDecoration: "underline",
        color: "red",
    };

    //! имя класса (styleBlue), который нужно использовать 
    let activeClassName = "styleBlue" //! .styleBlue в App.css

    return (
        <div className='navbar'>
            <div className="navbar__links">
                {/* //! если страница текущая, то ссылка на неё подсвечивается нашими стилями: style */}
                <NavLink
                    to="about"
                    style={({ isActive }) => //! style
                        isActive ? activeStyle : undefined
                    }
                >
                    О нас
                </NavLink>
                {/* //! также можно использовать CSS-классы: className */}
                <NavLink
                    to="posts"
                    className={({ isActive }) => //! className
                        isActive ? activeClassName : undefined
                    }
                >
                    Tasks
                </NavLink>
            </div>
        </div>
    );
};

export default Navbar;