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
  return playlistsJson;
}

export async function getUserTopArtists() {
  const artistsFetch = await fetch(
    "https://api.spotify.com/v1/me/top/artists",
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  const artistsJson = await artistsFetch.json();
  return artistsJson;
}

export async function getUserTopTracks() {
  const tracksFetch = await fetch("https://api.spotify.com/v1/me/top/tracks", {
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
  });
  const tracksJson = await tracksFetch.json();
  return tracksJson;
}
