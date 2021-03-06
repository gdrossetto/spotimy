import "./App.scss";
import { Router, Switch, Route } from "react-router-dom";
import Home from "./pages/home/home";
import { createBrowserHistory } from "history";
import RedirectPage from "./pages/redirect";
import { useEffect } from "react";
import { getExpiryTime } from "./util";
import Login from "./pages/auth/login";
import { getUserInfo } from "./services/user.service";
import { useDispatch, useSelector } from "react-redux";
import Playlists from "./pages/playlists/playlists";
import Playlist from "./pages/playlist/playlist";
import PlaylistCreator from "./pages/playlist-creator/playlist-creator";
import PageHeader from "./components/page-header/page-header.component";

const history = createBrowserHistory();

function App() {
  const currentDate = new Date().getTime();
  const user = useSelector((state) => state.user);

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
      {user.id ? <PageHeader /> : null}
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/playlists" component={Playlists} exact />
        <Route path="/playlists/creator" component={PlaylistCreator} exact />
        <Route path="/playlist/:id" component={Playlist} exact />
        <Route path="/login" component={Login} />
        <Route path="/redirect" component={RedirectPage} />
      </Switch>
    </Router>
  );
}

export default App;
