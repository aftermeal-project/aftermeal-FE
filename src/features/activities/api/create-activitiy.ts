import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ActivityCreationRequestDto,
  ActivityListResponseDto,
} from '../../../types';
import { CreateActivityAPI } from '../../../libs/api/activities';
import { errorMessages } from '../../../constants';

async function createActivity(data: ActivityCreationRequestDto) {
  return await CreateActivityAPI(data);
}

function handleCreateActivityError() {
  alert(errorMessages.UNKNOWN_ERROR);
}

export default function useCreateActivity() {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: createActivity,
    onMutate: async (newActivity: ActivityCreationRequestDto) => {
      await queryClient.cancelQueries({ queryKey: ['activities'] });

      const previousActivities = queryClient.getQueryData<
        ActivityListResponseDto[]
      >(['activities']);

      queryClient.setQueryData(
        ['activities'],
        (old: ActivityListResponseDto[]) => [...old, newActivity],
      );

      return { previousActivities };
    },
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
