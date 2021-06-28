import { getAccessToken } from "../util";

/* export async function getArtistTracks(artistName) {
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
} */

export async function getArtistAlbums(id) {
  const albumsFetch = await fetch(
    `https://api.spotify.com/v1/artists/${id}/albums?include_groups=album`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  const albumsJson = await albumsFetch.json();
  return albumsJson.items.map((album) => album.id);
}

export async function getAlbumsTracks(id) {
  const tracksFetch = await fetch(
    `https://api.spotify.com/v1/albums/${id}/tracks`,
    {
      headers: {
        Authorization: `Bearer ${getAccessToken()}`,
      },
    }
  );
  const tracksJson = await tracksFetch.json();
  return tracksJson;
}

export async function getRandomSongsFromArtist(artistId) {
  const albums = await getArtistAlbums(artistId);
  let totalSongs = [];
  for (let i = 0; i < albums.length; i++) {
    let newTracks = await getAlbumsTracks(albums[i]);
    totalSongs.push(...newTracks.items); //spread operator pushes each item of array
  }
  totalSongs = totalSongs.filter(
    (value, index, array) =>
      array.findIndex((t) => t.name === value.name) === index
  );

  return totalSongs;
}
