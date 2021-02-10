import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUserPlaylists} from "../../services/user.service";
import './playlists.styles.scss';
import {useHistory} from "react-router-dom";
import PlaylistCard from "../../components/playlist-card.component";

const Playlists = () => {
    const user = useSelector((state) => state.user);
    const [playlists, setPlaylists] = useState([]);
    const history = useHistory();

    async function getPlaylists() {
        let myPlaylists = await getUserPlaylists();
        setPlaylists(myPlaylists.items);
    }


    useEffect(() => {
        getPlaylists();
    }, [user]);

    return (
        <div className="playlists">
            <div className={"page-header"}>
                My playlists
            </div>
            <div className="playlists-list container">
                {playlists.map((item) => {
                    return (
                        <PlaylistCard playlist={item}/>
                    );
                })}
                <div className={"playlists-invisible"}></div>
                <div className={"playlists-invisible"}></div>
            </div>

        </div>
    );
};
export default Playlists;
