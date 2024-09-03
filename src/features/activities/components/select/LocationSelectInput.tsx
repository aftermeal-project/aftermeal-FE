import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { ActivityResponseDto } from '../../../../types';
import { errorMessages } from '../../../../constants';
import useGetActivityLocation from '../../../activity-locations/api/get-activity-locations';
import SelectInput from './SelectInput';

interface LocationSelectInputProps {
  title: Path<ActivityResponseDto>;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  register: UseFormRegister<ActivityResponseDto>;
}

export default function LocationSelectInput({
  title,
  value,
  onChange,
  register,
  ...rest
}: LocationSelectInputProps) {
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
    <SelectInput
      title={title}
      value={value}
      onChange={onChange}
      register={register}
      options={options}
      {...rest}
    />
  );
}
