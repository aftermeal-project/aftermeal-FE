import { ButtonHTMLAttributes } from 'react';
import { Activity } from '../../../types/activities';

interface BaseActivityCardProps extends Omit<Activity, 'id'> {
  activityId: number;
  onParticipate: (id: number) => void;
  onCancel: (id: number) => void;
}

type ActivityCardProps = BaseActivityCardProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function ActivityCard({
  activityId,
  name,
  currentParticipants,
  maxParticipants,
  onParticipate,
  onCancel,
  ...buttonProps
}: ActivityCardProps) {
  const percentFull = (currentParticipants / maxParticipants) * 100;
  const isFull = percentFull >= 100;
  const isParticipated = currentParticipants > 0; // 임시로 지정

  const handleClick = () => {
    if (isFull) {
      return;
    }

    if (isParticipated) {
      onCancel(activityId);
    } else {
      onParticipate(activityId);
    }
  };

  return (
    <div
      className={`overflow-hidden rounded-lg border bg-white shadow-md transition-shadow duration-300 ${
        isFull ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
      } `}
    >
      <div className="p-4">
        <h3 className="mb-5 text-lg font-semibold text-gray-900">{name}</h3>
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
        <div className="relative w-full h-2 mb-3 bg-gray-200 rounded-full">
          <div
            className={`absolute left-0 top-0 h-2 rounded-full ${
              isFull ? 'bg-red-500' : 'bg-blue-500'
            }`}
            style={{
              width: `${Math.min((currentParticipants / maxParticipants) * 100, 100)}%`,
            }}
          ></div>
        </div>
        <button
          className={`w-full rounded-lg border py-2 text-sm font-medium transition-colors duration-300 focus:outline-none focus:ring-0 active:outline-none active:ring-0 ${
            isFull
              ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
              : isParticipated
                ? 'border-red-500 bg-white text-red-700 hover:bg-red-50'
                : 'border-blue-500 bg-white text-blue-700 hover:bg-blue-50'
          }`}
          disabled={isFull}
          onClick={handleClick}
          {...buttonProps}
        >
          {isFull ? '모집 종료' : isParticipated ? '신청 취소' : '참가하기'}
        </button>
      </div>
    </div>
  );
}
