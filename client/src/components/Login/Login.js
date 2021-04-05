import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

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
                const id = res.data.id;
                this.props.history.push('/input')
            })
            .catch(err => console.log(err))
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group text-left">
                        <label htmlFor="email">Email address</label>
                        <input type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            placeholder="Enter email"
                        />
                    </div>
                    <div className="form-group text-left">
                        <label htmlFor="password">Password</label>
                        <input type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            placeholder="Password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="btn btn-primary"
                    >
                        Login
                    </button>
                </form>

                <p>Don't have an account? <Link to='/signup'>Sign Up!</Link> </p>

            </div>
        );
    }
}

export default Login;