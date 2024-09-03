import React, { InputHTMLAttributes } from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { ActivityResponseDto } from '../../../../types';
import SelectField from '../select/SelectField';

interface BodyCellProps extends InputHTMLAttributes<HTMLInputElement> {
  title: Path<ActivityResponseDto>;
  isEditing: boolean;
  value: string | number;
  register: UseFormRegister<ActivityResponseDto>;
  options?: { value: string; label: string }[];
}

export default function BodyCell({
  title,
  isEditing,
  value,
  register,
  options,
  ...rest
}: BodyCellProps) {
  const { type } = rest;

  if (!isEditing) {
    return (
      <td className="border border-gray-200 px-2 py-1 align-top">
        <span className="block w-full px-2 py-1 text-gray-800">{value}</span>
      </td>
    );
  }

  if (type === 'select') {
    return (
      <td className="border border-gray-200 px-2 py-1 align-top">
        <SelectField
          title={title}
          value={value}
          register={register}
          options={options as { value: string; label: string }[]}
        />
      </td>
    );
  }

  return (
    <td className="border border-gray-200 px-2 py-1 align-top">
      <input
        type={type}
        className="box-border w-full rounded-md border border-gray-300 px-2 py-1"
        placeholder={value as string}
        {...register(title, {
          required: `${title}은 필수 입력입니다.`,
        })}
        {...rest}
      />
    </td>
  );
}
