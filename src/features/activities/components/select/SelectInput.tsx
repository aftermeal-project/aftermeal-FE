import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface SelectInputProps<T extends FieldValues> {
  title: Path<T>;
  options: { value: string; label: string }[];
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  register: UseFormRegister<T>;
}

export default function SelectInput<T extends FieldValues>({
  title,
  options,
  value,
  onChange,
  register,
  ...rest
}: SelectInputProps<T>) {
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
