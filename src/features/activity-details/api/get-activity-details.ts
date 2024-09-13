import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { errorMessages } from '../../../constants';
import { UserListResponseDtoRoles } from '../../../types';
import Token from '../../../libs/utils/token';
import { AdminGetActivityDetailsAPI } from '../../../libs/api/admin.activity-details';
import { GetActivityDetailsAPI } from '../../../libs/api/activity-details';

async function getActivityDetails({
  queryKey,
}: {
  queryKey: [
    key: 'activity-details',
    activityId: string,
    roles?: UserListResponseDtoRoles[],
  ];
}) {
  const [activityId, roles] = queryKey;

  if (roles?.includes('ADMIN')) {
    return AdminGetActivityDetailsAPI(activityId);
  } else {
    return GetActivityDetailsAPI(activityId);
  }
}

function handleGetActivityDetailsError(error: any) {
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

export default function useGetActivityDetails(
  activityId: string,
  roles?: UserListResponseDtoRoles[],
) {
  const token = new Token();
  const isLoggedIn = token.getLocalAccessToken() !== null;

  const { data, error } = useSuspenseQuery({
    queryKey: isLoggedIn
      ? ['activity-details', activityId, roles]
      : ['activity-details', activityId],
    queryFn: getActivityDetails,
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
    error: handleGetActivityDetailsError(error),
  };
}
