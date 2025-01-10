import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./AuthSlice";
import expenseReducer from "./ExpensesSlice"


const store = configureStore({
    reducer : {auth : authReducer,expense : expenseReducer}
});

export default store;