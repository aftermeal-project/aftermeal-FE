import { Suspense } from 'react';

import {
  UserListSkeleton,
  UserListFetcher,
  UserList,
} from '../../../../features/users';

export default function UserManagementTab() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">유저 관리</h1>
      <Suspense fallback={<UserListSkeleton />}>
        <UserListFetcher>{users => <UserList users={users} />}</UserListFetcher>
      </Suspense>
    </div>
  );
}
