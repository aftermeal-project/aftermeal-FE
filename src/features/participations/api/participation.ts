import { useMutation, useQueryClient } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { ParticipationAPI } from '../../../libs/api/participations';
import { ActivityResponseDto } from '../../../types';

export function useParticipation() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, string>({
    mutationFn: ParticipationAPI,
    onMutate: async activityId => {
      await queryClient.cancelQueries({ queryKey: ['activities'] });

      const previousActivities = queryClient.getQueryData<
        ActivityResponseDto[]
      >(['activities']);

      queryClient.setQueryData<ActivityResponseDto[]>(
        ['activities'],
        oldActivities => {
          return oldActivities?.map(activity =>
            activity.id === Number(activityId)
              ? {
                  ...activity,
                  currentParticipants: activity.currentParticipants + 1,
                }
              : activity,
          );
        },
      );

      return { previousActivities };
    },

    onError: (_error, _variables, context: any) => {
      queryClient.setQueryData(['activities'], context?.previousActivities);
      toast.error('참가 신청에 실패했습니다.');
    },

    onSuccess: () => {
      toast.success('참가 신청이 성공적으로 완료되었습니다.');
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-details'] });
    },
  });

  return { participation: mutation, isParticipateLoading: mutation.isPending };
}
