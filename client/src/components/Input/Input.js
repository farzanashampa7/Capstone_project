import React, { Component } from 'react';
import axios from 'axios';
import "./Input.scss";
import PieChart from '../Chart/PieChart';
import DeleteIcon from '../../assets/icons/delete_outline-24px.svg';

class Input extends Component {
    state = {
        isAuthenticated: false,
        userDetails: null,
        income: 0,
        expenses: 0,
        savings: 0,
        expenditureList: null
    }

    userID = window.location.search.split('=')[1];
    currentYear = new Date().getFullYear();
    currentMonth = new Date().getMonth() + 1;

    componentDidMount() {
        axios
            .get('http://localhost:8080/input', { withCredentials: true })
            .then(res => {

                this.setState({
                    isAuthenticated: true,
                    userDetails: res.data
                })
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
        axios
            .post(`http://localhost:8080/input/${this.userID}/addexpense`, {
                category: form.category.value,
                amount: form.amount.value
            })
            .then(res => {
                form.reset();
                this.showExpense();
            })
            .catch(err => console.log(err))
    }
    showIncome = () => {
        axios
            .get(`http://localhost:8080/input/${this.userID}/addincome`)
            .then((response) => {
                let result = 0;
                for (let i = 0; i < response.data.length; i++) {
                    result = result + Number(response.data[i].income)
                }
                this.setState({
                    income: result,
                    savings: result - this.state.expenses,

                })

            })
            .catch(err => console.log(err))
    }

    showExpense = () => {
        axios
            .get(`http://localhost:8080/input/${this.userID}/addexpense`)
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

            })
            .catch(err => console.log(err))
    }

    handleIncome = (e) => {
        const form = e.target;
        e.preventDefault();
        axios
            .post(`http://localhost:8080/input/${this.userID}/addincome`, {
                income: form.income.value
            })
            .then(res => {
                form.reset();
                this.showIncome();
            })
            .catch(err => console.log(err))

    }

    handleDeleteExpense = (id, e) => {
        e.preventDefault();
        axios
            .delete(`http://localhost:8080/input/${this.userID}/deleteexpense/${id}`)
            .then(res => {
                this.showExpense();
            })
            .catch(err => console.log(err))
    }

    render() {

        const { income, expenses, savings, expenditureList, userDetails } = this.state;
        const userName = userDetails ? userDetails.userName : "";

        const pieChartData = [
            { value: income, name: 'Income' },
            { value: expenses, name: 'Expenses' },
            { value: savings, name: 'Savings' }
        ];

        return (
            <section className='main wrapper'>
                <a href='/' className='main__logout'>Log out</a>
                <h2 className='main__header' >Welcome <strong>{userName}</strong>!</h2>
                <h2 className='main__sub-header'>Expenditure for {this.getMonth()}, {this.getYear()} </h2>
                <div className='main__container'>
                    <div className='main__flex-div'>
                        Income: ${income}
                    </div>
                    <div className='main__flex-div'>
                        Expenses: ${expenses}
                    </div>
                    <div className='main__flex-div'>
                        Savings: ${savings}
                    </div>
                </div>
                {
                    expenses > income &&
                    <div className='main__alert'>
                        <p className='main__flash-alert'>!You are spending against your budget!</p>
                    </div>
                }

                <div className='main__container-sub'>
                    <div className='main__form'>
                        <div className='main__form-container'>
                            <h3 className='main__heading'>Add your income</h3>
                            <form className='main__form-input' onSubmit={this.handleIncome}>
                                <label className='main__input-label' htmlFor='income'>Enter your monthly income:</label>
                                <input id="income" className='main__input' onChange={this.handleChange} type='number' name='income' required placeholder='Enter income' />

                                <button className="main__button" >Add income</button>
                            </form>
                        </div>

                        <div>
                            <h3 className='main__heading'>Add monthly expenses</h3>
                            <form className='main__form-select' onSubmit={this.handleSubmit} >
                                <label className='main__input-label' htmlFor='category'>Choose category</label>
                                <select className='main__input-select' name='category' required>
                                    <option aria-label='None' value=''>Select your expense category</option>
                                    <option value='Grocery'>Grocery</option>
                                    <option value='House Rent'>House Rent</option>
                                    <option value='Car Insurance'>Car Insurance</option>
                                    <option value='Internet Bill'>Internet Bill</option>
                                    <option value='Mobile Bill'>Mobile Bill</option>
                                    <option value='Restaurant'>Restaurant</option>
                                    <option value='Shopping'>Shopping</option>
                                    <option value='Travel'>Travel</option>
                                    <option value='RRSP Contribution'>RRSP Contribution</option>
                                    <option value='TFSA Contribution'>TFSA Contribution</option>
                                </select>

                                <label className='main__input-label' htmlFor='amount'>Enter amount</label>
                                <input id="amount" className='main__input' type='number' name='amount' required placeholder='Enter amount' />
                                <button className="main__button">Add bill</button>
                            </form>
                        </div>
                    </div>
                    {expenditureList && (
                        <div className='main__expense-container'>
                            <h3 className='main__heading-1'>Expense list</h3>
                            {expenditureList.map(item => {
                                return <div key={item.id} className='main__expense-list'>
                                    <span >{item.category} : ${item.amount}</span> <button className='main__delete-button' onClick={(e) => { this.handleDeleteExpense(item.id, e) }}><img src={DeleteIcon} alt='Delete icon' /></button>
                                </div>
                            }
                            )}
                        </div>
                    )}
                </div>
                <div className='main__chart-container'>
                    <h2 className='main__chart-heading'>See your budget chart</h2>
                    <PieChart className='main__chart' data={pieChartData} />
                </div>

            </section>
        );
    }
}

export default Input;