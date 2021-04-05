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
                this.props.history.push('/login')

            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div className="form">
                <form onSubmit={this.handleSubmit} className="form__group">
                    <div className="form__section">
                        <label htmlFor="userName" className="form__label">User name:</label>
                        <input type="text"
                            className="form__control"
                            id="userName"
                            name="userName"
                            placeholder="Enter User Name"

                        />
                    </div>
                    <div className="form__section ">
                        <label htmlFor="email" className="form__label">Email address:</label>
                        <input type="email"
                            className="form__control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form__section ">
                        <label htmlFor="password" className="form__label">Password:</label>
                        <input type="password"
                            className="form__control"
                            id="password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="form__button"
                    >
                        Sign Up
                    </button>
                </form>

            </div>
        );
    }
}

export default SignUp;