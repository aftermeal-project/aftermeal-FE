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

  const settingUpdateActivityModalFormValue = (
    activity: ActivityResponseDto,
  ) => {
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

  const handleUpdate = (activity: ActivityResponseDto) => {
    settingUpdateActivityModalFormValue(activity);
    setActiveId(activity.id);
    updateModalOpen(true);
  };

  return { handleUpdate };
}
