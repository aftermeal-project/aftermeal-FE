import React from 'react';

interface SelectInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options: { value: string; label: string }[];
  className?: string;
}

export default function SelectInput({
  value,
  onChange,
  options,
  className,
}: SelectInputProps) {
  return (
    <select
      value={value}
      onChange={onChange}
      className={`box-border w-full cursor-pointer rounded-md border border-gray-300 px-2 py-1 ${className}`}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
