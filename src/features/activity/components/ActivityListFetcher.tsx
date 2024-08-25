import useGetActivitiesAPI from '../api/get-activities';
import { Activity } from '../../../types/activities';
import { ReactElement } from 'react';

interface ActivityListFetcherProps {
  children: (activities: Activity[]) => ReactElement;
}

export default function ActivityListFetcher({
  children,
}: ActivityListFetcherProps) {
  const { activities, error } = useGetActivitiesAPI();

  if (error) {
    throw new Error(error);
  }

  return <>{children(activities)}</>;
}
