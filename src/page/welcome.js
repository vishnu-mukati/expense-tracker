import { Nav } from "react-bootstrap";
import classes from "./Welcome.module.css";
import axios from "axios";
import { useContext } from "react";
import AuthContext from "../store/AuthContext";

const Welcome = () =>{

    const authCtx = useContext(AuthContext);

    const token = authCtx.token;

    async function varifyEmailHandler (event){
        try{
         const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw',
            {
                requestType: "VERIFY_EMAIL",
                idToken: token, 
            },
            
         )
         console.log(response.data);
        }catch(err){
            console.log(err.message);
        }
    }

    return (
        <div className={classes.container}>
        <p className={classes.leftText}>Welcome to expense tracker!!!</p>
        <p className={classes.rightText}>
            Your profile is incomplete.{' '}
            <Nav.Link href="/completeprofile" style={{ display: 'inline' }}>Complete Now</Nav.Link>
        </p>
        <div>
            <button onClick={varifyEmailHandler}>Verify Email id</button>
        </div>
        <hr />
    </div>
    );
}

export default Welcome;