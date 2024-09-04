import React, { InputHTMLAttributes } from 'react';
import { Path, UseFormRegister, UseFormSetValue } from 'react-hook-form';
import { ActivityResponseDto } from '../../../../types';
import SelectField from '../select/SelectField';
import { formatTime } from '../../../../utils';

interface BodyCellProps extends InputHTMLAttributes<HTMLInputElement> {
  title: Path<ActivityResponseDto>;
  isEditing: boolean;
  value: string | number;
  register: UseFormRegister<ActivityResponseDto>;
  options?: { value: string; label: string }[];
  setValue?: UseFormSetValue<ActivityResponseDto>;
}

export default function BodyCell({
  title,
  isEditing,
  value,
  register,
  options,
  setValue,
  ...rest
}: BodyCellProps) {
  const { type } = rest;

  if (setValue && isEditing) {
    setValue(title, formatTime({ type: 'format', time: value as string }));
  }

  if (!isEditing) {
    const time = formatTime({ type: 'readable', time: value as string });

    return (
      <td className="border border-gray-200 px-2">
        <span className="block w-full px-2 py-1 text-gray-800">
          {type === 'time' ? time : value}
        </span>
      </td>
    );
  }

  if (type === 'select') {
    return (
      <td className="border border-gray-200 px-2">
        <SelectField<ActivityResponseDto>
          title={title}
          value={value}
          register={register}
          options={options as { value: string; label: string }[]}
        />
      </td>
    );
  }

  return (
    <td className="border border-gray-200 px-2">
      <input
        type={type}
        className={`box-border w-full rounded-md border border-gray-300 px-2 py-1 ${title === 'maxParticipants' && 'w-24'}`}
        placeholder={value as string}
        {...register(title, { required: true })}
        {...rest}
      />
    </td>
  );
}
