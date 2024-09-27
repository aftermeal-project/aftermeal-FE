import { FaSun, FaMoon } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import {
  ActivityListResponseDtoType,
  ActivityListResponseDtoStatus,
} from '../../../../../types';
import { getTypeLabel } from '../../../../../utils';
import { Button } from '../../../../../components';

interface ListItemProps {
  id: number;
  title: string;
  type: ActivityListResponseDtoType;
  location: string;
  status: ActivityListResponseDtoStatus;
  currentParticipants: number;
  maxParticipants: number;
}

export default function ListItem({
  id,
  title,
  type,
  location,
  status,
  currentParticipants,
  maxParticipants,
}: ListItemProps) {
  const navigate = useNavigate();

  const getStatusButton = () => {
    switch (status) {
      case 'SCHEDULED':
        return (
          <Button size="small" className="pointer-events-none">
            신청 가능
          </Button>
        );

      default:
        return (
          <Button
            variant="secondary"
            size="small"
            className="pointer-events-none"
          >
            신청 마감
          </Button>
        );
    }
  };

  const handleActivityClick = (activityId: number) => {
    navigate('/activity/' + activityId);
  };

  return (
    <div
      onClick={() => handleActivityClick(id)}
      className="flex cursor-pointer items-center justify-between divide-y divide-gray-200 border-b border-gray-200 px-1 py-3"
    >
      <div className="flex items-center space-x-9">
        <div className="flex items-center gap-x-2">
          {getTypeLabel(type) === '점심' ? (
            <>
              <FaSun className="text-yellow-500" />
              <p>점심</p>
            </>
          ) : (
            <>
              <FaMoon className="text-blue-600" />
              <p>저녁</p>
            </>
          )}
        </div>

        <div className="space-y-1">
          <div className="text-[15px] font-bold text-gray-800">{title}</div>
          <div className="flex items-center gap-x-2 text-[11px]">
            <div className="flex items-center gap-x-2 rounded-md bg-[#dbecf5] p-1">
              <span className="h-2.5 w-2.5 rounded-full bg-yellow-400"></span>
              <div className="bg-[#dbecf5] text-[#1570ff]">{location}</div>
            </div>
            <div className="flex items-center gap-x-2 rounded-md bg-[#f3e5f5] p-1">
              <span className="h-2.5 w-2.5 rounded-full bg-purple-500"></span>
              <div className="flex text-purple-700">
                <p className="tracking-wider">
                  {currentParticipants + '/' + maxParticipants}
                </p>
                <p>명 참여 중</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {getStatusButton()}
    </div>
  );
}
