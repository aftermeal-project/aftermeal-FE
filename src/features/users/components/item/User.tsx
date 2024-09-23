import { UserListResponseDto } from '../../../../types';
import { Dropdown } from '../../../../components';

interface UserProps {
  user: UserListResponseDto;
  onUpdate?: () => void;
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
            <>{user.type === 'STUDENT' && user.generationNumber + '기 - '}</>
            {user.name}
          </p>
        </div>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <div className="flex flex-col items-end my-auto space-y-2 text-md">
        <span
          className={`inline-flex items-center rounded-full px-4 py-[6px] text-xs font-medium ${user.roles && user.roles.includes('ADMIN') ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}
        >
          {user.roles && user.roles.includes('ADMIN') ? 'Admin' : 'User'}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-4 py-[6px] text-xs font-medium ${user.status === 'ACTIVATE' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {user.status === 'ACTIVATE' ? '활성화' : '비활성화'}
        </span>
      </div>

      <Dropdown
        onDelete={onDelete}
        onUpdate={onUpdate ? () => onUpdate() : undefined}
      />
    </li>
  );
}
