    import { Fragment, useState, useContext, useEffect } from "react";
    import { Nav } from "react-bootstrap";
    import AuthContext from "../store/AuthContext";
    import classes from "./CompleteProfile.module.css";
    import axios from "axios";

    const CompleteProfile = () => {
        const authCtx = useContext(AuthContext);
        const [isLoading, setIsLoading] = useState(false);
        const [initialData, setInitialData] = useState({ displayName: "", photoUrl: "" });
        console.log(initialData);
        const token = authCtx.token;

        // useEffect(() => {
            const inputNameHandler = (event) => {
                setInitialData((prevState)=>({
                    ...prevState,displayName:event.target.value
        }))
            }

            const inputUrlHandler = (event) =>{
                setInitialData((prevState)=>({
                    ...prevState,photoUrl:event.target.value
            }))
            }
        // }, [initialData])


        const logOutHandler = () => {
            authCtx.logout();
        }

        useEffect(() => {
            getdata();
        }, [])

        async function getdata() {
            try {
                const response = await axios.post("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw", { "idToken": token })
                console.log(response.data.users[0]);
                const userdata = response.data.users[0];
                setInitialData({displayName:userdata.displayName,photoUrl:userdata.photoUrl});
            } catch (err) {
                console.log(err.message);
            }
        }

        async function submitFormHandler(event) {
            event.preventDefault();

            const fullName = event.target.name.value;
            const profilePhotoUrl = event.target.url.value;



            setIsLoading(true);

            let url = 'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw';

            try {
                const response = await axios.post(url, {
                    idToken: token,
                    displayName: fullName,
                    photoUrl: profilePhotoUrl,
                    returnSecureToken: true
                })
                setIsLoading(false);
                console.log(response);
                if (response.status === 200) {
                    console.log('Profile updated successfully');
                }
            } catch (err) {
                console.log(err.message);
            }


            // fetch(url, {
            //     method: 'POST',
            //     body: JSON.stringify({
            //         idToken: token,
            //         displayName: fullName,
            //         photoUrl: profilePhotoUrl,
            //         returnSecureToken: true
            //     }),
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // }).then(res => {
            //     setIsLoading(false);
            //     if (res.ok) {
            //         return res.json();
            //     } else {
            //         return res.json().then((data) => {
            //             const errorMessage = 'Authentication error';
            //             throw new Error(errorMessage);
            //         });
            //     }
            // }).then((data) => {
            //     // authCtx.login(data.idToken, data.email);
            //     console.log('Profile updated successfully');
            // }).catch((error) => {
            //     alert(error.message);
            // });



        };

        return (
            <Fragment>
                <div className={classes.container}>
                    <p className={classes.leftText}>Winners never quit, Quitters never win.</p>
                    <p className={classes.rightText}>
                        Your profile is 64% completed. A complete profile has higher chances of landing a job.
                        <Nav.Link href="/completeprofile" style={{ display: 'inline' }}>Complete Now</Nav.Link>
                    </p>
                </div>
                <hr />
                <div>
                    <h2>Contact Details</h2>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                        <button className="cancel">Cancel</button>
                        <form onSubmit={submitFormHandler} style={{ width: '60%' }}>
                            <div>
                                <label htmlFor="name">Full Name:</label>
                                <input type="text" id="name" required value={initialData.displayName} onChange={inputNameHandler} />
                            </div>
                            <div>
                                <label htmlFor="url">Profile Photo URL</label>
                                <input type="url" id="url" required value={initialData.photoUrl} onChange={inputUrlHandler}/>
                            </div>
                            <div>
                                <button type="submit">Update</button>
                            </div>
                        </form>
                        <div>
                            <button type="button" onClick={logOutHandler}>Logout</button>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    };

    export default CompleteProfile;
