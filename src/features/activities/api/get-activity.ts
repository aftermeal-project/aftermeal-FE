import { useSuspenseQuery } from '@tanstack/react-query';
import { GetActivitiesAPI } from '../../../libs/api/activities';
import { formatDate } from '../../../utils';
import { ActivityListResponseDtoType } from '../../../types';

async function getActivities(
  isAdminPath: boolean,
  type: ActivityListResponseDtoType,
) {
  const today = formatDate(new Date().toISOString());

  if (isAdminPath) {
    return GetActivitiesAPI();
  } else {
    return GetActivitiesAPI(today, type);
  }
}

export default function useGetActivities(
  isAdminPath: boolean,
  type: ActivityListResponseDtoType,
) {
  const { data } = useSuspenseQuery({
    queryKey: ['activities', type],
    queryFn: () => getActivities(isAdminPath, type),
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
  };
}
