import { ReactElement } from 'react';
import { ActivityLocationListResponseDto } from '../../../../types';
import useGetActivityLocation from '../../api/get-activity-locations';

interface ActivityLocationListFetcherProps {
  children: (locations: ActivityLocationListResponseDto[]) => ReactElement;
}

export default function ActivityLocationListFetcher({
  children,
}: ActivityLocationListFetcherProps) {
  const { data, error } = useGetActivityLocation();

  if (error) {
    throw new Error(error);
  }

  return <>{data && children(data)}</>;
}
