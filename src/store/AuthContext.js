import React, { useId, useState } from "react";

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    email: '',
    login: (token, email) => { },
    logout: () => { },
})

export const AuthContextProvider = (props) => {
    const initialToken = localStorage.getItem('token');
    const intialemail = localStorage.getItem('email');
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState('email');
    const userIsLoggedIn = !!token;

   console.log(token);

    const logoutHandler = () => {
        setToken(null);
        localStorage.removeItem('token');
        
        setEmail('');
    }
    const loginHandler = (token, email) => {
        setToken(token);
        localStorage.setItem('token', token);

        const emailid = email.replace(/[@.]/g,"")
        setEmail(emailid);
        localStorage.setItem('email',emailid);

    }

    const ContextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        email: email,
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