import { useState } from 'react';
import { UserListResponseDto } from '../../../../types';
import User from '../item/User';

interface UserListContainerProps {
  users: UserListResponseDto[];
}

export default function UserList({ users }: UserListContainerProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <section>
      <div className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="검색..."
          className="w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>
      <div className="max-h-[calc(100vh-150px)] w-full overflow-y-auto rounded-lg border border-gray-200 bg-white px-6 py-3 shadow">
        <div className="flow-root">
          <ul className="divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              <>
                {filteredUsers.map(user => (
                  <User key={user.id} user={user} />
                ))}
              </>
            ) : (
              <h1 className="py-3 font-bold text-md">검색 결과가 없습니다!</h1>
            )}
          </ul>
        </div>
      </div>
    </section>
  );
}
