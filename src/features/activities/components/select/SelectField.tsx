import React, { InputHTMLAttributes } from 'react';
import SelectInput from './SelectInput';
import LocationSelectInput from './LocationSelectInput';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface SelectFieldProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLSelectElement> {
  title: Path<T>;
  options: { value: string; label: string }[];
  register: UseFormRegister<T>;
}

export default function SelectField<T extends FieldValues>({
  title,
  options,
  register,
  ...rest
}: SelectFieldProps<T>) {
  return title === 'location' ? (
    <LocationSelectInput title={title} register={register} />
  ) : (
    <SelectInput title={title} options={options} register={register} />
  );
}
