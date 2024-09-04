import { atom, atomFamily } from 'recoil';
import { UserAtomType } from './atom.type';

export const ModalAtomFamily = atomFamily({
  key: 'modal',
  default: false,
});

export const UserAtom = atom<UserAtomType>({
  key: 'user',
  default: {
    name: '',
    roles: 'USER',
  },
});

export const ActiveIdAtom = atom({
  key: 'activeId',
  default: 0,
});
