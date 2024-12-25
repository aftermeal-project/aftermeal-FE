import { useSuspenseQuery } from '@tanstack/react-query';
import { GetActivitiesAPI } from '../../../libs/api/activities';
import { formatDate } from '../../../utils';

async function getActivities(isAdminPath: boolean) {
  const today = formatDate(new Date().toISOString());

  if (isAdminPath) {
    return GetActivitiesAPI();
  } else {
    return GetActivitiesAPI(today);
  }
}

export default function useGetActivities(isAdminPath: boolean) {
  const { data } = useSuspenseQuery({
    queryKey: ['activities'],
    queryFn: () => getActivities(isAdminPath),
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
  };
}
