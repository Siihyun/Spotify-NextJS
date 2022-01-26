import { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { currentTrackState } from '../atoms/track';
import useSpotify from './useSpotify';

function useSongInfo() {
  const spotifyApi = useSpotify();

  const [currentTrackId, setCurrentTrackId] = useRecoilState(currentTrackState);
  const [songInfo, setSongInfo] = useState<SpotifyApi.SingleTrackResponse>();

  // method 1 : using fetch
  const fetchSongInfoByFetch = async () => {
    if (currentTrackId) {
      const trackInfo = await fetch(
        `https://api.spotify.com/v1/tracks/${currentTrackId}`,
        {
          headers: {
            Authorization: `Bearer ${spotifyApi.getAccessToken()}`,
          },
        }
      ).then((res) => res.json());
      setSongInfo(trackInfo);
    }
  };

  // method 2 : using spotify-web-node APi
  const fetchSongInfoByApi = async () => {
    if (currentTrackId) {
      const { body: trackInfo } = await spotifyApi.getTrack(currentTrackId);
      setSongInfo(trackInfo);
    }
  };

  useEffect(() => {
    fetchSongInfoByApi();
  }, [currentTrackId, spotifyApi]);

  return songInfo;
}

export default useSongInfo;
