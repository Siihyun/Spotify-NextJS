import { atom } from 'recoil';

const albumsState = atom({
  key: 'albumIdState',
  default: {
    name: `IU 5th Album 'LILAC'`,
    id: '01dPJcwyht77brL4JQiR8R',
    thumbnail:
      'https://i.scdn.co/image/ab67616d0000b2734ed058b71650a6ca2c04adff',
  },
});

export default albumsState;
