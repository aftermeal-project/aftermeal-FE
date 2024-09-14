import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ActivityResponseDto } from '../../../types';
import { DeleteUserAPI } from '../../../libs/api/admin.users';
import toast from 'react-hot-toast';
import { errorMessages } from '../../../constants';

async function deleteUser(userId: string): Promise<void> {
  await DeleteUserAPI(userId);
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
    onSuccess: () => {
      toast.success('유저를 삭제했습니다.');
    },
    onError: (_error, _variables, context: any) => {
      if (context?.previousActivity) {
        queryClient.setQueryData<ActivityResponseDto[]>(
          ['users'],
          context.previousActivity,
        );
      }
      alert(errorMessages.UNKNOWN_ERROR);
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });

  return { deleteUser: mutation, error: mutation.error };
}
