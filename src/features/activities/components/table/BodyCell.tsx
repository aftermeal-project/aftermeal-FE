import {
  ActivityResponseDto,
  ActivityResponseDtoStatus,
} from '../../../../types';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from 'react-icons/fa';
import { formatTime, getStatusLabel, getTypeLabel } from '../../../../utils';

interface BodyCellProps {
  title: keyof ActivityResponseDto;
  value: string | number;
}

export default function BodyCell({ title, value }: BodyCellProps) {
  let icon = null;
  let className = 'flex items-center text-gray-800';

  const formattingValue = (title: keyof ActivityResponseDto): string => {
    if (title === 'applicationStartDate' || title === 'applicationEndDate') {
      return formatTime({ type: 'readable', time: value as string });
    }

    if (title === 'status') {
      return getStatusLabel(value as string);
    }

    if (title === 'type') {
      return getTypeLabel(value as string) + ' 활동';
    }

    return value as string;
  };

  if (title === 'status') {
    switch (value) {
      case ActivityResponseDtoStatus.Scheduled:
        className += ' text-gray-400 font-bold';
        icon = <FaHourglassHalf className="inline-block mr-2" />;
        break;
      case ActivityResponseDtoStatus.InProgress:
        className += ' text-yellow-500 font-bold';
        icon = <FaExclamationCircle className="inline-block mr-2" />;
        break;
      case ActivityResponseDtoStatus.Canceled:
        className += ' text-red-500 font-bold';
        icon = <FaTimesCircle className="inline-block mr-2" />;
        break;
      case ActivityResponseDtoStatus.Completed:
        className += ' text-green-500 font-bold';
        icon = <FaCheckCircle className="inline-block mr-2" />;
        break;
      default:
        className += ' text-gray-800';
    }
  }

  return (
    <span
      className={`${className} ${title === 'title' ? 'font-bold' : ''} ${title === 'maxParticipants' ? 'font-bold' : ''}`}
    >
      {icon && icon}
      <span>{formattingValue(title)}</span>
    </span>
  );
}
