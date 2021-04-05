import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

class Login extends Component {

    handleSubmit = (e) => {
        const form = e.target;
        e.preventDefault();
        axios({
            method: "POST",
            data: {
                email: form.email.value,
                password: form.password.value
            },
            withCredentials: true,
            url: 'http://localhost:8080/login'
        })
            .then(res => {
                console.log(res.data)
                // const id = res.data.id;
                this.props.history.push('/input')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div className='loginForm'>
                <form onSubmit={this.handleSubmit} className='loginForm__group'>
                    <div className="loginForm__section">
                        <label htmlFor="email" className='loginForm__label'>Email address</label>
                        <input type="email"
                            className="loginForm__control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="loginForm__section">
                        <label htmlFor="password" className='loginForm__label'>Password</label>
                        <input type="password"
                            className="loginForm__control"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="loginForm__button"
                    >
                        Login
                    </button>
                </form>
                <p className='loginForm__text'>Don't have an account? <Link className='loginForm__link' to='/signup'>Sign Up!</Link> </p>
            </div>
        );
    }
}

export default Login;