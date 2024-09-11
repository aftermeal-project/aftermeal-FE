import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { errorMessages } from '../../../constants';
import { GetUsersAPI } from '../../../libs/api/admin.users';

function getUsers() {
  const response = GetUsersAPI();
  return response;
}

function handleGetUserssError(error: any) {
  if (!error) return null;

  if (error instanceof AxiosError) {
    const { response } = error;

    if (!response) {
      return errorMessages.ERR_NETWORK;
    }

    switch (response.status) {
      case 500:
        return errorMessages.SERVER_ERROR;
      default:
        return errorMessages.DEFAULT_ERROR;
    }
  }

  return errorMessages.UNKNOWN_ERROR;
}

export default function useGetUsers() {
  const { data, error } = useSuspenseQuery({
    queryKey: ['users'],
    queryFn: getUsers,
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
    error: handleGetUserssError(error),
  };
}
