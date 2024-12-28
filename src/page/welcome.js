import { Nav } from "react-bootstrap";
import classes from "./Welcome.module.css";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import ExpenseForm from "../components/Expnese/ExpenseForm";
import ExpenseList from "../components/Expnese/ExpenseList";

const Welcome = () => {

   
    return (
        <div className={classes.container}>
            <div>
                <ExpenseForm />
                <ExpenseList />
            </div>


        </div>
    );
}

export default Welcome;