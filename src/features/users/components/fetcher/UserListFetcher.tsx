import { ReactElement } from 'react';
import { UserListResponseDto } from '../../../../types';
import useGetUsers from '../../api/get-users';

interface UserListFetcherProps {
  children: (users: UserListResponseDto[]) => ReactElement;
}

export default function ActivityListFetcher({
  children,
}: UserListFetcherProps) {
  const { data } = useGetUsers();

  return <>{data && children(data)}</>;
}
