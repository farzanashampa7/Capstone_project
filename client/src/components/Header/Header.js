import React from 'react';
import './Header.scss';
import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <>
            <header className='wrapper'>
                <nav className='navBar'>
                    <a href='/' className='navBar__logo'>Budgetery</a>
                    {/* <div>
                        <NavLink to='/login' className='navbar__login' active>Login</NavLink>
                    </div> */}
                </nav>
            </header>
        </>
    );
};

export default Header;