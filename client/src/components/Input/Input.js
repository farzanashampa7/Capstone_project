import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./Input.scss";

class Input extends Component {
    state = {
        isAuthenticated: false,
        userDetails: null,
        income: '',
        expenses: '',
        savings: '',
        userData: {
            "id": "5d61358d-c93a-4b3d-966e-5d2ac5a2bf74",
            "userName": "hello",
            "email": "hello@mail.com",
            "password": "$2b$10$yZbMNt9YNouE2Z8swk5fAuAkJ48iRg96Iwr.SzwYJFrei6oAIYCAu",
            "expenditure": {
                "2021": {
                    "4": {
                        "income": "",
                        "expenses": []
                    }
                }
            }
        }
    }

    componentDidMount() {
        // axios
        //     .get('http://localhost:8080/input', { withCredentials: true })
        //     .then(res => {
        //         console.log('Check Auth', res.data);

        //         this.setState({
        //             isAuthenticated: true,
        //             userDetails: res.data
        //         })
        //     })
        //     .catch(() => {
        //         this.props.history.push('/login');
        //     });

        this.showIncome();
        this.showExpense();
    }

    getMonth() {
        return new Date().toLocaleString('en-us', { month: 'long' });
    }

    getYear() {
        return new Date().getFullYear();
    }

    handleSubmit = (e) => {
        const form = e.target;
        e.preventDefault();
        axios
            .post('http://localhost:8080/input/addexpense', {
                id: uuidv4(),
                category: form.category.value,
                amount: form.amount.value
            })
            .then(res => {
                console.log(res.data)
                form.reset();
                this.showExpense();
            })
            .catch(err => console.log(err))

        // Below is theoritical code
        /* const userData = this.state.userData,
            currentYear = new Date().getFullYear(),
            currentMonth = new Date().getMonth() + 1;

        if (userData[currentYear].length === undefined) {
            userData[currentYear] = {}
        }

        if (userData[currentYear][currentMonth].length === undefined) {
            userData[currentYear][currentMonth] = []
        }

        userData[currentYear][currentMonth].push({
            id: uuidv4(),
            category: form.category.value,
            amount: form.amount.value
        }) */
    }
    showIncome = () => {
        axios
            .get('http://localhost:8080/input/addincome')
            .then((response) => {
                console.log(response.data);
                let result = 0;
                for (let i = 0; i < response.data.length; i++) {
                    console.log(result = result + Number(response.data[i].income))
                }
                console.log(result)
                this.setState({
                    income: result,
                    savings: result - this.state.expenses
                })

            })
            .catch(err => console.log(err))
    }

    showExpense = () => {
        axios
            // .get('http://localhost:8080/input/')
            .get('http://localhost:8080/input/addexpense')
            .then((response) => {
                console.log(response.data);
                let result = 0;
                for (let i = 0; i < response.data.length; i++) {
                    console.log(result = result + Number(response.data[i].amount))
                }
                console.log(result)
                this.setState({
                    expenses: result,
                    savings: this.state.income - result

                })

            })
            .catch(err => console.log(err))
    }



    handleIncome = (e) => {
        const form = e.target;
        e.preventDefault();
        axios
            .post('http://localhost:8080/input/addincome', {
                id: uuidv4(),
                income: form.income.value
            })
            .then(res => {
                console.log(res.data)
                form.reset();
                this.showIncome();
            })
            .catch(err => console.log(err))

    }

    render() {
        // if (!this.state.isAuthenticated) return null;

        const { income, expenses, savings } = this.state;
        return (
            <section className='main'>
                <h2 className='main__header'>Expenditure for {this.getMonth()}, {this.getYear()} </h2>
                <div className='main__container'>
                    <div className='main__flex-div'>
                        Income: {income}
                    </div>
                    <div className='main__flex-div'>
                        Expenses: {expenses}
                    </div>
                    <div className='main__flex-div'>
                        Savings: {savings}
                    </div>
                </div>

                <form className='main__form-input' onSubmit={this.handleIncome}>
                    <label className='main__input-label' htmlFor='income'>Enter your monthly income:</label>
                    <input id="income" className='main__input' onChange={this.handleChange} type='number' name='income' required />

                    <button className="main__button" >Add income</button>
                </form>

                <div>
                    <h3>Add expenses</h3>
                    <form className='main__form-select' onSubmit={this.handleSubmit} >
                        <label className='main__input-label' htmlFor='category'>Choose category</label>
                        <select name='category' required>
                            <option aria-label='None' value='' />
                            <option value='Grocery'>Grocery</option>
                            <option value='House Rent'>House Rent</option>
                            <option value='Car Insurance'>Car Insurance</option>
                            <option value='Internet Bill'>Internet Bill</option>
                            <option value='Mobile Bill'>Mobile Bill</option>
                            <option value='Restaurant'>Restaurant</option>
                            <option value='Shopping'>Shopping</option>
                            <option value='Travel'>Travel</option>
                        </select>

                        <label className='main__input-label' htmlFor='amount'>Enter amount</label>
                        <input id="amount" className='main__input' type='number' name='amount' required />
                        <button className="main__button">Add income</button>
                    </form>
                </div>

            </section>
        );
    }
}

export default Input;