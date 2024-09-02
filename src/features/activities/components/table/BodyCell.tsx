import { UseFormRegister } from 'react-hook-form';
import { ActivityResponseDto } from '../../../../types';
import { InputHTMLAttributes } from 'react';

interface BodyCellProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement | HTMLSelectElement>,
    'value' | 'onChange'
  > {
  value: string | number;
  title: keyof ActivityResponseDto;
  type: 'text' | 'number' | 'select' | 'date' | 'time';
  isEditing: boolean;
  register: UseFormRegister<ActivityResponseDto>;
}

export default function BodyCell({
  value,
  title,
  type,
  isEditing,
  register,
  ...rest
}: BodyCellProps) {
  return (
    <td className="border border-gray-200 px-2 py-1 align-top">
      {isEditing ? (
        type === 'select' ? (
          <select
            {...register(title)}
            defaultValue={value as string}
            className="box-border w-full cursor-pointer rounded-md border border-gray-300 px-2 py-1"
            {...rest}
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
            className="box-border w-full rounded-md border border-gray-300 px-2 py-1"
            {...rest}
          />
        )
      ) : (
        <span className="block w-full px-2 py-1 text-gray-800">{value}</span>
      )}
    </td>
  );
}
