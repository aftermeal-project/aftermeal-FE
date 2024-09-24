import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { CancelParticipationAPI } from '../../../libs/api/participations';
import { ActivityListResponseDto } from '../../../types';

export function useCancelUserParticipation() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, string>({
    mutationFn: CancelParticipationAPI,
    onMutate: async activityId => {
      await queryClient.cancelQueries({ queryKey: ['activities'] });

      const previousActivities = queryClient.getQueryData<
        ActivityListResponseDto[]
      >(['activities']);

      queryClient.setQueryData(
        ['activities'],
        (old: ActivityListResponseDto[] | undefined) =>
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
      toast.success('유저의 참가를 취소했습니다.');
    },

    onError: (_error, _variables, context: any) => {
      queryClient.setQueryData(['activities'], context?.previousActivities);
      toast.error('참가 취소 중 오류가 발생했습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-details'] });
    },
  });

  return {
    cancelUserParticipation: mutation,
    isCancelLoading: mutation.isPending,
  };
}
