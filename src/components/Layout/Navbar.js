import {useState, useContext } from "react";
import { Button, Container, Nav } from "react-bootstrap";
import { Link } from "react-router-dom";
import AuthContext from "../../store/AuthContext";
import classes from "./Navbar.module.css";

const Navbar = () => {
    const [pageTitle, setPageTitle] = useState("Welcome to Expense Tracker!!!");


    const handleCompleteNowClick = () => {
        setPageTitle("Winners never quit, Quitters never win.");
    };

    const handleWelcomePageClick = () => {
        setPageTitle("Welcome to Expense Tracker!!!");
    };

    const Authctx = useContext(AuthContext);

    return (
        <header className={classes.header}>
            <Link to="/" onClick={handleWelcomePageClick}>
                <div>{pageTitle}</div>
            </Link>
            <nav>
                <ul>
                    {Authctx.isLoggedIn && (

                        <li className={classes.profile}>
                            <Link to="/" onClick={handleWelcomePageClick}>Welcome</Link>
                            <p>Your profile is incomplete? <Link to="/completeprofile" onClick={handleCompleteNowClick}>Complete Now</Link></p>
                        </li>

                    )}
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;