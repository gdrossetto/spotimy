import React, {useEffect, useState} from 'react';
import './playlist.styles.scss';
import {useParams} from 'react-router-dom';
import {getPlaylistById, getUserPlaylistTracks} from "../../services/user.service";

const Playlist = () => {
    const [playlist, setPlaylist] = useState({});
    let {id} = useParams();

    async function getPlaylist() {
        let playList = await getPlaylistById(id);
        console.log(playList)
        setPlaylist(playList);
    }

    useEffect(() => {
        getPlaylist();
    }, [id])

    return (
        <div className={"playlist"}>
            <div className={"page-header"}>
                {playlist?.name}
            </div>
            <div className={"playlist-tracks container"}>
                {playlist.tracks ? playlist.tracks.items.map((track) => {
                    return (
                        <div key={track.track.id} className={"playlist-track"}>
                            <img src={track.track.album.images[0].url} alt=""/>
                            <h3 className={"playlist-track__name"}>{track.track.name}</h3>
                            <span className={"playlist-track__artist"}>{track.track.artists[0].name}</span>
                        </div>
                    )
                }) : null}
            </div>
        </div>
    );
}
export default Playlist;
