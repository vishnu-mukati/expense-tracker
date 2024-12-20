import { useContext } from "react";
import AuthForm from "./components/Auth/AuthForm";
import AuthContext from "./store/AuthContext";
import Welcome from "./page/welcome";
function App() {
  const Authctx = useContext(AuthContext);
  return (
    <>
    {Authctx.isLoggedIn && <Welcome/>}
    {!Authctx.isLoggedIn &&<AuthForm/>}
    </>
  );
}

export default App;
