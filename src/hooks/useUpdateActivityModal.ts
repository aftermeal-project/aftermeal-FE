import { UseFormReturn } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../atoms';
import { AtomKeys } from '../constants';
import { formatTime } from '../utils';
import { ActivityResponseDto } from '../types';

export function useUpdateActivityModal(
  useForm: UseFormReturn<ActivityResponseDto>,
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

  const setFormValues = (activity: ActivityResponseDto) => {
    reset({
      ...activity,
      applicationStartDate: formatActivityDate(activity.applicationStartDate),
      applicationEndDate: formatActivityDate(activity.applicationEndDate),
    });
  };

  const handleUpdate = (activity: ActivityResponseDto) => {
    setFormValues(activity);
    setActiveId(activity.id);
    updateModalOpen(true);
  };

  return { handleUpdate };
}
