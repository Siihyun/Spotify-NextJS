import { atom } from 'recoil';

const currentTrackState = atom({
  key: 'currentTrackIdState',
  default: '',
});

const isPlayingState = atom({
  key: 'isPlayingState',
  default: false,
});

export { currentTrackState, isPlayingState };
