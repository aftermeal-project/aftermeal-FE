import {
  ActivityListResponseDto,
  ActivityListResponseDtoStatus,
} from '../../../../../types';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from 'react-icons/fa';
import { formatTime, getStatusLabel, getTypeLabel } from '../../../../../utils';

interface BodyCellProps {
  title: keyof ActivityListResponseDto;
  value: string | number;
}

export default function BodyCell({ title, value }: BodyCellProps) {
  let icon = null;
  let className = 'flex items-center text-gray-800';

  const formattingValue = (title: keyof ActivityListResponseDto): string => {
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
      case ActivityListResponseDtoStatus.Scheduled:
        className += ' text-gray-400 font-bold';
        icon = <FaHourglassHalf className="mr-2 inline-block" />;
        break;
      case ActivityListResponseDtoStatus.InProgress:
        className += ' text-yellow-500 font-bold';
        icon = <FaExclamationCircle className="mr-2 inline-block" />;
        break;
      case ActivityListResponseDtoStatus.Canceled:
        className += ' text-red-500 font-bold';
        icon = <FaTimesCircle className="mr-2 inline-block" />;
        break;
      case ActivityListResponseDtoStatus.Completed:
        className += ' text-green-500 font-bold';
        icon = <FaCheckCircle className="mr-2 inline-block" />;
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
