import React, { Component } from 'react';
import './Main.scss';

class Main extends Component {
    state = {
        spendLineCount: [
            {
                id: 1
            },
            {
                id: 2
            }
        ]
    };

    getMonth() {
        return new Date().toLocaleString('en-us', { month: 'long' });
    }

    getYear() {
        return new Date().getFullYear();
    }

    addNewSpendLine = () => {
        let spendLineCountArr = this.state.spendLineCount;
        let latestSpendLineCount = spendLineCountArr[spendLineCountArr.length - 1].id;

        spendLineCountArr.push({
            id: latestSpendLineCount + 1
        });

        this.setState({
            spendLineCount: spendLineCountArr
        })
    }

    removeSpendLine = (event) => {
        const spendLineNumber = event.currentTarget.dataset.spendline;
        const spendLineArr = this.state.spendLineCount;
        const index = spendLineArr.findIndex(item => item.id.toString() === spendLineNumber);

        if (index === -1) return;

        spendLineArr.splice(index, 1);

        this.setState({
            spendLineCount: spendLineArr
        });
    }

    setFavorite = (event) => {
        console.log(event.currentTarget.dataset.spendline);
    }

    render() {
        const spendLineCount = this.state.spendLineCount;
        return (
            <section className='main'>
                <h2 className='main__header'>Expenditure for {this.getMonth()}, {this.getYear()} </h2>
                <form>
                    {/* Salary input */}
                    <div className='main__form'>
                        <label className='main__input-label' htmlFor='income'>Enter your monthly income:</label>
                        <input id="income" className='main__input' type='number' name='income' required />
                    </div>

                    {/* Expenditure input */}
                    <div className="">
                        {
                            spendLineCount.map((item, idx) => {
                                return <SpendLine
                                    key={idx}
                                    count={item.id}
                                    removeSpendLine={this.removeSpendLine}
                                    setFavorite={this.setFavorite} />
                            })
                        }
                    </div>

                    <div className="">
                        <button type="submit">Calculate</button>
                        <button type="button" onClick={this.addNewSpendLine}>Add</button>
                    </div>
                </form>
            </section>
        );
    }
}

const SpendLine = (props) => {
    return (
        <div className="spendLine" id={`spendLineContainer_${props.count}`}>
            <div className='main__form'>
                <label className='main__input-label' htmlFor={`category_${props.count}`}>Choose category</label>
                <select id={`category_${props.count}`} required>
                    <option>Food</option>
                    <option>Internet</option>
                    <option>Shopping</option>
                </select>
            </div>

            <div className='main__form'>
                <label className='main__input-label' htmlFor={`insert_amount_${props.count}`}>Insert amount</label>
                <input id={`insert_amount_${props.count}`} className='main__input' type='number' name='insert_amount' required />
            </div>

            <div className='main__form'>
                <button type="button" data-spendline={props.count} onClick={props.setFavorite}>Favourite **</button>

                {
                    props.count > 1 &&
                    <button type="button" data-spendline={props.count} onClick={props.removeSpendLine}>Remove</button>
                }
            </div>
        </div>
    );
};

export default Main;