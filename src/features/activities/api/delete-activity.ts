import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityListResponseDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { DeleteActivityAPI } from '../../../libs/api/activities';
import toast from 'react-hot-toast';

async function deleteActivity(activityId: string): Promise<void> {
  await DeleteActivityAPI(activityId);
}

export default function useDeleteActivity() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, string>({
    mutationFn: deleteActivity,
    onMutate: async (activityId: string) => {
      await queryClient.cancelQueries({
        queryKey: ['activites'],
      });

      const previousActivity = queryClient.getQueryData<
        ActivityListResponseDto[]
      >(['activities']);

      if (previousActivity) {
        queryClient.setQueryData<ActivityListResponseDto[]>(['items'], old =>
          old?.filter(item => item.id !== Number(activityId)),
        );
      }

      return { previousActivity };
    },
    onSuccess: () => {
      toast.success('활동을 삭제했습니다.');
    },
    onError: (_error, _variables, context: any) => {
      if (context?.previousActivity) {
        queryClient.setQueryData<ActivityListResponseDto[]>(
          ['activities'],
          context.previousActivity,
        );
      }
      alert(errorMessages.UNKNOWN_ERROR);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  return { deleteActivity: mutation };
}
