import { atom, atomFamily } from 'recoil';
import { ActivityListResponseDtoType, LoginResponseDtoUser } from '../types';
import { recoilPersist } from 'recoil-persist';
import moment from 'moment';

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
    role: 'USER',
  },
  effects_UNSTABLE: [persistAtom],
});

export const ActiveIdAtomFamily = atomFamily({
  key: 'activeId',
  default: 0,
});

const getCurrentHour = () => {
  const currentHour = moment().hour();
  return currentHour <= 13 ? 'LUNCH' : 'DINNER';
};

export const CurrentActivityTypeAtom = atom<ActivityListResponseDtoType>({
  key: 'currentActivityType',
  default: getCurrentHour(),
});
