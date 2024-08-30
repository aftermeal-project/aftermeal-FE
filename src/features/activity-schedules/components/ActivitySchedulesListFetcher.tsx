import { ReactElement } from 'react';
import { ActivityScheduleListResponseDto } from '../../../types';
import useGetActivitySchedules from '../api/get-activity-schedules';

interface ActivitySchedulesListFetcherProps {
  children: (
    activitySchedules: ActivityScheduleListResponseDto[],
  ) => ReactElement;
}

export default function ActivitySchedulesListFetcher({
  children,
}: ActivitySchedulesListFetcherProps) {
  const { data, error } = useGetActivitySchedules();

  if (error) {
    throw new Error(error);
  }

  return <>{children(data)}</>;
}
