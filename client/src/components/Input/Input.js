import React, { Component } from 'react';
import "./Input.scss";

class Input extends Component {
    state = {
        income: 0,
        expenses: 0,
        savings: 0
    }

    // handleChange = (e) => {
    //     this.setState.
    // }


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
                        Savings: {income}
                    </div>
                </div>

                <form className='main__form'>
                    <label className='main__input-label' htmlFor='income'>Enter your monthly income:</label>
                    <input id="income" className='main__input' type='number' name='income' required />
                </form>

            </section>
        );
    }
}

export default Input;