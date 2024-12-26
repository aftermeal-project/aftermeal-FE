import { ActivityListResponseDto } from '../../../../../types';
import { formatTime, getTypeLabel } from '../../../../../utils';

interface BodyCellProps {
  title: keyof ActivityListResponseDto;
  value: string | number;
}

export default function BodyCell({ title, value }: BodyCellProps) {
  let icon = null;
  let className = 'flex items-center text-gray-800';

  const formattingValue = (title: keyof ActivityListResponseDto): string => {
    if (title === 'applicationStartAt' || title === 'applicationEndAt') {
      return formatTime({ type: 'readable', time: value as string });
    }

    if (title === 'type') {
      return getTypeLabel(value as string) + ' 활동';
    }

    return value as string;
  };

  return (
    <span
      className={`${className} ${title === 'title' ? 'font-bold' : ''} ${title === 'maxParticipants' ? 'font-bold' : ''}`}
    >
      {icon && icon}
      <span>{formattingValue(title)}</span>
    </span>
  );
}
