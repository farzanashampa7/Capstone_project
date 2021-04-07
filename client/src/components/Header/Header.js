import React from 'react';
import './Header.scss';
// import { NavLink } from 'react-router-dom';

const Header = () => {

    return (
        <>
            <header className='header wrapper'>
                <nav className='navBar'>
                    <a href='/' className='navBar__logo'>Budgetery</a>
                </nav>
            </header>
        </>
    );
};

export default Header;