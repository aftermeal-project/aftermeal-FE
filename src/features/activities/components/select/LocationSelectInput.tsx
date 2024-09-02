import { errorMessages } from '../../../../constants';
import SelectInput from './SelectInput';
import useGetActivityLocation from '../../../activity-locations/api/get-activity-locations';

interface LocationSelectInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  className?: string;
}

export default function LocationSelectInput({
  value,
  onChange,
  className,
}: LocationSelectInputProps) {
  const { data, error } = useGetActivityLocation();

  if (error) {
    alert(errorMessages.UNKNOWN_ERROR);
  }

  const options = data?.map(location => ({
    value: location.id.toString(),
    label: location.name,
  }));

  return (
    <SelectInput
      value={value}
      onChange={onChange}
      options={options || []}
      className={className}
    />
  );
}
