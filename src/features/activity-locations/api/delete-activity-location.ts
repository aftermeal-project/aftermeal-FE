import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityLocationListResponseDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { DeleteActivityLocationAPI } from '../../../libs/api/admin.activity-locations';

async function deleteActivityLocation(
  activityLocationId: string,
): Promise<void> {
  await DeleteActivityLocationAPI(activityLocationId);
}

function handleDeleteActivityLocationError(_error: Error) {
  alert(errorMessages.UNKNOWN_ERROR);
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
    onError: (_error, _variables, context: any) => {
      if (context?.previousActivityLocation) {
        queryClient.setQueryData<ActivityLocationListResponseDto[]>(
          ['activity-locations'],
          context.previousActivityLocation,
        );
      }
      handleDeleteActivityLocationError(_error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activity-locations'] });
    },
  });

  return { deleteActivityLocation: mutation, error: mutation.error };
}
