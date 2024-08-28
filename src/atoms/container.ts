import { atomFamily } from 'recoil';

export const ModalAtomFamily = atomFamily({
  key: 'modal',
  default: false,
});
