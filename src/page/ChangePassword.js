import { Fragment ,useRef} from "react";
import { Nav } from "react-bootstrap";
import axios from "axios";


const ChangePassword = () => {
     const emailInputRef = useRef();

  

    async function formSubmitHandler(event) {
        event.preventDefault();
        try {
             await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw',
                {
                    requestType: "PASSWORD_RESET",
                    email: emailInputRef.current.value,
                }
            )
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