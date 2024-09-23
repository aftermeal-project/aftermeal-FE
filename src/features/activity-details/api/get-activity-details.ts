import { useSuspenseQuery } from '@tanstack/react-query';
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, activityId, roles] = queryKey;

  if (roles?.includes('ADMIN')) {
    return AdminGetActivityDetailsAPI(activityId);
  } else {
    return GetActivityDetailsAPI(activityId);
  }
}

export default function useGetActivityDetails(
  activityId: string,
  roles?: UserListResponseDtoRoles[],
) {
  const token = new Token();
  const isLoggedIn = token.getLocalAccessToken() !== null;

  const { data } = useSuspenseQuery({
    queryKey: isLoggedIn
      ? ['activity-details', activityId, roles]
      : ['activity-details', activityId],
    queryFn: getActivityDetails,
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
  };
}
