import {getAccessToken} from "../util";

export async function searchArtistsByName(query) {
    const playlistsFetch = await fetch(
        `https://api.spotify.com/v1/search?type=artist&q=${query}`,
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
