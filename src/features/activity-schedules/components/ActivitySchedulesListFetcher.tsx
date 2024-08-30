import { ReactElement } from 'react';
import { ActivityScheduleListResponseDto } from '../../../types';
import useGetActivitySchedulesAPI from '../api/get-activity-schedules';

interface ActivitySchedulesListFetcherProps {
  children: (
    activitySchedules: ActivityScheduleListResponseDto[],
  ) => ReactElement;
}

export default function ActivitySchedulesListFetcher({
  children,
}: ActivitySchedulesListFetcherProps) {
  const { activitySchedules, error } = useGetActivitySchedulesAPI();

  if (error) {
    throw new Error(error);
  }

  return <>{children(activitySchedules)}</>;
}
