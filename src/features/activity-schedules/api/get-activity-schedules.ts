import { useSuspenseQuery } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { errorMessages } from '../../../constants';
import { GetActivitySchedulesAPI } from '../../../libs/api/activities-schedules';

async function getActivitySchedules() {
  return await GetActivitySchedulesAPI();
}

function handleGetActivitiySchedulesError(error: any) {
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

export default function useGetActivitySchedules() {
  const { data, error } = useSuspenseQuery({
    queryKey: ['activity-schedules'],
    queryFn: getActivitySchedules,
    retry: false,
  });

  return {
    data,
    error: handleGetActivitiySchedulesError(error),
  };
}
