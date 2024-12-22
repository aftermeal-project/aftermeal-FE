import { UserListResponseDto } from '../../../../types';
import { Dropdown } from '../../../../components';

interface UserProps {
  user: UserListResponseDto;
  onUpdate?: () => void;
  onDelete: () => void;
}

export default function User({ user, onUpdate, onDelete }: UserProps) {
  return (
    <li className="flex items-center border-b border-gray-200 py-3">
      <div className="min-w-0 flex-1 pr-4">
        <p
          className={`text-md mb-2 font-bold ${user.type === 'STUDENT' ? 'text-blue-700' : 'text-green-700'}`}
        >
          {user.type === 'TEACHER' ? '선생님' : '학생'}
        </p>
        <div className="mb-1 flex items-center gap-x-2">
          <p className="font-medium text-gray-900">
            <>{user.type === 'STUDENT' && user.generationNumber + '기 - '}</>
            {user.name}
          </p>
        </div>
        <p className="text-sm text-gray-500">{user.email}</p>
      </div>
      <div className="text-md my-auto flex flex-col items-end space-y-2">
        <span
          className={`inline-flex items-center rounded-full px-4 py-[6px] text-xs font-medium ${user.role && user.role === 'ADMIN' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800'}`}
        >
          {user.role && user.role === 'ADMIN' ? 'Admin' : 'User'}
        </span>
        <span
          className={`inline-flex items-center rounded-full px-4 py-[6px] text-xs font-medium ${user.status === 'ACTIVATED' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}
        >
          {user.status === 'ACTIVATED' ? '활성화' : '비활성화'}
        </span>
      </div>

      <Dropdown
        onDelete={onDelete}
        onUpdate={onUpdate ? () => onUpdate() : undefined}
      />
    </li>
  );
}
