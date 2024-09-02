import { UseFormRegister } from 'react-hook-form';
import { ActivityResponseDto } from '../../../../types';
import { InputHTMLAttributes } from 'react';
import { SelectField } from '..';

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
  options?: { value: string; label: string }[]; // select의 옵션
}

export default function BodyCell({
  value,
  title,
  type,
  isEditing,
  register,
  options,
  ...rest
}: BodyCellProps) {
  const { ref, onChange, ...restRegister } = register(title);

  return (
    <td className="border border-gray-200 px-2 py-1 align-top">
      {isEditing ? (
        type === 'select' ? (
          <SelectField
            value={value as string}
            title={title as string}
            onChange={e => onChange(e)}
            options={options}
            className="box-border w-full cursor-pointer rounded-md border border-gray-300 px-2 py-1"
            {...rest}
          />
        ) : (
          <input
            type={type}
            ref={ref}
            defaultValue={value}
            onChange={e => onChange(e)}
            className="box-border w-full rounded-md border border-gray-300 px-2 py-1"
            {...restRegister}
          />
        )
      ) : (
        <span className="block w-full px-2 py-1 text-gray-800">{value}</span>
      )}
    </td>
  );
}
