import { ReactElement } from 'react';
import { ActivityListResponseDto } from '../../../../types';
import useGetActivities from '../../api/get-activity';
import { useLocation } from 'react-router-dom';

interface ActivityListFetcherProps {
  children: (activities: ActivityListResponseDto[]) => ReactElement;
}

export default function ActivityListFetcher({
  children,
}: ActivityListFetcherProps) {
  const location = useLocation();
  const isAdminPath = location.pathname.includes('admin');

  const { data } = useGetActivities(isAdminPath);

  return <>{data && children(data)}</>;
}
