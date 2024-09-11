import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  ActivityLocationCreationRequestDto,
  ActivityLocationListResponseDto,
} from '../../../types';
import { errorMessages } from '../../../constants';
import { CreateActivityLocationAPI } from '../../../libs/api/admin.activity-locations';

async function createActivityLocation(
  data: ActivityLocationCreationRequestDto,
): Promise<void> {
  await CreateActivityLocationAPI(data);
}

function handleCreateActivityLocationError() {
  alert(errorMessages.UNKNOWN_ERROR);
}

export default function useCreateActivityLocation() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, ActivityLocationCreationRequestDto>(
    {
      mutationFn: createActivityLocation,
      onMutate: async newActivityLocation => {
        await queryClient.cancelQueries({ queryKey: ['activity-locations'] });

        const previousActivityLocations = queryClient.getQueryData([
          'activity-locations',
        ]);

        queryClient.setQueryData(
          ['activity-locations'],
          (old: ActivityLocationListResponseDto[]) => [
            ...old,
            newActivityLocation,
          ],
        );

        return { previousActivityLocations };
      },
      onError: (_error, _variables, context: any) => {
        queryClient.setQueryData(
          ['activity-locations'],
          context.previousActivityLocations,
        );
        handleCreateActivityLocationError();
      },
      onSettled: () => {
        queryClient.invalidateQueries({ queryKey: ['activity-locations'] });
      },
    },
  );

  return { createActivityLocation: mutation };
}
