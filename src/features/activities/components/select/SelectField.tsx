import React, { InputHTMLAttributes } from 'react';
import SelectInput from './SelectInput';
import LocationSelectInput from './LocationSelectInput';
import { Path, UseFormRegister } from 'react-hook-form';
import { ActivityResponseDto } from '../../../../types';

interface SelectFieldProps extends InputHTMLAttributes<HTMLSelectElement> {
  title: Path<ActivityResponseDto>;
  options: { value: string; label: string }[];
  register: UseFormRegister<ActivityResponseDto>;
}

export default function SelectField({
  title,
  options,
  register,
  ...rest
}: SelectFieldProps) {
  return title === 'location' ? (
    <LocationSelectInput title={title} register={register} />
  ) : (
    <SelectInput
      title={title}
      options={options} // 명시적으로 전달
      register={register}
    />
  );
}
