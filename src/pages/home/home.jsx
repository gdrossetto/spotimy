import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import './home.styles.scss';

const Home = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (
        <div>
            <div className={"page-header"}>
                Welcome to SpotiMy, {user?.display_name}
            </div>
            <button className="btn btn-green-outline d-block m-auto" onClick={() => {
                history.push('/playlists')
            }}>Minhas playlists
            </button>
        </div>
    );
};
export default Home;
