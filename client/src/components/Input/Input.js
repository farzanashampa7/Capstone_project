import React, { Component } from 'react';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import "./Input.scss";

class Input extends Component {
    state = {
        income: 0,
        expenses: 0,
        savings: 0
    }

    handleChange = (e) => {
        this.setState({
            income: e.target.value
        })

    }

    handleSubmit1 = (e) => {
        e.preventDefault();
    }

    handleSubmit = (e) => {
        const form = e.target;
        e.preventDefault();
        axios
            .post('http://localhost:8080/input/add', {
                id: uuidv4(),
                category: form.category.value,
                amount: form.amount.value
            })
            .then(res => {
                console.log(res)
                form.reset();
                // window.location = '/success'
            })
            .catch(err => console.log(err))

    }

    showExpense = (e) => {

        axios
            .get('http://localhost:8080/input/')
            .then((response) => {
                console.log(response);
                // const result = 0;
                // for (let i = 0; i < response.length; i++) {
                //     result += response[i].amount
                // }
                // this.setState({
                //     expenses: result
                // })
            })
            .catch(err => console.log(err))
    }


    render() {
        const { income, expenses, savings } = this.state;
        return (
            <section className='main'>
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

                <form className='main__form-input' onSubmit={this.handleSubmit1}>
                    <label className='main__input-label' htmlFor='income'>Enter your monthly income:</label>
                    <input id="income" className='main__input' onChange={this.handleChange} type='number' name='income' required />

                    <button className="main__button" >Add income</button>
                </form>

                <div>
                    <h3>Add expenses</h3>
                    <form className='main__form-select' onSubmit={this.handleSubmit}>
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
                        <button className="main__button" >Add income</button>
                    </form>
                </div>

            </section>
        );
    }
}

export default Input;