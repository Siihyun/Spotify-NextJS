import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  RssIcon,
} from '@heroicons/react/outline';
import { HeartIcon } from '@heroicons/react/solid';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { albumState } from '@/atoms/albums';
import useSpotify from '@/hooks/useSpotify';

function Sidebar() {
  const spotifyApi = useSpotify();
  const IU_SINGER_ID = '3HqSLMAZ3g3d5poNaI7GOU';
  const { data: session } = useSession();
  const [albums, setAlbums] = useState<SpotifyApi.AlbumObjectSimplified[]>([]);
  const [albumInfo, setAlbumInfo] = useRecoilState(albumState);

  const getAlbums = async (albumId: string) => {
    const data = await spotifyApi.getArtistAlbums(albumId);
    setAlbums(data.body.items);
  };

  useEffect(() => {
    if (spotifyApi.getAccessToken()) {
      getAlbums(IU_SINGER_ID);
    }
  }, [session, spotifyApi]);

  return (
    <section
      className='text-gray-500 p-5 text-xs lg:text-sm border-r border-gray-900 overflow-y-scroll scrollbar-hide h-screen 
      sm:max-w-[12rem] lg:max-w-[15rem] hidden md:flex pb-36'
    >
      <div className='space-y-4'>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HomeIcon className='h-5 w-5' />
          <p>Home</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <SearchIcon className='h-5 w-5' />
          <p>Search</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <LibraryIcon className='h-5 w-5' />
          <p>Your Library</p>
        </button>
        <hr className='border-t-[0.1px] border-gray-900' />

        <button className='flex items-center space-x-2 hover:text-white'>
          <PlusCircleIcon className='h-5 w-5' />
          <p>Create Playlist</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <HeartIcon className='h-5 w-5 text-blue-500' />
          <p>Liked Songs</p>
        </button>
        <button className='flex items-center space-x-2 hover:text-white'>
          <RssIcon className='h-5 w-5 text-green-500' />
          <p>Your Episodes</p>
        </button>
        <hr className='border-t-[0.1]px border-gray-900' />

        {/* Playlist.. */}
        <ul>
          {albums.map((album) => (
            <li
              key={album.id}
              onClick={() => {
                setAlbumInfo({
                  name: album.name,
                  id: album.id,
                  thumbnail: album.images?.[0]?.url,
                });
              }}
              className='cursor-pointer hover:text-white p-1'
            >
              {album.name}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export default Sidebar;
