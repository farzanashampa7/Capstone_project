import React, { Component } from 'react';
import axios from 'axios';

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
                // e.reset();
            })
            .catch(err => console.log(err))
    }


    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group text-left">
                        <label htmlFor="userName">User name</label>
                        <input type="text"
                            className="form-control"
                            id="userName"
                            name="userName"
                            // aria-describedby="emailHelp"
                            placeholder="Enter User Name"

                        />
                    </div>
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
                        Sign Up
                    </button>
                </form>

            </div>
        );
    }
}

export default SignUp;