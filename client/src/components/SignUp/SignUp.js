import React, { Component } from 'react';
import axios from 'axios';
import './SignUp.scss';

class SignUp extends Component {

    handleSubmit = (e) => {
        const form = e.target;
        e.preventDefault();
        axios
            .post('http://localhost:8080/signup', {
                userName: form.userName.value,
                email: form.email.value,
                password: form.password.value
            })
            .then(res => {
                let { data } = res;
                if (data === 'duplicate_email') {
                    alert('This email is already subscribed. Please use different email to open an account');
                    form.reset();
                } else {
                    this.props.history.push('/login')
                }

            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className="signupForm">
                <h1 className='signupForm__heading'>Get started with Budgetery</h1>
                <p className='signupForm__text'>Create an account and enjoy Budgetery</p>
                <form onSubmit={this.handleSubmit} className="signupForm__group">
                    <div className="signupForm__section">
                        <label htmlFor="userName" className="signupForm__label">User name:</label>
                        <input type="text"
                            className="signupForm__control"
                            id="userName"
                            name="userName"
                            placeholder="Enter User Name"

                        />
                    </div>
                    <div className="signupForm__section ">
                        <label htmlFor="email" className="signupForm__label">Email address:</label>
                        <input type="email"
                            className="signupForm__control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="signupForm__section ">
                        <label htmlFor="password" className="signupForm__label">Password:</label>
                        <input type="password"
                            className="signupForm__control"
                            id="password"
                            name="password"
                            placeholder="Enter password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="signupForm__button"
                    >
                        Sign Up
                    </button>
                </form>

            </div>
        );
    }
}

export default SignUp;