import { ActivityDetailResponseDto } from '../../../../types';
import {
  FaUsers,
  FaMapMarkerAlt,
  FaClipboardList,
  FaArrowDown,
} from 'react-icons/fa';
import { Button } from '../../../../components';
import {
  statusOptions,
  typeOptions,
} from '../../../activities/constants/options';
import { formatTime } from '../../../../utils';
import moment from 'moment';
import 'moment/locale/ko';
import { useRef, useState, useEffect } from 'react';

interface ActivityDetailProps {
  activity: ActivityDetailResponseDto;
  isAdmin: boolean;
}

function isApplicationAllowed(
  status: string,
  participantsCount: number,
  maxParticipants: number,
  applicationEndDate: string,
  applicationStartDate: string,
) {
  const isStatusValid = status === 'SCHEDULED';
  const hasSpaceAvailable = participantsCount < maxParticipants;
  const isWithinApplicationPeriod =
    new Date() >= new Date(applicationStartDate) &&
    new Date() <= new Date(applicationEndDate);

  return isStatusValid && hasSpaceAvailable && isWithinApplicationPeriod;
}

export default function ActivityDetail({
  activity,
  isAdmin,
}: ActivityDetailProps) {
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  const getStatusLabel = (status: string) => {
    const statusOption = statusOptions.find(option => option.value === status);
    return statusOption ? statusOption.label : status;
  };

  const getTypeLabel = (type: string) => {
    const typeOption = typeOptions.find(option => option.value === type);
    return typeOption ? typeOption.label : type;
  };

  const getFormattedTitle = (date: string, type: string, title: string) => {
    const formattedDate = moment(date).format('YYYY년 MM월 DD일 dddd');
    const typeLabel = getTypeLabel(type);
    return `${formattedDate} ${typeLabel} ${title}`;
  };

  const getFormattedApplicationPeriod = (
    startTime: string,
    endTime: string,
  ) => {
    return (
      formatTime({ type: 'readable', time: startTime }) +
      ' ~ ' +
      formatTime({ type: 'readable', time: endTime })
    );
  };

  const scrollToBottom = () => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const screenWidth = window.innerWidth;

      setIsVisible(screenWidth <= 1000 && scrollTop < 100);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleScroll);

    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  return (
    <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 gap-x-4 gap-y-6 rounded-lg px-4 py-8 max-[1000px]:gap-x-0 max-[1000px]:gap-y-6 min-[1000px]:grid-cols-3">
      <div className="space-y-4 md:col-span-2">
        <div className="p-6 bg-white rounded-lg shadow-md">
          <div className="flex items-center justify-between mb-10">
            <h1 className="text-xl font-bold min-[530px]:text-2xl sm:text-3xl">
              {getFormattedTitle(
                activity.scheduledDate,
                activity.type,
                activity.title,
              )}
            </h1>
            <span
              className={`rounded-full px-2 py-2 text-sm font-bold min-[530px]:px-4 ${
                activity.status === 'SCHEDULED'
                  ? 'bg-blue-100 text-blue-800'
                  : activity.status === 'IN_PROGRESS'
                    ? 'bg-green-100 text-green-800'
                    : activity.status === 'CANCELED'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-gray-100 text-gray-800'
              }`}
            >
              {getStatusLabel(activity.status)}
            </span>
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
                참가자: {activity.participants.length}/
                {activity.maxParticipants}
              </span>
            </div>
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">참가자 목록</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activity.participants.map((participant, index) => (
              <div
                key={index}
                className="flex items-center p-4 space-x-4 border rounded-lg shadow-sm bg-gray-50"
              >
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 text-white bg-indigo-200 rounded-full">
                  {String(participant.displayName).charAt(0)}
                </div>
                <p className="text-lg font-medium">{participant.displayName}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div
        className={`w-full rounded-lg bg-white p-6 shadow-md ${
          isAdmin ? 'h-96 md:h-[25rem]' : 'md:h-[21rem]'
        }`}
      >
        <h2 className="mb-8 text-2xl font-semibold">신청 정보</h2>
        <div className="flex flex-col">
          <div>
            <div className="flex items-center">
              <FaMapMarkerAlt className="inline-block mr-2 text-red-500" />
              <span className="text-lg font-semibold">장소</span>
            </div>

            <div className="text-gray-700">{activity.location}</div>
          </div>
          <div className="mt-6">
            <div className="flex items-center">
              <FaClipboardList className="inline-block mr-2 text-blue-500" />
              <span className="text-lg font-semibold">신청 기간:</span>
            </div>
            <div className="font-semibold text-gray-700">
              {getFormattedApplicationPeriod(
                activity.applicationStartDate,
                activity.applicationEndDate,
              )}
            </div>
          </div>

          <div className="mt-14">
            {isApplicationAllowed(
              activity.status,
              activity.participants.length,
              activity.maxParticipants,
              activity.applicationEndDate,
              activity.applicationStartDate,
            ) ? (
              <Button fullWidth>신청하기</Button>
            ) : (
              <Button variant="secondary" fullWidth>
                신청마감
              </Button>
            )}
          </div>

          {isAdmin && (
            <div className="flex items-center justify-center mt-4 gap-x-4">
              <Button variant="yellow" fullWidth>
                수정하기
              </Button>
              <Button variant="danger" fullWidth>
                삭제하기
              </Button>
            </div>
          )}
        </div>
      </div>

      {isVisible && (
        <div className="fixed z-50 bottom-4 right-4">
          <Button
            variant="primary"
            onClick={scrollToBottom}
            className="flex items-center space-x-1 rounded-full"
          >
            <FaArrowDown className="text-lg" />
            <span>신청으로 이동</span>
          </Button>
        </div>
      )}
      <div ref={bottomRef} />
    </div>
  );
}
