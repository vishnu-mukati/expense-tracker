import React ,{ useContext, useState } from "react";
import AuthContext from "../../store/AuthContext";
import classes from "./ExpenseList.module.css";

const ExpenseList = () => {

  const Authctx = useContext(AuthContext);

  const data = Authctx.expensedata;

  console.log(data);


  return (
    <ul className={classes.expenses}>
      {data.map((item, index) => (
        <li key={index}>
          <p>Amount: {item.amount}</p>
          <p>Title: {item.title}</p>
          <p>Description: {item.description}</p>
        </li>
      ))}
    </ul>
  );
}

export default ExpenseList;