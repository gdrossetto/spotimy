import {getAccessToken} from "../util";

function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export async function getRecomendationsArtists(artists) {
    shuffleArray(artists)
    let artistsFive = [artists[0],artists[1],artists[2],artists[3],artists[4]];

    const playlistsFetch = await fetch(
        "https://api.spotify.com/v1/recommendations?seed_artists=" + artistsFive.join(),
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
