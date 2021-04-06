import React from 'react';
import '../Header/Header.scss';
import Image from '../../assets/images/background_image.png';

const Hero = () => {
    return (
        <section className='hero'>
            <div className='hero__section'>
                <p className='hero__section--text'>Learn how to manage & balance your budget with us!</p>
                <img className='hero__section--image' src={Image} alt='Hero banner' />
            </div>
            <a className='hero__link' href='/login'>Get started</a>
        </section>
    );
};

export default Hero;