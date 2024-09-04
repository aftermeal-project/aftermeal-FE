import React, { InputHTMLAttributes } from 'react';
import { Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ActivityResponseDto, Option } from '../../../../types';
import SelectField from '../select/SelectField';
import { formatTime } from '../../../../utils';

interface BodyCellProps extends InputHTMLAttributes<HTMLInputElement> {
  title: Path<ActivityResponseDto>;
  isEditing: boolean;
  value: string | number;
  register: UseFormRegister<ActivityResponseDto>;
  options?: Option[];
  setValue?: UseFormSetValue<ActivityResponseDto>;
}

export default function BodyCell({
  title,
  isEditing,
  value,
  register,
  options,
  setValue,
  type,
  ...rest
}: BodyCellProps) {
  /**
   * Cell이 update mode 일 때 time 포맷팅
   */
  if (setValue && isEditing && type === 'time') {
    setValue(title, formatTime({ type: 'format', time: value as string }));
  }

  /**
   * read-only cell 렌더링
   */
  if (!isEditing) {
    const displayValue =
      type === 'time'
        ? formatTime({ type: 'readable', time: value as string })
        : value;

    return (
      <td className="border border-gray-200 px-2">
        <span className="block w-full px-2 py-1 text-gray-800">
          {displayValue}
        </span>
      </td>
    );
  }

  /**
   * 'select' 타입일 때  SelectField 렌더링
   */
  if (type === 'select' && options) {
    return (
      <td className="border border-gray-200 px-2">
        <SelectField<ActivityResponseDto>
          title={title}
          value={value}
          register={register}
          options={options}
        />
      </td>
    );
  }

  /**
   * 기타 타입일 때 input field 렌더링
   */
  return (
    <td className="border border-gray-200 px-2">
      <input
        type={type}
        className={`box-border w-full rounded-md border border-gray-300 px-2 py-1 ${
          title === 'maxParticipants' && 'w-24'
        }`}
        placeholder={value as string}
        {...register(title, { required: true })}
        {...rest}
      />
    </td>
  );
}
