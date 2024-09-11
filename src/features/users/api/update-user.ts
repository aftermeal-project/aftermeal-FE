import { useMutation, useQueryClient } from '@tanstack/react-query';
import { UserListResponseDto, UserUpdateRequestDto } from '../../../types';
import { errorMessages } from '../../../constants';
import { UpdateUserAPI } from '../../../libs/api/admin.users';

function updateUser(userId: string, data: UserUpdateRequestDto): Promise<void> {
  if (data.type === 'TEACHER') {
    const { generationNumber, ...rest } = data;
    return UpdateUserAPI(userId, rest);
  }

  return UpdateUserAPI(userId, data);
}

function handleUpdateUserError(_error: Error) {
  alert(errorMessages.UNKNOWN_ERROR);
}

export default function useUpdateUser() {
  const queryClient = useQueryClient();

  const mutation = useMutation<
    void,
    Error,
    { userId: string; data: UserUpdateRequestDto }
  >({
    mutationFn: ({ userId, data }) => updateUser(userId, data),
    onMutate: async ({ userId, data }) => {
      await queryClient.cancelQueries({
        queryKey: ['users', userId],
      });

      const previousUserData = queryClient.getQueryData<UserListResponseDto[]>([
        'users',
        userId,
      ]);

      queryClient.setQueryData(['users', userId], data);

      return { previousUserData };
    },
    onError: (_error, _variables, context: any) => {
      queryClient.setQueryData(
        ['users', _variables.userId],
        context?.previousUserData,
      );
      handleUpdateUserError(_error);
    },
    onSettled: async (_data, _error, variables, _con) => {
      await queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });

  return { updateUser: mutation.mutate, error: mutation.error };
}
