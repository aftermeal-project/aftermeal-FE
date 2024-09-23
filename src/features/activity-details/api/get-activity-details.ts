import { useSuspenseQuery } from '@tanstack/react-query';
import { UserListResponseDtoRoles } from '../../../types';
import { GetActivityDetailsAPI } from '../../../libs/api/activity-details';

async function getActivityDetails({
  queryKey,
}: {
  queryKey: [key: 'activity-details', activityId: string];
}) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_key, activityId] = queryKey;

  return GetActivityDetailsAPI(activityId);
}

export default function useGetActivityDetails(
  activityId: string,
  roles?: UserListResponseDtoRoles[],
) {
  const { data } = useSuspenseQuery({
    queryKey: ['activity-details', activityId],
    queryFn: getActivityDetails,
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
  };
}
