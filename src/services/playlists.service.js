import { getAccessToken } from "../util";
import { shuffleArray } from "../util/functions";

export async function createPlaylist(name, userId) {
  console.log("Criando Playlist");
  const playlistFetch = await fetch(
    `https://api.spotify.com/v1/users/${userId}/playlists`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      method: "POST",
      body: JSON.stringify({
        name: name,
      }),
    }
  );
  const playlistJson = await playlistFetch.json();
  return playlistJson;
}

export async function addTracksToPlaylist(playlistId, tracks) {
  shuffleArray(tracks);
  const tracksUris = [];
  tracks.forEach((track) => {
    tracksUris.push(track.uri);
  });

  const playlistFetch = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
      method: "POST",
      body: JSON.stringify({
        uris: tracksUris,
      }),
    }
  );
  const playlistJson = await playlistFetch.json();
  return playlistJson;
}

export async function getPlaylistById(playlistId) {
  const playlistFetch = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  const playlistJson = await playlistFetch.json();
  return playlistJson;
}

export async function getUserPlaylistTracks(playlistId) {
  const playlistsFetch = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  const playlistsJson = await playlistsFetch.json();
  return playlistsJson;
}

export async function unfollowPlaylist(playlistId) {
  const response = await fetch(
    `https://api.spotify.com/v1/playlists/${playlistId}/followers`,
    {
      method: "DELETE",
      mode: "cors",
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
        "Content-Type": "application/json",
      },
    }
  );

  return response;
}
