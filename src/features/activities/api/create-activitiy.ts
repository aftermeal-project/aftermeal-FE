import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityCreationRequestDto } from '../../../types';
import { errorMessages } from '../../../constants';
import toast from 'react-hot-toast';
import { CreateActivityAPI } from '../../../libs/api/activities';

async function createActivity(data: ActivityCreationRequestDto): Promise<void> {
  data.maxParticipants = Number(data.maxParticipants);
  await CreateActivityAPI(data);
}

export default function useCreateActivity() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, ActivityCreationRequestDto>({
    mutationFn: createActivity,
    onMutate: async newActivity => {
      await queryClient.cancelQueries({ queryKey: ['activities'] });

      const previousActivities = queryClient.getQueryData(['activities']);

      // queryClient.setQueryData(
      //   ['activities'],
      //   (old: ActivityResponseDto[] | undefined) => {
      //     return old ? [...old, newActivity] : [newActivity];
      //   },
      // );

      return { previousActivities };
    },
    onSuccess: () => {
      toast.success('활동을 추가했습니다.');
    },
    onError: (_error, _variables, context: any) => {
      console.log(_error);
      queryClient.setQueryData(['activities'], context.previousActivities);
      alert(errorMessages.UNKNOWN_ERROR);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  return { createActivity: mutation };
}
