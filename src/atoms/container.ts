import { atom, atomFamily } from 'recoil';
import { LoginResponseDtoUser } from '../types';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const ModalAtomFamily = atomFamily({
  key: 'modal',
  default: false,
});

export const UserAtom = atom<LoginResponseDtoUser>({
  key: 'user',
  default: {
    id: '0',
    name: '',
    roles: ['USER'],
  },
  effects_UNSTABLE: [persistAtom],
});

export const ActiveIdAtomFamily = atomFamily({
  key: 'activeId',
  default: 0,
});
