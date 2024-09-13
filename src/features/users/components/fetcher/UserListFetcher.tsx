import { ReactElement } from 'react';
import { UserListResponseDto } from '../../../../types';
import useGetUsers from '../../api/get-users';

interface UserListFetcherProps {
  children: (users: UserListResponseDto[]) => ReactElement;
}

export default function ActivityListFetcher({
  children,
}: UserListFetcherProps) {
  const { data, error } = useGetUsers();

  if (error) {
    throw new Error(error);
  }

  return <>{data && children(data)}</>;
}
