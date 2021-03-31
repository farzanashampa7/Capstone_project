import React from 'react';
import './Header.scss';
import Image from '../../assets/images/background_image.png';

const Header = () => {

    return (
        <header>
            <nav className='navBar'>
                <a href='/' className='navBar__logo'>Budgetery</a>
            </nav>
            <div className='hero'>
                <div className='hero__section'>
                    <p className='hero__section--text'>Learn how to manage & balance your budget with us!</p>
                    <img className='hero__section--image' src={Image} />
                </div>
                <a className='hero__link' href='/input'>Get started</a>
            </div>

        </header>
    );
};

export default Header;