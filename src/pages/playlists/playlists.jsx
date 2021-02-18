import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUserPlaylists} from "../../services/user.service";
import './playlists.styles.scss';
import {useHistory} from "react-router-dom";
import PlaylistCard from "../../components/playlist-card/playlist-card.component";
import PageHeader from "../../components/page-header/page-header.component";
import {unfollowPlaylist} from "../../services/playlists.service";

const Playlists = () => {
    const user = useSelector((state) => state.user);
    const [playlists, setPlaylists] = useState([]);
    const history = useHistory();

    async function getPlaylists() {
        console.log('Pegando playlists')
        let myPlaylists = await getUserPlaylists();
        setPlaylists(myPlaylists.items);
    }

    async function deletePlaylist(playlistId){
       unfollowPlaylist(playlistId).then((response)=> {
           console.log(response);
           getPlaylists()
       });

    }


    useEffect(() => {
        getPlaylists();
    }, [user]);

    return (
        <div className="playlists">
            <PageHeader title={"My Playlists"}/>
            <div className="playlists-list container">
                {playlists.map((item) => {
                    return (
                        <PlaylistCard key={item.id} playlist={item} onUnfollow={() => deletePlaylist(item.id)}/>
                    );
                })}
                <div className={"playlists-invisible"}></div>
                <div className={"playlists-invisible"}></div>
            </div>

        </div>
    );
};
export default Playlists;
