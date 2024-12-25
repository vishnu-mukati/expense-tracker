import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import classes from "./ExpenseForm.module.css";
import AuthContext from "../../store/AuthContext";
import axios from "axios";

const ExpenseForm = () => {

    const [enteredtitle, setenteredTitle] = useState('');
    const [enteredamount, setenteredAmount] = useState('');
    const [entereddescription, setentereddescription] = useState('');
    const [showform, setshowForm] = useState(false);

    const Authctx = useContext(AuthContext);

    const titleChangeHandler = (event) => {

        setenteredTitle(event.target.value);
    }

    const amountChangeHandler = (event) => {

        setenteredAmount(event.target.value);
    }

    const descriptionChangeHandler = (event) => {
        setentereddescription(event.target.value);
    }

    const showFormHandler = () => {
        setshowForm(true);
    }

    const cancelFormHandler = () => {
        setshowForm(false);
    }

    async function formSubmitHandler (event){
        event.preventDefault();
        const ExpenseData = {
            title: enteredtitle,
            amount: enteredamount,
            description: entereddescription,
        }

        try{
            const response = await axios.post('https://expense-tracker-data-eea66-default-rtdb.firebaseio.com/expenses.json',
            {
                 ExpenseData,
            })
            Authctx.addExpense(ExpenseData);
        }catch(err){
            console.log(err.message);
        }

        setenteredTitle("");
        setenteredAmount("");
        setentereddescription("");
        setshowForm(false);
    }

    return (
        <>
            <div className={classes["centered-container"]}>
                {showform ? (
                    <div className={classes["form-box"]}>
                        <form onSubmit={formSubmitHandler}>
                            <div className={classes["new-expense__controls"]}>
                                <div className={classes["new-expense__control"]}>
                                    <label htmlFor="amount">Amount</label>
                                    <input
                                        type="number"
                                        id="amount"
                                        value={enteredamount}
                                        onChange={amountChangeHandler}
                                    />
                                </div>

                                <div className={classes["new-expense__control"]}>
                                    <label htmlFor="description">Description</label>
                                    <input
                                        type="text"
                                        id="description"
                                        value={entereddescription}
                                        onChange={descriptionChangeHandler}
                                    />
                                </div>

                                <div className={classes["new-expense__control"]}>
                                    <label htmlFor="title">Title</label>
                                    <select
                                        id="title"
                                        value={enteredtitle}
                                        onChange={titleChangeHandler}
                                    >
                                        <option value="">Select Title</option>
                                        <option>Food</option>
                                        <option>Petrol</option>
                                        <option>Salary</option>
                                    </select>
                                </div>
                            </div>

                            <div className={classes["new-expense__actions"]}>
                                <button type="button" onClick={cancelFormHandler}>
                                    Close
                                </button>
                                <button type="submit">Add Expense</button>
                            </div>
                        </form>
                    </div>
                ) : (
                    <button
                        type="button"
                        onClick={showFormHandler}
                        className={classes["add-expense-button"]}
                    >
                        Add Expense
                    </button>
                )}
            </div>
        </>
    );
}

export default ExpenseForm;