import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityLocationListResponseDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { UpdateActivityLocationAPI } from '../../../libs/api/admin.activity-locations';

async function UpdateActivityLocation(
  data: ActivityLocationListResponseDto,
): Promise<void> {
  await UpdateActivityLocationAPI(data);
}
function handleUpdateActivityLocationError(_error: Error) {
  alert(errorMessages.UNKNOWN_ERROR);
}

export default function useUpdateActivty() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, ActivityLocationListResponseDto>({
    mutationFn: UpdateActivityLocation,
    onMutate: async (
      updateActivityLocation: ActivityLocationListResponseDto,
    ) => {
      await queryClient.cancelQueries({
        queryKey: ['activity-locations', updateActivityLocation.id],
      });

      const previousActivityLocation = queryClient.getQueryData<
        ActivityLocationListResponseDto[]
      >(['activity-locations', updateActivityLocation.id]);

      queryClient.setQueryData(
        ['activities', updateActivityLocation.id],
        updateActivityLocation,
      );

      return { previousActivityLocation, updateActivityLocation };
    },
    onError: (_error, _variables, context: any) => {
      queryClient.setQueryData(
        ['activity-locations', context.updateActivityLocation.id],
        context.previousActivityLocation,
      );
      handleUpdateActivityLocationError(_error);
    },
    onSettled: (_data, _error, variables, _context) => {
      queryClient.invalidateQueries({
        queryKey: ['activity-locations', variables.id],
      });
    },
  });

  return { updateActivityLocation: mutation, error: mutation.error };
}
