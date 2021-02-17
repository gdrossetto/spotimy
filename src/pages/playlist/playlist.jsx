import React, {useEffect, useState} from 'react';
import './playlist.styles.scss';
import {useParams} from 'react-router-dom';
import {getPlaylistById, getUserPlaylistTracks} from "../../services/user.service";
import {getRecomendationsArtists} from "../../services/recomendations.service";
import {createPlaylist} from "../../services/playlists.service";
import {useSelector} from "react-redux";
import Modal from "../../components/modal-input/modal-input.component";
import Track from "../../components/track/track.component";
import PageHeader from "../../components/page-header/page-header.component";

const Playlist = () => {

    let {id} = useParams();
    const user = useSelector(state => state.user);

    const [playlist, setPlaylist] = useState({});
    const [recomended, setRecomended] = useState([])
    const [showModal, setShowModal] = useState(false);

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

    async function getArtistsRecommended() {
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
            <PageHeader title={playlist?.name}/>
            <div className={"playlist-tracks container"}>
                {playlist.tracks ? playlist.tracks.items.map((track) => {
                    return (
                        <Track key={track.id} track={track.track}/>
                    )
                }) : null}
            </div>

            <div className={"playlist-similar__header"}>
                <div className={"py-4"}>
                    <h3 className={"green-h3 text-center my-4"}>Similar songs you may enjoy!</h3>
                    <Modal
                        show={showModal}
                        onCancel={() => setShowModal(false)}
                        onCreate={() => createPlaylist('Playlist Teste', user.id)}
                    >
                    </Modal>
                    <button onClick={() => setShowModal(true)}
                            className={"btn btn-green-outline d-block m-auto"}>Generate Quick Playlist
                    </button>
                </div>
            </div>

            <div className={"playlist-tracks container"}>
                {recomended.tracks ? recomended.tracks.map((track) => {
                    return (
                        <Track key={track.id} track={track}/>
                    )
                }) : null}
            </div>

        </div>
    );
}
export default Playlist;
