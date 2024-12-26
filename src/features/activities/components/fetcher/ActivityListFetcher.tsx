import { ReactElement } from 'react';
import { ActivityListResponseDto } from '../../../../types';
import useGetActivities from '../../api/get-activity';
import { useLocation } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { CurrentActivityTypeAtom } from '../../../../atoms';

interface ActivityListFetcherProps {
  children: (activities: ActivityListResponseDto[]) => ReactElement;
}

export default function ActivityListFetcher({
  children,
}: ActivityListFetcherProps) {
  const location = useLocation();
  const isAdminPath = location.pathname.includes('admin');
  const activityType = useRecoilValue(CurrentActivityTypeAtom);

  const { data } = useGetActivities(isAdminPath, activityType);

  return <>{data && children(data)}</>;
}
