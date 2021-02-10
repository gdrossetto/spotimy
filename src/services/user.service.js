import {getAccessToken} from "../util";

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

