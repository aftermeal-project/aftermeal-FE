import { useSuspenseQuery } from '@tanstack/react-query';
import { GetActivitiesAPI } from '../../../libs/api/activities';
import { UserListResponseDtoRoles } from '../../../types';
import { AdminGetActivitiesAPI } from '../../../libs/api/admin.activities';
import Token from '../../../libs/utils/token';

async function getActivities({
  queryKey,
}: {
  queryKey: [key: 'activities', roles?: UserListResponseDtoRoles[]];
}) {
  const [, roles] = queryKey;

  if (roles?.includes('ADMIN')) {
    return AdminGetActivitiesAPI();
  } else {
    return GetActivitiesAPI();
  }
}

export default function useGetActivities(roles?: UserListResponseDtoRoles[]) {
  const token = new Token();
  const isLoggedIn = token.getLocalAccessToken() !== null;

  const { data } = useSuspenseQuery({
    queryKey: isLoggedIn ? ['activities', roles] : ['activities'],
    queryFn: getActivities,
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
  };
}
