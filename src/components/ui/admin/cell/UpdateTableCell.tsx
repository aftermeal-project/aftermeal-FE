import { UseFormRegister } from 'react-hook-form';
import { Activity } from '../../../../pages/admin/AdminPage';

interface UpdateTableCellProps {
  value: string | number;
  name: keyof Activity;
  type: 'text' | 'number' | 'select';
  isEditing: boolean;
  register: UseFormRegister<Activity>;
}

export default function UpdateTableCell({
  value,
  name,
  type,
  isEditing,
  register,
}: UpdateTableCellProps) {
  return (
    <td className="border border-gray-200 px-[10px] py-1">
      {isEditing ? (
        type === 'select' ? (
          <select
            {...register(name)}
            defaultValue="운동장"
            className="w-full cursor-pointer rounded-md border border-gray-300 px-2 py-1"
          >
            <option value="강당">강당</option>
            <option value="상담실">상담실</option>
            <option value="당구장">당구장</option>
            <option value="운동장">운동장</option>
          </select>
        ) : (
          <input
            type={type}
            {...register(name)}
            defaultValue={value}
            className="w-full rounded-md border border-gray-300 px-2 py-1"
          />
        )
      ) : (
        value
      )}
    </td>
  );
}
