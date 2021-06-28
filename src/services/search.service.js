import { getAccessToken } from "../util";

export async function searchArtistsByName(query) {
  const artistsFetch = await fetch(
    `https://api.spotify.com/v1/search?type=artist&q=${query}`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  const artistsJson = await artistsFetch.json();
  return artistsJson;
}
