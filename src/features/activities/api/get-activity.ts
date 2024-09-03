import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { errorMessages } from '../../../constants';
import { GetActivitiesAPI } from '../../../libs/api/activities';
import { UserListResponseDtoRoles } from '../../../types';
import { AdminGetActivitiesAPI } from '../../../libs/api/admin.activities';
import Token from '../../../libs/utils/token';

async function getActivities({
  queryKey,
}: {
  queryKey: [key: 'activities', roles?: UserListResponseDtoRoles];
}) {
  const [, roles] = queryKey;

  if (roles === 'USER') {
    return GetActivitiesAPI();
  }

  if (roles === 'ADMIN') {
    return AdminGetActivitiesAPI();
  }

  throw new Error(errorMessages.UNKNOWN_ERROR);
}

function handleGetActivitiesError(error: any) {
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

export default function useGetActivities(roles?: UserListResponseDtoRoles) {
  const token = new Token();
  const isLoggedIn = token.getLocalAccessToken() !== null;

  const { data, error } = useSuspenseQuery({
    queryKey: isLoggedIn ? ['activities', roles] : ['activities'],
    queryFn: getActivities,
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
    error: handleGetActivitiesError(error),
  };
}
