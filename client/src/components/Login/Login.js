import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Login.scss';

class Login extends Component {

    state = {
        isAuthenticated: true
    }

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
                const id = JSON.parse(res.data).id;
                this.props.history.push('/input?id=' + id)
            })
            .catch(err => {
                console.log(err);
                this.setState({
                    isAuthenticated: false
                })
            })
    }

    render() {
        return (
            <div className='loginForm'>

                {
                    !this.state.isAuthenticated &&
                    alert('Invalid Username or password')
                }
                <h1 className='loginForm__heading'>Welcome back!</h1>
                <p className='loginForm__text'>Enter your credentials and enjoy Budgetery</p>

                <form onSubmit={this.handleSubmit} className='loginForm__group'>
                    <div className="loginForm__section">
                        <label htmlFor="email" className='loginForm__label'>Email address</label>
                        <input type="email"
                            autoComplete='off'
                            className="loginForm__control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="loginForm__section">
                        <label htmlFor="password" className='loginForm__label'>Password</label>
                        <input type="password"
                            autoComplete='new-password'
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
            </div >
        );
    }
}

export default Login;