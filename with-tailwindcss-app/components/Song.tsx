import React from 'react';
import { useRecoilValue } from 'recoil';
import { albumState } from '../atoms/albums';
import { millisToMinutesAndSeconds } from '../lib/time';

interface Props {
  order: number;
  track: SpotifyApi.TrackObjectSimplified;
}

function Song({ order, track }: Props) {
  const albumInfo = useRecoilValue(albumState);
  return (
    <li className='grid grid-cols-2 text-gray-500 py-4 px-5 hover:bg-gray-900 rounded-lg cursor-pointer'>
      <div className='flex items-center space-x-4'>
        <p className='w-3'>{order}</p>
        <img className='h-10 w-10' src={albumInfo.thumbnail} alt='thumbnail' />
        <div className=''>
          <p className='w-36 lg:w-64 text-white truncate'>{track.name}</p>
          <p className='2-40'>IU</p>
        </div>
      </div>

      <div className='flex items-center justify-between ml-auto md:ml-0'>
        <p className='w-40 hidden md:inline'>{albumInfo.name}</p>
        <p>{millisToMinutesAndSeconds(track.duration_ms)}</p>
      </div>
    </li>
  );
}

export default Song;
