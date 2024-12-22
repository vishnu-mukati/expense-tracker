import { Fragment, useContext } from "react";
import { Nav } from "react-bootstrap";
import axios from "axios";
import { useCol } from "react-bootstrap/esm/Col";
import AuthContext from "../store/AuthContext";


const ChangePassword = () => {

    const authCtx = useContext(AuthContext);
    const token = authCtx.token;

    async function formSubmitHandler(event) {
        event.preventDefault();
        try {
            const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw',
                {
                    requestType: "CHANGE_PASSWORD",
                    idToken: token,
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
                    <input type="text" id="changepassword" />
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