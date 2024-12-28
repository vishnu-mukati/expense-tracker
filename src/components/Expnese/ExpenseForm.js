import React, { useContext, useEffect, useState } from "react";
import classes from "./ExpenseForm.module.css";
import ExpenseContext from "../../store/ExpenseContext";

const ExpenseForm = () => {

    const [enteredtitle, setenteredTitle] = useState('');
    const [enteredamount, setenteredAmount] = useState('');
    const [entereddescription, setentereddescription] = useState('');
    const [showform, setshowForm] = useState(false);

    const Expensectx = useContext(ExpenseContext);
    const editdata = Expensectx.editingexpense;

    useEffect(()=>{
        if(editdata){
            setenteredTitle(editdata.title);
            setentereddescription(editdata.description);
            setenteredAmount(editdata.amount);
            setshowForm(true);
        }
    },[editdata])

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

    const  formSubmitHandler = (event) =>{
        event.preventDefault();
        const ExpenseData = {
            title: enteredtitle,
            amount: enteredamount,
            description: entereddescription,
        }
        Expensectx.addexpense(ExpenseData);
       

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