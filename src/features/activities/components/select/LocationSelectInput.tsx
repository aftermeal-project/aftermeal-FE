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
  const { data, error } = useGetActivityLocation();

  useEffect(() => {
    if (data && data.length > 0 && setValue) {
      setValue(title, data[0].name as PathValue<T, Path<T>>);
    }
  }, [data, setValue, title]);

  if (error) {
    return <p>{errorMessages.UNKNOWN_ERROR}</p>;
  }

  const options =
    data?.map(location => ({
      value: location.name.toString(),
      label: location.name,
    })) || [];

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
