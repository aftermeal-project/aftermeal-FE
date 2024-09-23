import { ReactElement } from 'react';
import { ActivityResponseDto } from '../../../../types';
import useGetActivities from '../../api/get-activity';

interface ActivityListFetcherProps {
  children: (activities: ActivityResponseDto[]) => ReactElement;
}

export default function ActivityListFetcher({
  children,
}: ActivityListFetcherProps) {
  const { data } = useGetActivities();

  return <>{data && children(data)}</>;
}
