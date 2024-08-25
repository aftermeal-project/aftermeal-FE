import { useSuspenseQuery } from '@tanstack/react-query';
import { GetActivitiesAPI } from '../../../libs/api/activities';
import { AxiosError } from 'axios';
import { errorMessages } from '../../../constants';

async function getActivities() {
  return await GetActivitiesAPI();
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

export default function useGetActivitiesAPI() {
  const { data, error } = useSuspenseQuery({
    queryKey: ['activities'],
    queryFn: getActivities,
    retry: false,
  });

  return { activities: data.data, error: handleGetActivitiesError(error) };
}
