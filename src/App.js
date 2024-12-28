import { Fragment, useContext } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import AuthContext from "./store/AuthContext";
import Welcome from "./page/Welcome";
import CompleteProfile from "./page/CompleteProfile";
import ChangePassword from "./page/ChangePassword";
import Navbar from "./components/Layout/Navbar";
import { ExpenseContextProvider } from "./store/ExpenseContext";

function App() {
  const Authctx = useContext(AuthContext);

  return (
    <ExpenseContextProvider>
      <BrowserRouter>
        <Navbar />
        <Switch>
          {!Authctx.isLoggedIn && <Route path="/" exact component={AuthForm} />}
          <Route path="/changepassword" component={ChangePassword} />

          {Authctx.isLoggedIn && (
            <Route path="/" exact component={Welcome} />
          )}
          {Authctx.isLoggedIn && (
            <Route path="/completeprofile" component={CompleteProfile} />

          )}
          <Route path="*">
            <Redirect to="/" />
          </Route>
        </Switch>
      </BrowserRouter>
    </ExpenseContextProvider>
  );
}

export default App;
