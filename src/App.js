import { useContext } from "react";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import AuthForm from "./components/Auth/AuthForm";
import AuthContext from "./store/AuthContext";
import Welcome from "./page/Welcome";
import CompleteProfile from "./page/CompleteProfile";
import ChangePassword from "./page/ChangePassword";

function App() {
  const Authctx = useContext(AuthContext);

  return (
    <Router>
      <Switch>
       
        {!Authctx.isLoggedIn && <Route path="/" exact component={AuthForm} />}

        <Route path="/changepassword" component={ChangePassword}/>
            
        

        {/* Routes for logged-in users */}
        {Authctx.isLoggedIn && (
          <>
            <Route path="/" exact component={Welcome} />
            <Route path="/completeprofile" component={CompleteProfile} />
          </>
        )}

        <Route path="*">
          <Redirect to="/" />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
