import { InputHTMLAttributes } from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';

interface AuthInputProps<T extends FieldValues>
  extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  name: Path<T>;
  register: UseFormRegister<T>;
  validationRules?: object;
  margin?: string;
  error?: string;
  srOnlyClass?: string;
}

export default function AuthInput<T extends FieldValues>({
  label,
  name,
  register,
  validationRules,
  margin,
  error,
  srOnlyClass = '',
  ...rest
}: AuthInputProps<T>) {
  return (
    <div className={`text-left ${margin}`}>
      <label htmlFor={rest.id} className={srOnlyClass}>
        {label}
      </label>
      <input
        className={`w-full rounded-md border p-2 focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        {...register(name, validationRules)}
        {...rest}
      />
    </div>
  );
}
