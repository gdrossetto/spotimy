import {getAccessToken} from "../util";


export async function createPlaylist(name,userId) {
    console.log(name,userId)
    const playlistFetch = await fetch(
        `https://api.spotify.com/v1/users/${userId}/playlists`,
        {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
            method:'POST',
            body:JSON.stringify({
                name: name,
            })
        }
    );
    const playlistJson = await playlistFetch.json();
    console.log(playlistJson)
    return playlistJson;
}
