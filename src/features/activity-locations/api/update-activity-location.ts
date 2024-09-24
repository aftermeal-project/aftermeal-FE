import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityLocationListResponseDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { UpdateActivityLocationAPI } from '../../../libs/api/activity-locations';
import toast from 'react-hot-toast';

async function updateActivityLocation(
  data: ActivityLocationListResponseDto,
): Promise<void> {
  await UpdateActivityLocationAPI(String(data.id), data.name);
}

export default function useUpdateActivityLocation() {
  const queryClient = useQueryClient();

  const mutation = useMutation<void, Error, ActivityLocationListResponseDto>({
    mutationFn: updateActivityLocation,
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
        ['activity-locations', updateActivityLocation.id],
        updateActivityLocation,
      );

      return { previousActivityLocation, updateActivityLocation };
    },
    onSuccess: () => {
      toast.success('장소를 수정했습니다.');
    },
    onError: (_error, _variables, context: any) => {
      queryClient.setQueryData(
        ['activity-locations', context.updateActivityLocation.id],
        context.previousActivityLocation,
      );

      alert(errorMessages.UNKNOWN_ERROR);
    },
    onSettled: (_data, _error, variables, _context) => {
      queryClient.invalidateQueries({
        queryKey: ['activity-locations'],
      });
    },
  });

  return { updateActivityLocation: mutation, error: mutation.error };
}
