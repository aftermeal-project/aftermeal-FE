import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityLocationListResponseDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { DeleteActivityLocationAPI } from '../../../libs/api/admin.activity-locations';
import toast from 'react-hot-toast';

async function deleteActivityLocation(
  activityLocationId: string,
): Promise<void> {
  await DeleteActivityLocationAPI(activityLocationId);
}

export default function useDeleteActivityLocation() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, string>({
    mutationFn: deleteActivityLocation,
    onMutate: async (activityLocationId: string) => {
      await queryClient.cancelQueries({
        queryKey: ['activity-locations'],
      });

      const previousActivityLocation = queryClient.getQueryData<
        ActivityLocationListResponseDto[]
      >(['activity-locations']);

      if (previousActivityLocation) {
        queryClient.setQueryData<ActivityLocationListResponseDto[]>(
          ['activity-locations'],
          old => old?.filter(item => item.id !== Number(activityLocationId)),
        );
      }

      return { previousActivityLocation };
    },
    onSuccess: () => {
      toast.success('장소를 삭제했습니다.');
    },
    onError: (_error, _variables, context: any) => {
      if (context?.previousActivityLocation) {
        queryClient.setQueryData<ActivityLocationListResponseDto[]>(
          ['activity-locations'],
          context.previousActivityLocation,
        );
      }

      alert(errorMessages.UNKNOWN_ERROR);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-locations'] });
    },
  });

  return { deleteActivityLocation: mutation, error: mutation.error };
}
