import React, { useEffect, useState } from "react";
import "./playlist.styles.scss";
import { useParams } from "react-router-dom";
import { getRecomendationsArtists } from "../../services/recomendations.service";
import {
  addTracksToPlaylist,
  createPlaylist,
  getPlaylistById,
} from "../../services/playlists.service";
import { useDispatch, useSelector } from "react-redux";
import Modal from "../../components/modal-input/modal-input.component";
import Track from "../../components/track/track.component";
import PageHeader from "../../components/page-header/page-header.component";
import { useHistory } from "react-router-dom";
import Loading from "../../components/loading/loading.component";

const Playlist = () => {
  let { id } = useParams();
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const [playlist, setPlaylist] = useState({});
  const [recomended, setRecomended] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newPlaylistName, setNewPlaylistName] = useState("");
  const [loading, setLoading] = useState(false);

  async function getPlaylist() {
    setLoading(true);
    let playList = await getPlaylistById(id);
    console.log(playList);
    setPlaylist(playList);
    setLoading(false);
  }

  function getPlaylistArtists() {
    let artists = [];
    let artistsIds = [];
    const tracksArtists = playlist.tracks?.items.filter((track) => track.track);
    if (tracksArtists?.length > 0) {
      tracksArtists?.forEach((item) => {
        item.track.artists?.forEach((artist) => {
          artists.push(artist);
        });
      });
    }

    artists.forEach((artist) => artistsIds.push(artist.id));
    return artistsIds;
  }

  async function getArtistsRecommended() {
    setLoading(true);
    let rec = await getRecomendationsArtists(getPlaylistArtists());
    setRecomended(rec);
    setLoading(false);
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
    getPlaylist();
  }, [id]);

  useEffect(() => {
    getArtistsRecommended();
  }, [playlist]);

  return (
    <div className={"playlist"}>
      <Loading loading={loading} />
      <h1>{playlist?.name}</h1>
      <div className={"playlist-tracks container"}>
        {playlist.tracks
          ? playlist.tracks.items.map((track, index) => {
              return <Track key={index} track={track.track} />;
            })
          : null}
      </div>
      {recomended.tracks ? (
        <div className={"playlist-similar__header container"}>
          <div className={"py-4"}>
            <h3 className={"green-h3 text-center my-4"}>
              Similar songs you may enjoy!
            </h3>
            <Modal
              show={showModal}
              onCancel={() => setShowModal(false)}
              onCreate={() =>
                createRelatedPlaylist(newPlaylistName, recomended.tracks)
              }
              onType={(e) => setNewPlaylistName(e)}
              value={newPlaylistName}
            ></Modal>
            <button
              onClick={() => setShowModal(true)}
              className={"btn btn-green-outline d-block m-auto"}
            >
              Generate Quick Playlist
            </button>
            <button
              onClick={() => getArtistsRecommended()}
              className={"btn btn-outline-warning d-block m-auto mt-4"}
            >
              Refresh Suggestions
            </button>
          </div>
        </div>
      ) : null}

      <div className={"playlist-tracks container"}>
        {recomended.tracks
          ? recomended.tracks.map((track, index) => {
              return <Track key={index} track={track} />;
            })
          : null}
      </div>
    </div>
  );
};
export default Playlist;
