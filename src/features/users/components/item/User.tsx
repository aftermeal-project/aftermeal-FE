import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { FaEllipsisV } from 'react-icons/fa';
import { UserListResponseDto } from '../../../../types';

interface UserProps {
  user: UserListResponseDto;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function User({ user, onUpdate, onDelete }: UserProps) {
  return (
    <li className="flex items-center py-3 border-b border-gray-200">
      <div className="flex-1 min-w-0 pr-4">
        <p
          className={`text-md mb-2 font-bold ${user.type === 'STUDENT' ? 'text-blue-700' : 'text-green-700'}`}
        >
          {user.type === 'TEACHER' ? '선생님' : '학생'}
        </p>
        <div className="flex items-center mb-1 gap-x-2">
          <p className="font-medium text-gray-900">
            {user.generationNumber}기 - {user.name}
          </p>
        </div>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <div className="flex flex-col items-end my-auto space-y-2 text-md">
        <span
          className={`inline-flex items-center rounded-full px-4 py-[6px] text-xs font-medium ${user.roles.includes('ADMIN') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}
        >
          {user.roles.includes('ADMIN') ? 'Admin' : 'User'}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-4 py-[6px] text-xs font-medium ${user.status === 'ACTIVATE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {user.status === 'ACTIVATE' ? '활성화' : '비활성화'}
        </span>
      </div>
      <Menu as="div" className="relative">
        <MenuButton className="inline-flex items-center p-2 text-gray-500 hover:text-gray-700">
          <FaEllipsisV className="w-5 h-5" aria-hidden="true" />
        </MenuButton>
        <MenuItems className="absolute right-0 z-20 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg w-28">
          <div className="space-y-2">
            <button
              onClick={onUpdate}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-100"
            >
              수정
            </button>
            <button
              onClick={onDelete}
              className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-red-100"
            >
              삭제
            </button>
          </div>
        </MenuItems>
      </Menu>
    </li>
  );
}
