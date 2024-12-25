import { Fragment, useContext ,useRef} from "react";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { useCol } from "react-bootstrap/esm/Col";
import AuthContext from "../store/AuthContext";


const ChangePassword = () => {
     const emailInputRef = useRef();

    const authCtx = useContext(AuthContext);
    // const email = authCtx.email;

    async function formSubmitHandler(event) {
        console.log(emailInputRef.current.value);
        event.preventDefault();
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw',
                {
                    requestType: "PASSWORD_RESET",
                    email: emailInputRef.current.value,
                }
            )
            console.log(response.data);
        } catch (err) {
            console.log(err.message);
        }
    }

    return (
        <Fragment>
            <form onSubmit={formSubmitHandler}>
                <div>
                    <label htmlFor="changepassword">Enter the email with which you have registered</label>
                    <input type="text" id="changepassword" ref={emailInputRef}/>
                </div>
                <div>
                    <button>Send</button>
                </div>
            </form>
            <p>
                Already a user?
                <Nav.Link href="/auth">
                    LogIn
                </Nav.Link>
            </p>
        </Fragment>
    );
}

export default ChangePassword;