import { ChevronDownIcon } from '@heroicons/react/outline';
import { signOut, useSession } from 'next-auth/react';
import React, { useState, useEffect } from 'react';
import { shuffle } from 'lodash';
import { useRecoilValue } from 'recoil';
import { albumState } from '../atoms/albums';
import Songs from './Songs';

const colors = [
  'from-indigo-500',
  'from-blue-500',
  'from-green-500',
  'from-red-500',
  'from-pink-500',
  'from-purple-500',
];

function Center() {
  const { data: session } = useSession();
  const defaultImgUrl =
    'https://media.vlpt.us/images/seeh_h/profile/6b7bfde5-b67c-4665-a2e1-a308e8de2059/tt.PNG?w=240';

  const [color, setColor] = useState<string>('');
  const albumInfo = useRecoilValue(albumState);

  useEffect(() => {
    setColor(shuffle(colors).pop()!);
  }, [albumInfo]);

  return (
    <div className='flex-grow h-screen overflow-y-scroll'>
      <header className='absolute top-5 right-8'>
        <div
          className='flex items-center bg-black text-white space-x-3 opacity-90 hover:opacity-80 cursor-pointer rounded-full p-1 pr-2'
          onClick={signOut}
        >
          <img
            className='rounded-full w-10 h-10'
            src={session?.user?.image || defaultImgUrl}
            alt='profile'
          />
          <h2>{session?.user?.name}</h2>
          <ChevronDownIcon className='h-5 w-5' />
        </div>
      </header>

      <section
        className={`flex items-end space-x-3 bg-gradient-to-b to-black ${color} h-80 text-white p-8`}
      >
        <img
          className='w-44 h-44 shadow-2xl'
          src={albumInfo.thumbnail}
          alt='album thumbnail'
        />
        <div>
          <p>Song of IU</p>
          <h1 className='text-2xl md:text-3xl xl:text-5xl font-bold'>
            {albumInfo.name}
          </h1>
        </div>
      </section>

      <div>
        <Songs />
      </div>
    </div>
  );
}

export default Center;
