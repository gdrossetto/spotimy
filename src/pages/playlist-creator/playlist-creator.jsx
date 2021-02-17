import React, {useEffect, useState} from 'react';
import './playlist-creator.styles.scss';
import {searchArtistsByName} from "../../services/search.service";

const PlaylistCreator = () => {

    const [search, setSearch] = useState('');
    const [artists, setArtists] = useState([]);
    const [artistPicks, setArtistPicks] = useState([]);

    async function searchArtists() {
        let artistsResults = await searchArtistsByName(search);
        console.log(artistsResults.artists.items)
        setArtists(artistsResults.artists.items);
    }

    function pickArtist(artist) {
        if (artistPicks.length < 5)
            setArtistPicks([...artistPicks, artist]);
    }

    useEffect(() => {
        console.log(artistPicks)
    }, [artistPicks])


    return (
        <main className={"playlist-creator"}>
            <div className={"page-header"}>
                Playlist Creator
            </div>
            <div className={"container"}>
                <h3 className={"text-center"}>Select 5 artists</h3>
                <div className="mt-5 d-flex">
                    <input type="search" value={search} onChange={(e) => setSearch(e.target.value)}
                           className="form-control" id="search"/>
                    <button onClick={() => searchArtists()} className="btn btn-green-outline">Search</button>
                </div>
                <div className={"artists-list picks"}>
                    {artistPicks?.map((artist) => {
                        return (
                            <div key={artist.id} className={"artists-item"}>
                                <img src={artist.images[0]?.url} alt=""/>
                                <span>{artist?.name}</span>
                            </div>
                        )
                    })}
                </div>
                <hr/>
                <div className={"artists-list"}>
                    {artists?.map((artist) => {
                        return (
                            <div key={artist.id} className={"artists-item"} onClick={() => pickArtist(artist)}>
                                <img src={artist.images[0]?.url} alt=""/>
                                <span>{artist?.name}</span>
                            </div>
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
