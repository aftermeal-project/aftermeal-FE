import React from 'react';
import SelectInput from './SelectInput';
import LocationSelectInput from './LocationSelectInput';

interface SelectFieldProps {
  value: string;
  title: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  options?: { value: string; label: string }[];
  className?: string;
}

export default function SelectField({
  value,
  title,
  onChange,
  options = [],
  className,
}: SelectFieldProps) {
  return title === 'location' ? (
    <LocationSelectInput
      value={value}
      onChange={onChange}
      className={className}
    />
  ) : (
    <SelectInput
      value={value}
      onChange={onChange}
      options={options}
      className={className}
    />
  );
}
