import React, { useEffect } from 'react';
import {
  FieldValues,
  Path,
  PathValue,
  UseFormRegister,
  UseFormSetValue,
} from 'react-hook-form';
import { errorMessages } from '../../../../constants';
import useGetActivityLocation from '../../../activity-locations/api/get-activity-locations';
import SelectInput from './SelectInput';

interface LocationSelectInputProps<T extends FieldValues> {
  title: Path<T>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  register: UseFormRegister<T>;
  setValue?: UseFormSetValue<T>;
}

export default function LocationSelectInput<T extends FieldValues>({
  title,
  value,
  onChange,
  register,
  setValue,
  ...rest
}: LocationSelectInputProps<T>) {
  const { data, error, loading } = useGetActivityLocation();

  const defaultOptions = [{ value: 'none', label: 'Loading ...' }];

  const options = loading
    ? defaultOptions
    : [
        ...(data?.map(location => ({
          value: location.name.toString(),
          label: location.name,
        })) || []),
      ];

  useEffect(() => {
    if (setValue && data && data.length > 0) {
      setValue(title, 'none' as PathValue<T, Path<T>>);
    }
  }, [data, setValue, title]);

  if (error) {
    return <p>{errorMessages.UNKNOWN_ERROR}</p>;
  }

  return (
    <SelectInput<T>
      title={title}
      value={value}
      onChange={onChange}
      register={register}
      options={options}
      {...rest}
    />
  );
}
