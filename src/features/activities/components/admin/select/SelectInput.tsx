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
    <div className="relative inline-block w-full">
      <select
        className="block w-full px-3 py-2 pr-8 bg-white border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        {...register(title)}
        value={value}
        onChange={onChange}
        {...rest}
      >
        {Array.isArray(options) &&
          options.map(option => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
      </select>
    </div>
  );
}
