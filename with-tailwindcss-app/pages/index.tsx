import { GetServerSidePropsContext } from 'next';
import { getSession } from 'next-auth/react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { currentTrackState } from '../atoms/track';
import Center from '../components/Center';
import Player from '../components/Player';
import Sidebar from '../components/Sidebar';

export default function Home() {
  const currentTrackId = useRecoilValue(currentTrackState);

  return (
    <div className='bg-black h-screen overflow-hidden'>
      <main className='flex'>
        <Sidebar />
        <Center />
      </main>

      {currentTrackId && (
        <div className='sticky bottom-0'>
          <Player />
        </div>
      )}
    </div>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  return {
    props: {
      session: await getSession(context),
    },
  };
}
