import React, { useEffect, useState } from "react";
import "./playlist-creator.styles.scss";
import { searchArtistsByName } from "../../services/search.service";
import PageHeader from "../../components/page-header/page-header.component";
import { getUserTopArtists } from "../../services/user.service";
import { getRecomendationsArtists } from "../../services/recomendations.service";
import Modal from "../../components/modal-input/modal-input.component";
import {
  addTracksToPlaylist,
  createPlaylist,
} from "../../services/playlists.service";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import ArtistCard from "../../components/artist-card/artist-card.component";
import Loading from "../../components/loading/loading.component";
import {
  getRandomSongsFromArtist,
  getTracksFromSelectedArtists,
} from "../../services/artists.service";
import { shuffleArray } from "../../util/functions";

const PlaylistCreator = () => {
  const [search, setSearch] = useState("");
  const [artists, setArtists] = useState([]);
  const [artistPicks, setArtistPicks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [tracksPerArtist, setTracksPerArtist] = useState(20);
  const [generatedTracks, setGeneratedTracks] = useState({});
  const [loading, setLoading] = useState(false);

  const user = useSelector((state) => state.user);
  const history = useHistory();

  async function searchArtists() {
    if (search && search !== "") {
      let artistsResults = await searchArtistsByName(search);
      setArtists(artistsResults.artists.items);
    }
  }

  async function favoriteArtists() {
    setLoading(true);
    let artistsResults = await getUserTopArtists();
    setArtists(artistsResults.items);
    setLoading(false);
  }

  async function pickArtist(artist) {
    if (
      artistPicks.length < 5 &&
      artistPicks.findIndex((item) => item.id === artist.id) < 0
    )
      setArtistPicks([...artistPicks, artist]);
  }

  function removePick(artist) {
    const newPicks = artistPicks.filter((pick) => pick.id !== artist.id);
    setArtistPicks(newPicks);
  }

  async function getArtistsRecommended(artists) {
    if (artists.length > 0) {
      setLoading(true);
      const artistsIds = [];
      artists.forEach((artist) => artistsIds.push(artist.id));
      let recommendedTracks = await getTracksFromSelectedArtists(artistsIds);
      setGeneratedTracks(recommendedTracks);
      setLoading(false);
    }
  }

  function createRelatedPlaylist(name, tracks) {
    setLoading(true);
    setShowModal(false);
    createPlaylist(name, user.id).then((res) => {
      setNewPlaylistName("");
      addTracksToPlaylist(res.id, tracks).then((response) => {
        if (response.snapshot_id) {
          setLoading(false);
          history.push("/playlist/" + res.id);
        }
      });
    });
  }

  useEffect(() => {
    favoriteArtists();
  }, []);

  useEffect(() => {
    getArtistsRecommended(artistPicks);
  }, [artistPicks]);

  return (
    <main className={"playlist-creator"}>
      <Loading loading={loading} />
      <Modal
        show={showModal}
        onCancel={() => setShowModal(false)}
        onCreate={() => createRelatedPlaylist(newPlaylistName, generatedTracks)}
        onType={(e) => setNewPlaylistName(e)}
        onChangeAmmount={(e) => setTracksPerArtist(e)}
      ></Modal>
      <div className={"container mt-5"}>
        <div className={"col m-auto"}>
          <h3 className={"text-center"}>Select up to 5 artists</h3>
          <div className="mt-5 d-flex playlist-creator__search">
            <input
              type="search"
              autoComplete={"off"}
              placeholder={"Type here the name of the artist..."}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="form-control"
              id="search"
            />
            <button
              onClick={() => searchArtists()}
              className="btn btn-generate ms-2"
            >
              <i className="fas fa-search me-1"></i>
              Search
            </button>
          </div>
        </div>
        <div
          className={"artists-picks"}
          style={{ display: artistPicks.length > 0 ? "flex" : "none" }}
        >
          {artistPicks?.map((artist) => {
            return (
              <div key={artist.id} className={"artists-badge"}>
                <button
                  onClick={() => removePick(artist)}
                  className={"btn btn-danger artists-badge__delete"}
                >
                  X
                </button>
                <span>{artist?.name}</span>
              </div>
            );
          })}
        </div>
        <button
          onClick={() => {
            setShowModal(true);
          }}
          disabled={artistPicks.length > 0 ? false : true}
          className={"ml-5 btn btn-generate d-block ms-auto me-auto my-4"}
        >
          <i className="fas fa-plus me-1"></i>
          Generate playlist
        </button>

        <div className={"artists-list"}>
          {artists?.map((artist, index) => {
            return (
              <ArtistCard
                artist={artist}
                key={index}
                onPick={() => pickArtist(artist)}
              />
            );
          })}
          <div className={"artists-invisible"}></div>
          <div className={"artists-invisible"}></div>
        </div>
      </div>
    </main>
  );
};
export default PlaylistCreator;
