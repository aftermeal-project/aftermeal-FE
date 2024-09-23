import { useSuspenseQuery } from '@tanstack/react-query';
import { GetActivitiesAPI } from '../../../libs/api/activities';

async function getActivities() {
  return GetActivitiesAPI();
}

export default function useGetActivities() {
  const { data } = useSuspenseQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
  };
}
