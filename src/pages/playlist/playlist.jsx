import React, {useEffect, useState} from 'react';
import './playlist.styles.scss';
import {useParams} from 'react-router-dom';
import {getPlaylistById, getUserPlaylistTracks} from "../../services/user.service";
import {getRecomendationsArtists} from "../../services/recomendations.service";

const Playlist = () => {
    const [playlist, setPlaylist] = useState({});
    const [recomended,setRecomended] = useState([])
    let {id} = useParams();

    async function getPlaylist() {
        let playList = await getPlaylistById(id);
        console.log(playList)
        setPlaylist(playList);
    }

    function getPlaylistArtists() {
        let artists = [];
        let artistsIds = [];
        const tracksArtists = playlist.tracks?.items.filter(track => track.track);
        if (tracksArtists?.length > 0) {
            tracksArtists?.forEach((item) => {
                item.track.artists?.forEach((artist) => {
                    artists.push(artist);
                })
            })
        }

        artists.forEach(artist => artistsIds.push(artist.id));
        return artistsIds;
    }

    async function getArtistsRecommended(){
        let rec = await getRecomendationsArtists(getPlaylistArtists());
        setRecomended(rec);

    }

    useEffect(() => {
        getPlaylist();
    }, [id])

    useEffect(() => {
        getArtistsRecommended();
    }, [playlist])

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
                <h3>Other songs you may enjoy!</h3>
                {recomended.tracks ? recomended.tracks.map((track) => {
                    return (
                        <div key={track.id} className={"playlist-track"}>
                            <img src={track.album.images[0].url} alt=""/>
                            <h3 className={"playlist-track__name"}>{track.name}</h3>
                            <span className={"playlist-track__artist"}>{track.artists[0].name}</span>
                        </div>
                    )
                }) : null}
            </div>


        </div>
    );
}
export default Playlist;
