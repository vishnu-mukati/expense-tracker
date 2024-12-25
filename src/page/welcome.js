import { Nav } from "react-bootstrap";
import classes from "./Welcome.module.css";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";
import ExpenseForm from "../components/Expnese/ExpenseForm";
import ExpenseList from "../components/Expnese/ExpenseList";

const Welcome = () => {

    const authCtx = useContext(AuthContext);

    const token = authCtx.token;

    async function varifyEmailHandler(event) {
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw',
                {
                    requestType: "VERIFY_EMAIL",
                    idToken: token,
                },

            )
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <div className={classes.container}>
            <div>
                <ExpenseForm />
                <ExpenseList />
            </div>

            {/* <div>
                <button onClick={varifyEmailHandler}>Verify Email id</button>
            </div> */}

        </div>
    );
}

export default Welcome;