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
        expenditureList: null
    }
    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth() + 1;

    componentDidMount() {
        axios
            .get('http://localhost:8080/input', { withCredentials: true })
            // .get(`http://localhost:8080/input/${id}`, { withCredentials: true })
            .then(res => {
                console.log('Check Auth', res.data);

                this.setState({
                    isAuthenticated: true,
                    userDetails: res.data
                })
                console.log(this.state.userDetails)
                this.showIncome();
                this.showExpense();
            })
            .catch(() => {
                this.props.history.push('/login');
            });
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
        const id = this.state.userDetails.id;
        axios
            .post(`http://localhost:8080/input/${id}/addexpense`, {
                category: form.category.value,
                amount: form.amount.value
            })
            .then(res => {
                console.log(res.data)
                form.reset();
                this.showExpense();
            })
            .catch(err => console.log(err))
    }
    showIncome = () => {
        const id = this.state.userDetails.id;
        axios
            .get(`http://localhost:8080/input/${id}/addincome`)
            .then((response) => {
                let result = 0;
                for (let i = 0; i < response.data.length; i++) {
                    console.log(result = result + Number(response.data[i].income))
                }
                console.log(result)
                this.setState({
                    income: result,
                    savings: result - this.state.expenses,

                })

            })
            .catch(err => console.log(err))
    }

    showExpense = () => {
        const id = this.state.userDetails.id;
        axios
            .get(`http://localhost:8080/input/${id}/addexpense`)
            .then((response) => {
                let result = 0;
                for (let i = 0; i < response.data.length; i++) {
                    result = result + Number(response.data[i].amount)
                }
                this.setState({
                    expenses: result,
                    savings: this.state.income - result,
                    expenditureList: response.data

                })
                console.log(this.state.expenditureList);

            })
            .catch(err => console.log(err))
    }

    handleIncome = (e) => {
        const form = e.target;
        e.preventDefault();
        const id = this.state.userDetails.id;
        axios
            .post(`http://localhost:8080/input/${id}/addincome`, {
                income: form.income.value
            })
            .then(res => {
                form.reset();
                this.showIncome();
            })
            .catch(err => console.log(err))

    }

    render() {
        const { income, expenses, savings, expenditureList } = this.state;
        console.log(expenditureList);
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
                {expenses > income && (
                    <div className='main__alert'>
                        <p>You have crossed your budget!</p>
                    </div>
                )}

                <div>
                    <div>
                        <div>
                            <h3>Add your income</h3>
                            <form className='main__form-input' onSubmit={this.handleIncome}>
                                <label className='main__input-label' htmlFor='income'>Enter your monthly income:</label>
                                <input id="income" className='main__input' onChange={this.handleChange} type='number' name='income' required />

                                <button className="main__button" >Add income</button>
                            </form>
                        </div>

                        <div>
                            <h3>Add monthly expenses</h3>
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
                        {expenditureList && (
                            <div>
                                <ul>
                                    {expenditureList.map(item => {
                                        return <li>{item.category} : {item.amount}</li>
                                    }

                                    )}
                                </ul>
                            </div>
                        )}

                    </div>
                </div>
            </section>
        );
    }
}

export default Input;