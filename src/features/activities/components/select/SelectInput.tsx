import React from 'react';
import { Path, UseFormRegister } from 'react-hook-form';
import { ActivityResponseDto } from '../../../../types';

interface SelectInputProps {
  title: Path<ActivityResponseDto>;
  options: { value: string; label: string }[];
  value?: string; // value prop 추가
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void; // onChange prop 추가
  register: UseFormRegister<ActivityResponseDto>;
}

export default function SelectInput({
  title,
  options,
  value,
  onChange,
  register,
  ...rest
}: SelectInputProps) {
  return (
    <select
      className="box-border w-full cursor-pointer rounded-md border border-gray-300 px-2 py-1"
      {...register(title)} // register를 통한 폼 관리
      value={value} // 제어된 컴포넌트로 설정
      onChange={onChange} // onChange 핸들러 추가
      {...rest}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}
