import { useSuspenseQuery } from '@tanstack/react-query';
import { GetUsersAPI } from '../../../libs/api/admin.users';

function getUsers() {
  const response = GetUsersAPI();
  return response;
}

export default function useGetUsers() {
  const { data } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
  };
}
