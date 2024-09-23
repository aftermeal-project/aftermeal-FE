import { useQuery } from '@tanstack/react-query';
import { GetActivityLocationAPI } from '../../../libs/api/activity-locations';

async function getActivityLocations() {
  return await GetActivityLocationAPI();
}

export default function useGetActivityLocation() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['activity-locations'],
    queryFn: getActivityLocations,
    retry: false,
    refetchOnMount: true,
  });

  return {
    data,
    error,
    loading: isLoading,
  };
}
