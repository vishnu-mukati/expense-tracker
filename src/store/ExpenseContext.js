import React, { useState, useEffect } from "react";
import axios from "axios";


const ExpenseContext = React.createContext({
    expensedata: [],
    addexpense: () => { },
    deleteexpense: () => { },
    editingexpense : null,
})

export const ExpenseContextProvider = (props) => {

    const [expensedata, setExpenseData] = useState([]);

   const [editingexpense,setEditingExpense] = useState(null);

    useEffect(() => {
        getexpensedata();
    }, [])

    async function getexpensedata() {
        try {
            const response = await axios.get(`https://expense-tracker-data-eea66-default-rtdb.firebaseio.com/expenses.json`);
            if (response.data) {

                const transformedData = Object.keys(response.data).map((key) => ({
                    id: key,
                    ...response.data[key],
                }));
                setExpenseData(transformedData);
            }
        } catch (err) {
            console.log(err.message);
        }
    }

    async function addExpenseHandler(expense){
        try{
            const response = await axios.post('https://expense-tracker-data-eea66-default-rtdb.firebaseio.com/expenses.json', expense)
                    const newexpense = { id: response.data.name, ...expense };
                    setExpenseData((prevState) => {
                        return [...prevState, newexpense];
                    })
        }catch(err){
            console.log(err.message);
        }

    }

    async function  deleteExpenseHandler(id){
        try{
             await axios.delete(`https://expense-tracker-data-eea66-default-rtdb.firebaseio.com/expenses/${id}.json`)
            console.log('Expense successfuly deleted');
            setExpenseData((prevState)=>prevState.filter((expense)=>expense.id!==id));
          }catch(err){
              console.log(err.message);
          }
    }

    async function editExpenseHandler (expense,id) {

        setEditingExpense({...expense,id})

        setExpenseData((prevState)=>prevState.filter((expense)=>expense.id!==id));
    }

    const ExpenseValue = {
        expensedata: expensedata,
        addexpense: addExpenseHandler,
        deleteexpense: deleteExpenseHandler,
        editexpense: editExpenseHandler,
        editingexpense: editingexpense,
        
    }

    return (
        <ExpenseContext.Provider value={ExpenseValue}>
            {props.children}
        </ExpenseContext.Provider>
    );
}

export default ExpenseContext;