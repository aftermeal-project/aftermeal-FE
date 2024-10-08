import { InputHTMLAttributes } from 'react';
import { LocationSelectInput, SelectInput } from '../select';
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
  UseFormTrigger,
} from 'react-hook-form';

interface SelectFieldProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLSelectElement> {
  title: Path<T>;
  options: { value: string; label: string }[];
  register: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
  trigger?: UseFormTrigger<T>;
}

export default function SelectField<T extends FieldValues>({
  title,
  options,
  register,
  setValue,
  trigger,
  ...rest
}: SelectFieldProps<T>) {
  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target;

    if (setValue) {
      setValue(title, value as PathValue<T, Path<T>>);
    }

    trigger?.(title);
  };

  const commonProps = { title, register, onChange: handleChange, ...rest };

  return title === 'location' ? (
    <LocationSelectInput<T> {...commonProps} />
  ) : (
    <SelectInput<T> options={options} {...commonProps} />
  );
}
