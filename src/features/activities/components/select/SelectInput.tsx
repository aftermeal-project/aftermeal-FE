import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface SelectInputProps<T extends FieldValues> {
  title: Path<T>;
  options: { value: string; label: string }[];
  value?: string | number | readonly string[] | undefined;
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
      className="box-border w-full px-2 py-1 border border-gray-300 rounded-md cursor-pointer"
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
