import { useState } from 'react';
import { UserListResponseDto } from '../../../../types';
import User from '../item/User';

export default function UserList() {
  const initialUsers: UserListResponseDto[] = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      roles: ['USER'],
      type: 'STUDENT',
      status: 'ACTIVATE',
      generationNumber: 1,
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      roles: ['ADMIN'],
      type: 'TEACHER',
      status: 'DEACTIVATE',
      generationNumber: 2,
    },
    {
      id: 3,
      name: 'Alice Johnson',
      email: 'alice@example.com',
      roles: ['USER'],
      type: 'STUDENT',
      status: 'ACTIVATE',
      generationNumber: 3,
    },
    // 추가 사용자 데이터
  ];

  const [users, setUsers] = useState<UserListResponseDto[]>(initialUsers);
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
      <div className="w-full px-6 py-3 bg-white border border-gray-200 rounded-lg shadow">
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
