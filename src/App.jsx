import "./App.scss";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/home";
import { createBrowserHistory } from "history";
import RedirectPage from "./pages/redirect";
import { useEffect } from "react";
import { getExpiryTime } from "./util";
import Login from "./pages/auth/login";
import { getUserInfo } from "./services/user.service";
import { useDispatch } from "react-redux";
import Playlists from "./pages/playlists/playlists";

const history = createBrowserHistory();

function App() {
  const currentDate = new Date().getTime();
  const dispatch = useDispatch();

  async function setUser() {
    const userData = await getUserInfo();
    dispatch({ type: "SET_USER", user: userData });
  }

  useEffect(() => {
    if (currentDate < getExpiryTime()) {
		setUser();
    	return;
    } else {
      history.push("/login");
    }
  }, []);

  return (
    <Router history={history}>
      <Switch>
        <Route path="/" component={Home} exact />
		<Route path="/playlists" component={Playlists} exact />
        <Route path="/login" component={Login} />
        <Route path="/redirect" component={RedirectPage} />
      </Switch>
    </Router>
  );
}

export default App;
