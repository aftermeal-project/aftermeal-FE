import { UseFormReturn } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../atoms';
import { AtomKeys } from '../constants';
import { formatTime } from '../utils';
import { ActivityDetailResponseDto } from '../types';

type ActivityWithoutParticipants = Omit<
  ActivityDetailResponseDto,
  'participants'
>;

export function useUpdateActivityModal<T extends ActivityWithoutParticipants>(
  useForm: UseFormReturn<T>,
) {
  const { reset } = useForm;
  const setActiveId = useSetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );
  const updateModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.UPDATE_ACTIVITY_MODAL),
  );

  const settingUpdateActivityModalFormValue = (activity: T) => {
    const formatStartDate = formatTime({
      type: 'format',
      time: String(activity.applicationStartDate),
    });

    const formatEndDate = formatTime({
      type: 'format',
      time: String(activity.applicationEndDate),
    });

    reset({
      ...activity,
      applicationStartDate: formatStartDate,
      applicationEndDate: formatEndDate,
    });
  };

  const activityUpdate = (activity: T) => {
    settingUpdateActivityModalFormValue(activity);
    setActiveId(activity.id);
    updateModalOpen(true);
  };

  return { activityUpdate };
}
