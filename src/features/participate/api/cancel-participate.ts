import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CancelParticipateAPI } from '../../../libs/api/participate';
import { ActivityResponseDto } from '../../../types';

export default function useCancelParticipate() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, string>({
    mutationFn: CancelParticipateAPI,
    onMutate: async activityId => {
      await queryClient.cancelQueries({ queryKey: ['activities'] });

      const previousActivities = queryClient.getQueryData<
        ActivityResponseDto[]
      >(['activities']);

      queryClient.setQueryData(
        ['activities'],
        (old: ActivityResponseDto[] | undefined) =>
          old
            ? old.map(activity =>
                activity.id === Number(activityId)
                  ? {
                      ...activity,
                      currentParticipants: activity.currentParticipants - 1,
                    }
                  : activity,
              )
            : [],
      );

      return { previousActivities };
    },

    onSuccess: () => {
      toast.success('참가가 취소되었습니다.');
    },

    onError: (_error, _variables, context: any) => {
      queryClient.setQueryData(['activities'], context?.previousActivities);
      toast.error('참가 취소 중 오류가 발생했습니다.');
    },

    onSettled: () => {
      queryClient.cancelQueries({ queryKey: ['activities'] });
    },
  });

  return mutation;
}
