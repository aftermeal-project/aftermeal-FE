import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../../../atoms';
import { ActivityDetailResponseDto } from '../../../../types';
import useGetActivityDetails from '../../api/get-activity-details';
import { useParams } from 'react-router-dom';

interface ActivityDetailsFetcherProps {
  children: (activityDetails: ActivityDetailResponseDto) => ReactElement;
}

export default function ActivityDetailsFetcher({
  children,
}: ActivityDetailsFetcherProps) {
  const user = useRecoilValue(UserAtom);
  const params = useParams();

  const { data, error } = useGetActivityDetails(
    String(params.activityId),
    user.roles,
  );

  if (error) {
    throw new Error(error);
  }

  return <>{data && children(data)}</>;
}
