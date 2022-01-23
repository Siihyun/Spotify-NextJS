import React, { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { albumState } from '../atoms/albums';
import spotifyApi from '../lib/spotify';
import Song from './Song';

function Songs() {
  const albumInfo = useRecoilValue(albumState);
  const [tracks, setTracks] = useState<SpotifyApi.TrackObjectSimplified[]>();

  const getTracks = async () => {
    const tracks = await spotifyApi.getAlbumTracks(albumInfo.id);
    console.log(tracks.body.items);
    setTracks(tracks.body.items);
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getTracks();
    }
  }, [spotifyApi, albumInfo]);

  return (
    <div className='px-8 flex flex-col space-y-1 pb-28 text-white'>
      <ul>
        {tracks &&
          tracks.map((track, i) => (
            <Song key={track.id} order={i + 1} track={track} />
          ))}
      </ul>
    </div>
  );
}

export default Songs;
