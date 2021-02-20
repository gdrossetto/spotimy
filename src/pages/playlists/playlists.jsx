import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUserPlaylists} from "../../services/user.service";
import './playlists.styles.scss';
import {useHistory} from "react-router-dom";
import PlaylistCard from "../../components/playlist-card/playlist-card.component";
import PageHeader from "../../components/page-header/page-header.component";
import {unfollowPlaylist} from "../../services/playlists.service";
import Loading from "../../components/loading/loading.component";

const Playlists = () => {
    const user = useSelector((state) => state.user);
    const [playlists, setPlaylists] = useState([]);
    const [loading,setLoading] = useState(false);
    const history = useHistory();

    async function getPlaylists() {
        setLoading(true);
        let myPlaylists = await getUserPlaylists();
        setPlaylists(myPlaylists.items);
        setLoading(false);
    }

    async function deletePlaylist(playlistId){
        setLoading(true);
       unfollowPlaylist(playlistId).then((response)=> {
           getPlaylists()
       });

    }


    useEffect(() => {
        getPlaylists();
    }, [user]);

    return (
        <div className="playlists">
            <Loading loading={loading}/>
            <PageHeader title={"My Playlists"}/>
            <div className="playlists-list container">
                {playlists.map((item,index) => {
                    return (
                        <PlaylistCard key={index} playlist={item} onUnfollow={() => deletePlaylist(item.id)}/>
                    );
                })}
                <div className={"playlists-invisible"}></div>
                <div className={"playlists-invisible"}></div>
            </div>

        </div>
    );
};
export default Playlists;
