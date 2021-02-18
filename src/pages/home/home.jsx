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
        <div className={"home"}>
            <PageHeader title={`Welcome to SpotiMy, ${user?.display_name}`}/>
            <div className={"home-buttons container"}>
                <div className={"home-buttons__btn"} onClick={() => {
                    history.push('/playlists')
                }}>
                    My Playlists
                </div>
                <div className={"home-buttons__btn"} onClick={() => {
                    history.push('/playlists/creator')
                }}>
                    Playlist Generator
                </div>
            </div>
        </div>
    );
};
export default Home;
