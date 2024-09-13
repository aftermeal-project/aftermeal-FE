import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityResponseDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { DeleteActivityAPI } from '../../../libs/api/admin.activities';
import toast from 'react-hot-toast';

async function deleteActivity(activityId: string): Promise<void> {
  await DeleteActivityAPI(activityId);
}

function handleDeleteActivityError(_error: Error) {
  alert(errorMessages.UNKNOWN_ERROR);
}

export default function useDeleteActivity() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, string>({
    mutationFn: deleteActivity,
    onMutate: async (activityId: string) => {
      await queryClient.cancelQueries({
        queryKey: ['activites'],
      });

      const previousActivity = queryClient.getQueryData<ActivityResponseDto[]>([
        'activities',
      ]);

      if (previousActivity) {
        queryClient.setQueryData<ActivityResponseDto[]>(['items'], old =>
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
        queryClient.setQueryData<ActivityResponseDto[]>(
          ['activities'],
          context.previousActivity,
        );
      }
      handleDeleteActivityError(_error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  return { deleteActivity: mutation, error: mutation.error };
}
