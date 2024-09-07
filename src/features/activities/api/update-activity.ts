import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityResponseDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { UpdateActivityAPI } from '../../../libs/api/admin.activities';

async function updateActivity(data: ActivityResponseDto): Promise<void> {
  await UpdateActivityAPI(data);
}

function handleUpdateActivityError(_error: Error) {
  alert(errorMessages.UNKNOWN_ERROR);
}

export default function useUpdateActivty() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, ActivityResponseDto>({
    mutationFn: updateActivity,
    onMutate: async (updateActivity: ActivityResponseDto) => {
      await queryClient.cancelQueries({
        queryKey: ['activities', updateActivity.id],
      });

      const previousActivity = queryClient.getQueryData<ActivityResponseDto[]>([
        'activities',
        updateActivity.id,
      ]);

      queryClient.setQueryData(
        ['activities', updateActivity.id],
        updateActivity,
      );

      return { previousActivity, updateActivity };
    },
    onError: (_error, _updateActivity, context: any) => {
      queryClient.setQueryData(
        ['activities', context.newActivity.id],
        context.previousActivity,
      );
      handleUpdateActivityError(_error);
    },
    onSettled: (_data, _error, variables, _context) => {
      queryClient.invalidateQueries({
        queryKey: ['activities', variables.id],
      });
    },
  });

  return { updateActivity: mutation, error: mutation.error };
}
