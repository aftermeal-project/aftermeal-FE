import React from 'react';
import { FieldValues, Path, UseFormRegister } from 'react-hook-form';
import { errorMessages } from '../../../../constants';
import useGetActivityLocation from '../../../activity-locations/api/get-activity-locations';
import SelectInput from './SelectInput';

interface LocationSelectInputProps<T extends FieldValues> {
  title: Path<T>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  register: UseFormRegister<T>;
}

export default function LocationSelectInput<T extends FieldValues>({
  title,
  value,
  onChange,
  register,
  ...rest
}: LocationSelectInputProps<T>) {
  const { data, error } = useGetActivityLocation();

  if (error) {
    alert(errorMessages.UNKNOWN_ERROR);
  }

  const options =
    data?.map(location => ({
      value: location.id.toString(),
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
