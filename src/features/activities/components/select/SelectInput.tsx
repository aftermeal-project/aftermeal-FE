import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { ActivityResponseDto } from '../../../../types';

interface SelectInputProps {
  title: Path<ActivityResponseDto>;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  register: UseFormRegister<ActivityResponseDto>;
}

export default function SelectInput({
  title,
  options,
  value,
  onChange,
  register,
  ...rest
}: SelectInputProps) {
  return (
    <select
      className="box-border w-full cursor-pointer rounded-md border border-gray-300 px-2 py-1"
      {...register(title)}
      value={value}
      onChange={onChange}
      {...rest}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
