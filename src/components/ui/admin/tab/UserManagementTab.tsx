import UserManagementList from '../../../../features/users/components/list/UserList';

export default function UserManagementTab() {
  return (
    <div>
      <h1 className="mb-4 text-2xl font-bold">유저 관리</h1>
      <UserManagementList />
    </div>
  );
}
