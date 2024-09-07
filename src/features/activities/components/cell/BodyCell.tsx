import React, { InputHTMLAttributes } from 'react';
import { Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ActivityResponseDto, Option } from '../../../../types';
import { SelectField } from '../select';
import { formatTime } from '../../../../utils';

interface BodyCellProps extends InputHTMLAttributes<HTMLInputElement> {
  title: Path<ActivityResponseDto>;
  isUpdating: boolean;
  value: string | number;
  register: UseFormRegister<ActivityResponseDto>;
  options?: Option[];
  setValue?: UseFormSetValue<ActivityResponseDto>;
}

export default function BodyCell({
  title,
  isUpdating,
  value,
  register,
  options,
  setValue,
  type,
  ...rest
}: BodyCellProps) {
  /**
   * Cell이 update 중일 때 time 포맷팅
   */
  if (setValue && isUpdating && type === 'time') {
    setValue(title, formatTime({ type: 'format', time: value as string }));
  }

  /**
   * read-only cell 렌더링
   */
  if (!isUpdating) {
    const displayValue =
      type === 'time'
        ? formatTime({ type: 'readable', time: value as string })
        : value;

    return (
      <td className="px-2 border border-gray-200">
        <span className="block w-full px-2 py-1 text-gray-800">
          {displayValue}
        </span>
      </td>
    );
  }

  /**
   * 'select' 타입일 때  SelectField 렌더링
   */
  if (type === 'select') {
    return (
      <td className="px-2 border border-gray-200">
        <SelectField<ActivityResponseDto>
          title={title}
          value={value}
          register={register}
          options={options as { value: string; label: string }[]}
        />
      </td>
    );
  }

  /**
   *  type이 select가 아니며, isUpading일 때 input field 렌더링
   */
  return (
    <td className="px-2 border border-gray-200">
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
