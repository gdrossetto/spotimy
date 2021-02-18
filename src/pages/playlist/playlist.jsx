import React, {useEffect, useState} from 'react';
import './playlist.styles.scss';
import {useParams} from 'react-router-dom';
import {getRecomendationsArtists} from "../../services/recomendations.service";
import {addTracksToPlaylist, createPlaylist, getPlaylistById} from "../../services/playlists.service";
import {useSelector} from "react-redux";
import Modal from "../../components/modal-input/modal-input.component";
import Track from "../../components/track/track.component";
import PageHeader from "../../components/page-header/page-header.component";
import {useHistory} from "react-router-dom";

const Playlist = () => {

    let {id} = useParams();
    const user = useSelector(state => state.user);
    const history = useHistory();

    const [playlist, setPlaylist] = useState({});
    const [recomended, setRecomended] = useState([])
    const [showModal, setShowModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');

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

    function createRelatedPlaylist(name, tracks) {
        setShowModal(false);
        createPlaylist(name, user.id).then((res) => {
            setNewPlaylistName('');
            addTracksToPlaylist(res.id, tracks).then((response) => {
                if (response.snapshot_id) {
                    history.push('/playlist/' + res.id);
                }
            })
        });
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
                        <Track key={track?.id} track={track.track}/>
                    )
                }) : null}
            </div>
            {recomended.tracks ?
                <div className={"playlist-similar__header container"}>
                    <div className={"py-4"}>
                        <h3 className={"green-h3 text-center my-4"}>Similar songs you may enjoy!</h3>
                        <Modal
                            show={showModal}
                            onCancel={() => setShowModal(false)}
                            onCreate={() => createRelatedPlaylist(newPlaylistName, recomended.tracks)}
                            onType={(e) => setNewPlaylistName(e)}
                            value={newPlaylistName}
                        >
                        </Modal>
                        <button onClick={() => setShowModal(true)}
                                className={"btn btn-green-outline d-block m-auto"}>Generate Quick Playlist
                        </button>
                        <button onClick={() => getArtistsRecommended()}
                                className={"btn btn-outline-warning d-block m-auto mt-4"}>Refresh Suggestions
                        </button>
                    </div>
                </div>

                : null}

            <div className={"playlist-tracks container"}>
                {recomended.tracks ? recomended.tracks.map((track) => {
                    return (
                        <Track key={track?.id} track={track}/>
                    )
                }) : null}
            </div>

        </div>
    );
}
export default Playlist;
