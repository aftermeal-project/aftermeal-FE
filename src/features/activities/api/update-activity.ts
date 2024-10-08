import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityListResponseDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { UpdateActivityAPI } from '../../../libs/api/activities';
import toast from 'react-hot-toast';

async function updateActivity(data: ActivityListResponseDto): Promise<void> {
  await UpdateActivityAPI(data);
}

export default function useUpdateActivty() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, ActivityListResponseDto>({
    mutationFn: updateActivity,
    onMutate: async (updateActivity: ActivityListResponseDto) => {
      await queryClient.cancelQueries({
        queryKey: ['activities', updateActivity.id],
      });

      const previousActivity = queryClient.getQueryData<
        ActivityListResponseDto[]
      >(['activities', updateActivity.id]);

      queryClient.setQueryData(
        ['activities', updateActivity.id],
        updateActivity,
      );

      return { previousActivity, updateActivity };
    },
    onSuccess: () => {
      toast.success('활동을 수정했습니다.');
    },
    onError: (_error, _updateActivity, context: any) => {
      queryClient.setQueryData(
        ['activities', context.newActivity.id],
        context.previousActivity,
      );

      alert(errorMessages.UNKNOWN_ERROR);
    },
    onSettled: (_data, _error, _variables, _context) => {
      queryClient.invalidateQueries({
        queryKey: ['activities'],
      });
    },
  });

  return { updateActivity: mutation, error: mutation.error };
}
