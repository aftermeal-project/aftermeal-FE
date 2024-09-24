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
import { SelectInput } from '../select';
import { ActivityLocationListResponseDto } from '../../../../types';

interface LocationSelectInputProps<T extends FieldValues> {
  title: Path<T>;
  value?: string | number | readonly string[] | undefined;
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

  const options = loading
    ? [{ value: 'none', label: '불러오는 중 ...' }]
    : [
        { value: '', label: '장소를 선택해주세요' },
        ...(data?.map((location: ActivityLocationListResponseDto) => ({
          value: location.id.toString(),
          label: location.name,
        })) || []),
      ];

  useEffect(() => {
    if (setValue && data?.length) {
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
