import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityResponseDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { DeleteUserAPI } from '../../../libs/api/admin.users';

async function deleteUser(userId: string): Promise<void> {
  await DeleteUserAPI(userId);
}

function handleDeleteUserError(_error: Error) {
  alert(errorMessages.UNKNOWN_ERROR);
}

export default function useDeleteUser() {
  const queryClient = useQueryClient();
  const mutation = useMutation<void, Error, string>({
    mutationFn: deleteUser,
    onMutate: async (userId: string) => {
      await queryClient.cancelQueries({
        queryKey: ['users'],
      });

      const previousActivity = queryClient.getQueryData<ActivityResponseDto[]>([
        'users',
      ]);

      if (previousActivity) {
        queryClient.setQueryData<ActivityResponseDto[]>(['items'], old =>
          old?.filter(item => item.id !== Number(userId)),
        );
      }

      return { previousActivity };
    },
    onError: (_error, _variables, context: any) => {
      if (context?.previousActivity) {
        queryClient.setQueryData<ActivityResponseDto[]>(
          ['users'],
          context.previousActivity,
        );
      }
      handleDeleteUserError(_error);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { deleteUser: mutation, error: mutation.error };
}
