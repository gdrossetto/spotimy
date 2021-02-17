import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import './home.styles.scss';
import PageHeader from "../../components/page-header/page-header.component";

const Home = () => {

    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);

    return (
        <div>
            <PageHeader title={`Welcome to SpotiMy, ${user?.display_name}`}/>
            <button className="btn btn-green-outline d-block m-auto mb-4" onClick={() => {
                history.push('/playlists')
            }}>My playlists
            </button>
            <button className="btn btn-green-outline d-block m-auto" onClick={() => {
                history.push('/playlists/creator')
            }}>Generate Playlist
            </button>
        </div>
    );
};
export default Home;
