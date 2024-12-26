import { UseFormReturn } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../atoms';
import { AtomKeys } from '../constants';
import { formatTime } from '../utils';
import { ActivityDetailResponseDto } from '../types';

export function useUpdateActivityForm(
  useForm: UseFormReturn<ActivityDetailResponseDto>,
) {
  const { reset } = useForm;
  const setActiveId = useSetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );
  const updateModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.UPDATE_ACTIVITY_MODAL),
  );

  const formatActivityDate = (time: string) =>
    formatTime({ type: 'format', time });

  const setFormValues = (activity: ActivityDetailResponseDto) => {
    reset({
      ...activity,
      applicationStartAt: formatActivityDate(activity.applicationStartAt),
      applicationEndAt: formatActivityDate(activity.applicationEndAt),
    });
  };

  const handleUpdate = (activity: ActivityDetailResponseDto) => {
    setFormValues(activity);
    setActiveId(activity.id);
    updateModalOpen(true);
  };

  return { handleUpdate };
}
