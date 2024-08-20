import { ButtonHTMLAttributes } from 'react';
import { Activity } from '../../../types/activities';

interface BaseActivityCardProps extends Omit<Activity, 'id'> {
  activityId: number;
}

type ActivityCardProps = BaseActivityCardProps &
  ButtonHTMLAttributes<HTMLButtonElement>;

export default function ActivityCard({
  activityId,
  name,
  currentParticipants,
  maxParticipants,
  ...buttonProps
}: ActivityCardProps) {
  const percentFull = (currentParticipants / maxParticipants) * 100;
  const isFull = percentFull >= 100;

  return (
    <div
      className={`overflow-hidden rounded-lg border bg-white shadow-md transition-shadow duration-300 ${
        isFull ? 'border-red-300 bg-red-50' : 'border-gray-200 bg-white'
      } `}
    >
      <div className="p-4">
        <h3 className="mb-5 text-lg font-semibold text-gray-900">{name}</h3>
        <div className="flex items-center justify-between mb-4 text-xs text-gray-600">
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
        <button
          className={`w-full py-2 text-sm font-medium ${
            isFull
              ? 'cursor-not-allowed border-gray-200 bg-gray-100 text-gray-400'
              : 'border-blue-500 bg-white text-blue-700 hover:bg-blue-50'
          } rounded-lg border transition-colors duration-300 focus:outline-none focus:ring-0 active:outline-none active:ring-0`}
          disabled={isFull}
          {...buttonProps}
        >
          {isFull ? '모집 종료' : '참가하기'}
        </button>
      </div>
    </div>
  );
}
