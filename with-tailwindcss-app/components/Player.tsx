import {
  RewindIcon,
  FastForwardIcon,
  PauseIcon,
  PlayIcon,
  ReplyIcon,
  VolumeUpIcon,
  SwitchHorizontalIcon,
} from '@heroicons/react/solid';
import { VolumeUpIcon as VolumeDownIcon } from '@heroicons/react/outline';
import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { isPlayingState } from '@/atoms/track';
import useSongInfo from '@/hooks/useSongInfo';

function Player() {
  const [isPlaying, setIsPlaying] = useRecoilState(isPlayingState);
  const [volume, setVolume] = useState(50);
  const songInfo = useSongInfo();

  const togglePlayState = () => {
    setIsPlaying((state) => !state);
  };

  const handleVolume = (e: React.ChangeEvent<HTMLInputElement>) => {
    setVolume(Number(e.target.value));
  };

  return (
    <div
      className='h-24 bg-gradient-to-b from-black to-gray-900 text-white
      grid grid-cols-3 text-xs md:text-base px-2 md:px-8'
    >
      <div className='flex items-center space-x-4'>
        <img
          className='hidden md:inline h-10 w-10'
          src={songInfo?.album.images?.[0].url}
          alt='album cover'
        />
        <div>
          <h3>{songInfo?.name}</h3>
          <p>{songInfo?.artists?.[0]?.name}</p>
        </div>
      </div>

      <div className='flex items-center justify-evenly'>
        <SwitchHorizontalIcon className='button' />
        <RewindIcon className='button' />
        {isPlaying ? (
          <PauseIcon onClick={togglePlayState} className='button w-10 h-10' />
        ) : (
          <PlayIcon onClick={togglePlayState} className='button w-10 h-10' />
        )}
        <FastForwardIcon className='button' />
        <ReplyIcon className='button' />
      </div>

      <div className='flex items-center space-x-3 md:space-x-4 justify-end pr-5'>
        <VolumeDownIcon
          onClick={() => {
            volume > 0 && setVolume((volume) => volume - 5);
          }}
          className='button w-4 h-4'
        />
        <input
          className='w-14 md:w-28'
          type='range'
          value={volume}
          onChange={handleVolume}
          min={0}
          max={100}
        />
        <VolumeUpIcon
          onClick={() => volume < 100 && setVolume((volume) => volume + 5)}
          className='button'
        />
      </div>
    </div>
  );
}

export default Player;
