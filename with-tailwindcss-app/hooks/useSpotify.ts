import { signIn, useSession } from 'next-auth/react';
import React, { useEffect } from 'react';
import spotifyApi from '@/lib/spotify';

function useSpotify() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session) {
      // If refresh access token attempt fails, direct user to login...
      if (session.error === 'RefreshAccessTokenError') {
        signIn();
      }

      spotifyApi.setAccessToken(session.accessToken as string);
    }
  }, [session]);
  return spotifyApi;
}

export default useSpotify;
