import { FaMapMarkerAlt, FaUsers, FaClipboardList } from 'react-icons/fa';
import moment from 'moment';
import { ActivityDetailResponseDto } from '../../../../../types';
import { getTypeLabel, formatTime } from '../../../../../utils';

function getFormattedTitle(date: string, type: string, title: string) {
  const formattedDate = moment(date).format('YYYY년 MM월 DD일 dddd');
  const typeLabel = getTypeLabel(type);
  return `${formattedDate} ${typeLabel} ${title}`;
}

function getFormattedApplicationPeriod(startTime: string, endTime: string) {
  return (
    formatTime({ type: 'readable', time: startTime }) +
    ' ~ ' +
    formatTime({ type: 'readable', time: endTime })
  );
}

interface InformationSectionProps {
  activity: ActivityDetailResponseDto;
  isSmallScreen: boolean;
}

export default function InformationSection({
  activity,
  isSmallScreen,
}: InformationSectionProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-xl font-bold min-[530px]:text-2xl sm:text-3xl">
          {getFormattedTitle(
            activity.scheduledDate,
            activity.type,
            activity.title,
          )}
        </h1>
      </div>

      <div className="grid grid-cols-1 gap-6 min-[1000px]:grid-cols-2">
        <div className="flex items-center space-x-3">
          <FaMapMarkerAlt className="text-xl text-blue-500" />
          <span className="text-lg font-semibold">
            장소: {activity.location}
          </span>
        </div>
        <div className="flex items-center space-x-3">
          <FaUsers className="text-xl text-purple-500" />
          <span className="text-lg font-semibold">
            참가자: {activity.participations.length}/{activity.maxParticipants}
          </span>
        </div>
        {isSmallScreen && (
          <div className="flex items-center space-x-3">
            <FaClipboardList className="text-xl text-green-500" />
            <span className="text-lg font-semibold">
              신청 기간:{' '}
              {getFormattedApplicationPeriod(
                activity.applicationStartAt,
                activity.applicationEndAt,
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
