import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityCreationRequestDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { CreateActivityAPI } from '../../../libs/api/admin.activities';

async function createActivity(data: ActivityCreationRequestDto): Promise<void> {
  await CreateActivityAPI(data);
}
function handleCreateActivityError() {
  alert(errorMessages.UNKNOWN_ERROR);
}

export default function useCreateActivity() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, ActivityCreationRequestDto>({
    mutationFn: createActivity,
    onError: (_error, _variables, context: any) => {
      queryClient.setQueryData(['activities'], context.previousActivities);
      handleCreateActivityError();
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['activities'] });
    },
  });

  return { createActivity: mutation };
}
