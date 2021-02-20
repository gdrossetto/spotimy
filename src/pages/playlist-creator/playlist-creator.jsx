import React, {useEffect, useState} from 'react';
import './playlist-creator.styles.scss';
import {searchArtistsByName} from "../../services/search.service";
import PageHeader from "../../components/page-header/page-header.component";
import {getUserTopArtists} from "../../services/user.service";
import {getRecomendationsArtists} from "../../services/recomendations.service";
import Modal from "../../components/modal-input/modal-input.component";
import {addTracksToPlaylist, createPlaylist} from "../../services/playlists.service";
import {useSelector} from "react-redux";
import {useHistory} from "react-router-dom";
import ArtistCard from "../../components/artist-card/artist-card.component";
import Loading from "../../components/loading/loading.component";

const PlaylistCreator = () => {

    const [search, setSearch] = useState('');
    const [artists, setArtists] = useState([]);
    const [artistPicks, setArtistPicks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [newPlaylistName, setNewPlaylistName] = useState('');
    const [generatedTracks,setGeneratedTracks] = useState({});
    const [loading,setLoading] = useState(false);

    const user  = useSelector(state => state.user);
    const history = useHistory();

    async function searchArtists() {
        let artistsResults = await searchArtistsByName(search);
        console.log(artistsResults.artists.items)
        setArtists(artistsResults.artists.items);
    }

    async function favoriteArtists() {
        setLoading(true);
        let artistsResults = await getUserTopArtists();
        console.log(artistsResults)
        setArtists(artistsResults.items);
        setLoading(false);
    }

    function pickArtist(artist) {
        if (artistPicks.length < 5 && (artistPicks.findIndex(item => item.id === artist.id) < 0))
            setArtistPicks([...artistPicks, artist]);
    }

    function removePick(artist) {
        const newPicks = artistPicks.filter(pick => pick.id !== artist.id);
        setArtistPicks(newPicks);
    }

    async function getArtistsRecommended(artists) {
        if(artists.length>0) {
            setLoading(true);
            const artistsIds = [];
            artists.forEach(artist => artistsIds.push(artist.id));
            let recommendedTracks = await getRecomendationsArtists(artistsIds);
            setGeneratedTracks(recommendedTracks);
            setLoading(false)
        }
    }

    function createRelatedPlaylist(name, tracks) {
        setLoading(true);
        setShowModal(false);
        createPlaylist(name, user.id).then((res) => {
            setNewPlaylistName('');
            addTracksToPlaylist(res.id, tracks).then((response) => {
                if (response.snapshot_id) {
                    setLoading(false);
                    history.push('/playlist/' + res.id);
                }
            })
        });
    }

    useEffect(() => {
        favoriteArtists();
    }, [])

    useEffect(() => {
        console.log(artistPicks)
        getArtistsRecommended(artistPicks)
    }, [artistPicks])


    return (
        <main className={"playlist-creator"}>
            <PageHeader title={'Playlist Creator'}/>
            <Loading loading={loading}/>
            <Modal
                show={showModal}
                onCancel={() => setShowModal(false)}
                onCreate={() => createRelatedPlaylist(newPlaylistName, generatedTracks.tracks)}
                onType={(e) => setNewPlaylistName(e)}
                value={newPlaylistName}
            >
            </Modal>
            <div className={"container mt-5"}>
                <div className={"col-8 m-auto"}>
                    <h3 className={"text-center"}>Select up to 5 artists</h3>
                    <div className="mt-5 d-flex">
                        <input type="search" autoComplete={'off'} value={search}
                               onChange={(e) => setSearch(e.target.value)}
                               className="form-control" id="search"/>
                        <button onClick={() => searchArtists()} className="btn btn-green-outline">Search</button>
                    </div>
                </div>
                <div className={"artists-picks"} style={{display: artistPicks.length > 0 ? 'flex' : 'none'}}>
                    {artistPicks?.map((artist) => {
                        return (
                            <div key={artist.id} className={"artists-badge"}>
                                <button onClick={() => removePick(artist)}
                                        className={"btn btn-danger artists-badge__delete"}>X
                                </button>
                                <span>{artist?.name}</span>
                            </div>
                        )
                    })}

                </div>
                <button onClick={() => {
                    setShowModal(true);
                }} disabled={artistPicks.length > 0 ? false : true}
                        className={"ml-5 btn btn-outline-warning d-block ms-auto me-auto my-4"}>Generate playlist
                </button>

                <div className={"artists-list"}>
                    {artists?.map((artist) => {
                        return (
                            <ArtistCard artist={artist} onPick={()=>pickArtist(artist)} />
                        )
                    })}
                    <div className={"artists-invisible"}></div>
                    <div className={"artists-invisible"}></div>
                </div>
            </div>
        </main>
    );
}
export default PlaylistCreator;
