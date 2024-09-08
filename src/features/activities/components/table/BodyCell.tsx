import {
  ActivityResponseDto,
  ActivityResponseDtoStatus,
  ActivityResponseDtoType,
} from '../../../../types';
import {
  FaCheckCircle,
  FaExclamationCircle,
  FaHourglassHalf,
  FaTimesCircle,
} from 'react-icons/fa';
import { formatTime } from '../../../../utils';

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
      let formatStatueValue = '';

      switch (value) {
        case ActivityResponseDtoStatus.Scheduled:
          formatStatueValue = '예정됨';
          break;
        case ActivityResponseDtoStatus.InProgress:
          formatStatueValue = '진행 중';
          break;
        case ActivityResponseDtoStatus.Canceled:
          formatStatueValue = '취소됨';
          break;
        case ActivityResponseDtoStatus.Completed:
          formatStatueValue = '완료됨';
          break;
        default:
          value as string;
      }

      return formatStatueValue;
    }

    if (title === 'type') {
      let formatTypeValue = '';

      switch (value) {
        case ActivityResponseDtoType.Lunch:
          formatTypeValue = '점심 활동';
          break;
        case ActivityResponseDtoType.Dinner:
          formatTypeValue = '저녁 활동';
          break;
        default:
          value as string;
      }

      return formatTypeValue;
    }

    return value as string;
  };

  if (title === 'status') {
    switch (value) {
      case ActivityResponseDtoStatus.Scheduled:
        className += ' text-blue-500 font-bold';
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
