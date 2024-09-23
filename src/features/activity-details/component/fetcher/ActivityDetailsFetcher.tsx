import { ReactElement } from 'react';
import { ActivityDetailResponseDto } from '../../../../types';
import useGetActivityDetails from '../../api/get-activity-details';
import { useParams } from 'react-router-dom';

interface ActivityDetailsFetcherProps {
  children: (activityDetails: ActivityDetailResponseDto) => ReactElement;
}

export default function ActivityDetailsFetcher({
  children,
}: ActivityDetailsFetcherProps) {
  const params = useParams();

  const { data } = useGetActivityDetails(String(params.activityId));

  return <>{data && children(data)}</>;
}
