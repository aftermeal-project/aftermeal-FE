import { useQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { errorMessages } from '../../../constants';
import { GetActivityLocationAPI } from '../../../libs/api/admin.activity-locations';

async function getActivityLocations() {
  return await GetActivityLocationAPI();
}

function handleGetActivitiesError(error: any) {
  if (error instanceof AxiosError) {
    const { response } = error;

    if (!response) {
      return errorMessages.ERR_NETWORK;
    }

    if (response.status === 500) {
      return errorMessages.SERVER_ERROR;
    } else {
      return errorMessages.DEFAULT_ERROR;
    }
  }
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
    error: handleGetActivitiesError(error),
    loading: isLoading,
  };
}
