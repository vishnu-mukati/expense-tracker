import React, { useEffect, useId, useState } from "react";
import axios from "axios";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    email: '',
    expensedata : [],
    addExpense: (expense) => {},
    login: (token, email) => { },
    logout: () => { },
})

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const intialemail = localStorage.getItem('email');
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState('');
    const userIsLoggedIn = !!token;

    const [expensedata, setExpenseData] = useState([])

    console.log(expensedata);

    const key = expensedata.key;

    useEffect(()=>{
        getexpensedata();
    },[])

    async function getexpensedata(){
        try{
            const response = await axios.get(`https://expense-tracker-data-eea66-default-rtdb.firebaseio.com/expenses.json`);
            const transformedData = Object.keys(response.data).map(key => ({
               // Store the key as id if you need it
                ...response.data[key].ExpenseData,
                // Spread the expense data
            }));

            console.log(transformedData);
            setExpenseData(transformedData);
        }catch(err){
            console.log(err.message);
        }
    }

    const ExpenseDataHandler = (expense) => {
        setExpenseData((prevState) => [
            ...prevState,expense
           
        ]);
    }


    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');

        setEmail('');
    }
    const loginHandler = (token, email) => {
        setToken(token);
        localStorage.setItem('token', token);

        const emailid = email.replace(/[@.]/g, "")
        setEmail(emailid);
        localStorage.setItem('email', emailid);

    }

    const ContextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        email: email,
        expensedata : expensedata,
        addExpense: ExpenseDataHandler,
        login: loginHandler,
        logout: logoutHandler,
    }

    return (
        <AuthContext.Provider value={ContextValue}>
            {props.children}
        </AuthContext.Provider>
    );
}

export default AuthContext;