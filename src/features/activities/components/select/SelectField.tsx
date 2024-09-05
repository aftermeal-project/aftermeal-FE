import { InputHTMLAttributes } from 'react';
import { LocationSelectInput, SelectInput } from '../select';
import {
  FieldValues,
  Path,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';

interface SelectFieldProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLSelectElement> {
  title: Path<T>;
  options: { value: string; label: string }[];
  register: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
}

export default function SelectField<T extends FieldValues>({
  title,
  options,
  register,
  setValue,
  ...rest
}: SelectFieldProps<T>) {
  return title === 'location' ? (
    <LocationSelectInput<T>
      title={title}
      register={register}
      {...(setValue && { setValue: setValue })}
    />
  ) : (
    <SelectInput<T> title={title} options={options} register={register} />
  );
}
