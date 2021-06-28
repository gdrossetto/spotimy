import { getAccessToken } from "../util";
import { shuffleArray } from "../util/functions";

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
