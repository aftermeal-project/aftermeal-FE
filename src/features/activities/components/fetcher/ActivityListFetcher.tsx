import { ReactElement } from 'react';
import { ActivityListResponseDto } from '../../../../types';
import useGetActivities from '../../api/get-activity';

interface ActivityListFetcherProps {
  children: (activities: ActivityListResponseDto[]) => ReactElement;
}

export default function ActivityListFetcher({
  children,
}: ActivityListFetcherProps) {
  const { data } = useGetActivities();

  return <>{data && children(data)}</>;
}
