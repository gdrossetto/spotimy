import {getAccessToken} from "../util";


export async function createPlaylist(name,userId) {
    console.log('Criando Playlist')
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

    return playlistJson;
}

export async function addTracksToPlaylist(playlistId,tracks) {

    const tracksUris = [];
    tracks.forEach((track)=>{
        tracksUris.push(track.uri)
    })
    console.log(tracksUris)

    const playlistFetch = await fetch(
        `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
        {
            headers: {
                Authorization: `Bearer ${getAccessToken()}`,
            },
            method:'POST',
            body:JSON.stringify({
                uris: tracksUris,
            })
        }
    );
    const playlistJson = await playlistFetch.json();
    console.log(playlistJson)
    return playlistJson;
}
