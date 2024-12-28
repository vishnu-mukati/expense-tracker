import React ,{ useContext } from "react";
import classes from "./ExpenseList.module.css";
import ExpenseContext from "../../store/ExpenseContext";
import axios from "axios";

const ExpenseList = () => {

  const Expensectx = useContext(ExpenseContext);

  const data = Expensectx.expensedata;

   const deleteExpenseHandler = (id) =>{
    Expensectx.deleteexpense(id);
  }

  async function editExpenseHandler(id){
      try{
        const response = await axios.get(`https://expense-tracker-data-eea66-default-rtdb.firebaseio.com/expenses/${id}.json`);
        console.log(response.data);
        Expensectx.editexpense(response.data,id);
        await axios.delete(`https://expense-tracker-data-eea66-default-rtdb.firebaseio.com/expenses/${id}.json`);
      }catch(err){
        console.log(err.message);
      }
  }


  return (
    <ul className={classes.expenses}>
      {data.map((item) => (
        <li key={item.id}>
          <p>Amount: {item.amount}</p>
          <p>Title: {item.title}</p>
          <p>Description: {item.description}</p>
          <button onClick={()=>deleteExpenseHandler(item.id)}>Delete</button>
          <button onClick={()=>editExpenseHandler(item.id)}>Edit</button>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;