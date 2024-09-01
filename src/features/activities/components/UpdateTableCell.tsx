import { UseFormRegister } from 'react-hook-form';
import { ActivityListResponseDto } from '../../../types';

interface UpdateTableCellProps {
  value: string | number;
  title: keyof ActivityListResponseDto;
  type: 'text' | 'number' | 'select';
  isEditing: boolean;
  register: UseFormRegister<ActivityListResponseDto>;
}

export default function UpdateTableCell({
  value,
  title,
  type,
  isEditing,
  register,
}: UpdateTableCellProps) {
  return (
    <td className="border border-gray-200 px-[10px] py-1">
      {isEditing ? (
        type === 'select' ? (
          <select
            {...register(title)}
            defaultValue="운동장"
            className="w-full px-2 py-1 border border-gray-300 rounded-md cursor-pointer"
          >
            <option value="강당">강당</option>
            <option value="상담실">상담실</option>
            <option value="당구장">당구장</option>
            <option value="운동장">운동장</option>
          </select>
        ) : (
          <input
            type={type}
            {...register(title)}
            defaultValue={value}
            className="w-full px-2 py-1 border border-gray-300 rounded-md"
          />
        )
      ) : (
        value
      )}
    </td>
  );
}
