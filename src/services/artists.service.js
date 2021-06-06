import { getAccessToken } from "../util";

export async function getArtistTracks(artistName) {
  const tracksFetch = await fetch(
    `https://api.spotify.com/v1/search?type=track&q=artist:${artistName}`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  const tracksJson = await tracksFetch.json();
  console.log(tracksJson);
  return tracksJson;
}
