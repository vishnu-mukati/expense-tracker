import { useState, useRef } from 'react';
import {useDispatch, useSelector} from "react-redux";
import classes from './AuthForm.module.css';
import axios from 'axios';
import { authActions } from '../../store/AuthSlice';
import { useHistory } from "react-router-dom";

const AuthForm = () => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const confirmpasswordInputRef = useRef();
  const history = useHistory();
  // const authCtx = useContext(AuthContext);

 const dispatch = useDispatch();
 const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
 const email = useSelector(state =>state.auth.email);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  async function formSubmitHandler(event) {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;


    setIsLoading(true);


    let url;
    if (isLogin) {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw'

    } else {
      url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw'
      const enteredConfirmPassword = confirmpasswordInputRef.current.value;
      if (enteredConfirmPassword !== enteredPassword) {
        alert('password does not match');
        return;
      }

    };

    let token;

    try {
      const response = await axios.post(url, {
        email: enteredEmail,
        password: enteredPassword,
        returnSecureToken: true,
      })
      setIsLoading(false);
      // authCtx.login(response.data.idToken, response.data.email);
      dispatch(authActions.login({email : enteredEmail,token : response.data.idToken}))
      token = response.data.idToken;
      if (response.status === 200) {
        console.log('User has successfully signed up');
      }
    } catch (err) {
      alert(err.response.data.error.message);
      setIsLoading(false);
    }


    if(!isLogin){
      try {
        const response = await axios.post('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyDHMqQkqmIyImQE6qLDutjgiQ4dNMSFKVw',
            {
                requestType: "VERIFY_EMAIL",
                idToken: token,
            },

        )
        history.push("/");
    } catch (err) {
        console.log(err.message);
    }
    }
  };


  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'signup'}</h1>
      <form onSubmit={formSubmitHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input type='email' id='email' required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            ref={passwordInputRef}
          />
        </div>
        {!isLogin && (<div className={classes.control}>
          <label htmlFor='confirm'>Confirm Password</label>
          <input
            type='password'
            id='confirm'
            required
            ref={confirmpasswordInputRef}
          />
        </div>)}


        <div className={classes.actions}>
          {!isLoading && isLogin ? <button type='submit'  className={classes.actions}>  {isLoading ? "Sending request..." : "Login"} </button> : <button type='submit' className={classes.actions} > {isLoading ? "Sending request..." : "signup"} </button>}
          
        </div>

        <div>
          <a href="/changepassword" className={classes.forgotPassword}>
            Forgot Password?
          </a>
        </div>

        <div className={classes.actions}>
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Don't have an account? Sign up" : 'Have an account?Login'}
          </button>
        </div>
      </form>
    </section>
  );
};

export default AuthForm;
