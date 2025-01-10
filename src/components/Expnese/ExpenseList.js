import React ,{ useEffect } from "react";
import classes from "./ExpenseList.module.css";
import axios from "axios";
import { useDispatch,useSelector } from "react-redux";
import { expenseAction } from "../../store/ExpensesSlice";

const ExpenseList = ({setFormData }) => {

  const dispatch = useDispatch();
  const expensedata = useSelector(state=>state.expense.expensedata);
  

  useEffect(()=>{
    getdata();
  },[]);

  async function getdata() {
    try{
      const response = await axios.get('https://expense-tracker-data-eea66-default-rtdb.firebaseio.com/expenses.json');
      

      Object.keys(response.data).forEach(key => {
        const expenseData = {
          id: key,
          ...response.data[key],
        };
        // Dispatch each expense as an individual object
        dispatch(expenseAction.addexpense(expenseData));
      });
    }catch(err){
      console.log(err.message);
    }
  }

  async function  deleteExpenseHandler(id){
    try{
         await axios.delete(`https://expense-tracker-data-eea66-default-rtdb.firebaseio.com/expenses/${id}.json`)
        console.log('Expense successfuly deleted');
        dispatch(expenseAction.deleteexpense(id));
      }catch(err){
          console.log(err.message);
      }
}

  async function editExpenseHandler(item){
      try{
        dispatch(expenseAction.editexpense({item}));
        setFormData(item);
        dispatch(expenseAction.deleteexpense(item.id));
        
      }catch(err){
        console.log(err.message);
      }
  }

  return (
    <ul className={classes.expenses}>
      {expensedata.map((item) => (
        <li key={item.id}>
          <p>Amount: {item.amount}</p>
          <p>Title: {item.title}</p>
          <p>Description: {item.description}</p>
          <button onClick={()=>deleteExpenseHandler(item.id)}>Delete</button>
          <button onClick={()=>editExpenseHandler(item)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;