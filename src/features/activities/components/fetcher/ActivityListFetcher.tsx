import { ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { UserAtom } from '../../../../atoms';
import { ActivityResponseDto } from '../../../../types';
import useGetActivities from '../../api/get-activity';

interface ActivityListFetcherProps {
  children: (activities: ActivityResponseDto[]) => ReactElement;
}

export default function ActivityListFetcher({
  children,
}: ActivityListFetcherProps) {
  const user = useRecoilValue(UserAtom);

  const { data, error } = useGetActivities(user.roles);

  if (error) {
    throw new Error(error);
  }

  return <>{data && children(data)}</>;
}
