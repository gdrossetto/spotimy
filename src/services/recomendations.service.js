import { getAccessToken } from "../util";

function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}

export async function getRecomendationsArtists(artists) {
  let artistsFive = [];
  shuffleArray(artists);
  for (let i = 0; i < 5; i++) {
    if (artists[i]) {
      artistsFive.push(artists[i]);
    }
  }

  const playlistsFetch = await fetch(
    "https://api.spotify.com/v1/recommendations?seed_artists=" +
      artistsFive.join(),
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  const playlistsJson = await playlistsFetch.json();
  return playlistsJson;
}
