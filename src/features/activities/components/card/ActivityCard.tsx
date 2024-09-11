import { ButtonHTMLAttributes } from 'react';
import { ActivityResponseDto } from '../../../../types';
import { useNavigate } from 'react-router-dom';

interface BaseActivityCardProps extends ActivityResponseDto {}
type ActivityCardProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  'id' | 'type'
> &
  BaseActivityCardProps;

export default function ActivityCard({
  id,
  title,
  maxParticipants,
  currentParticipants,
  status,
  type,
  scheduledDate,
  applicationStartDate,
  applicationEndDate,
  ...buttonProps
}: ActivityCardProps) {
  const navigate = useNavigate();
  const percentFull = (currentParticipants / maxParticipants) * 100;
  const isFull = percentFull >= 100;

  const handleJoin = () => {
    if (isFull) {
      return;
    }

    navigate('/activity/' + id);
  };

  return (
    <div
      onClick={handleJoin}
      className={`cursor-pointer overflow-hidden rounded-lg border bg-white shadow-md transition-shadow duration-300 ${
        isFull ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
      } hover:border-gray-400 hover:shadow-lg`}
    >
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-900 mb-7">{title}</h3>
        <div className="flex items-center justify-between mb-2 text-xs text-gray-600">
          <span>
            참여 현황: {currentParticipants} / {maxParticipants}
          </span>
          <svg
            className={`h-5 w-5 ${isFull ? 'text-red-500' : 'text-gray-500'}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 12h14M12 5l7 7-7 7"
            ></path>
          </svg>
        </div>
        <div className="relative w-full h-2 mb-2 bg-gray-200 rounded-full">
          <div
            className={`absolute left-0 top-0 h-2 rounded-full ${
              isFull ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{
              width: `${Math.min((currentParticipants / maxParticipants) * 100, 100)}%`,
            }}
          ></div>
        </div>
      </div>
    </div>
  );
}
