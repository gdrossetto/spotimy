import { getAccessToken } from "../util";

export async function getUserInfo() {
  const userFetch = await fetch("https://api.spotify.com/v1/me", {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });

  const userJson = await userFetch.json();
  return userJson;
}

export async function getUserPlaylists() {
  const playlistsFetch = await fetch(
    "https://api.spotify.com/v1/me/playlists",
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  const playlistsJson = await playlistsFetch.json();
  getUserPlaylistTracks();
  return playlistsJson;
}

export async function getUserPlaylistTracks() {
    const playlistsFetch = await fetch(
        "https://api.spotify.com/v1/playlists/79yrQ7wIt2v8xRn3Ldutmo/tracks",
      {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`,
        },
      }
    );
    const playlistsJson = await playlistsFetch.json();
    console.log(playlistsJson)
    return playlistsJson;
  }

