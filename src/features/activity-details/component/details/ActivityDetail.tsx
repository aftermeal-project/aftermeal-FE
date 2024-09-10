import { ActivityDetailResponseDto } from '../../../../types';
import { FaUsers, FaMapMarkerAlt, FaClipboardList } from 'react-icons/fa';
import { Button } from '../../../../components';
import {
  statusOptions,
  typeOptions,
} from '../../../activities/constants/options';
import { formatTime } from '../../../../utils';
import moment from 'moment';
import 'moment/locale/ko';
import { useState, useEffect } from 'react';

interface ActivityDetailProps {
  activity: ActivityDetailResponseDto;
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

function getStatusLabel(status: string) {
  const statusOption = statusOptions.find(option => option.value === status);
  return statusOption ? statusOption.label : status;
}

function getTypeLabel(type: string) {
  const typeOption = typeOptions.find(option => option.value === type);
  return typeOption ? typeOption.label : type;
}

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

export default function ActivityDetail({ activity }: ActivityDetailProps) {
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth <= 1000);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="mx-auto grid w-full max-w-screen-xl grid-cols-1 rounded-lg max-[1000px]:mb-[5.5rem] min-[1000px]:grid-cols-3 min-[1000px]:gap-x-4 min-[1000px]:px-4 min-[1000px]:py-8">
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
            {isSmallScreen && (
              <div className="flex items-center space-x-3">
                <FaClipboardList className="text-xl text-green-500" />
                <span className="text-lg font-semibold">
                  신청 기간:{' '}
                  {getFormattedApplicationPeriod(
                    activity.applicationStartDate,
                    activity.applicationEndDate,
                  )}
                </span>
              </div>
            )}
          </div>
        </div>

        <div className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="mb-4 text-2xl font-semibold">참가자 목록</h2>
          <div className="grid grid-cols-1 gap-4 min-[1000px]:grid-cols-2 lg:grid-cols-3">
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

      {!isSmallScreen && (
        <div className="w-full rounded-lg bg-white p-6 shadow-md md:h-[21rem]">
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
                <Button
                  variant="secondary"
                  fullWidth
                  disabled={true}
                  className="cursor-not-allowed"
                >
                  신청마감
                </Button>
              )}
            </div>
          </div>
        </div>
      )}

      {isSmallScreen && (
        <div className="fixed bottom-0 left-0 w-full p-4 bg-white shadow-md">
          {isApplicationAllowed(
            activity.status,
            activity.participants.length,
            activity.maxParticipants,
            activity.applicationEndDate,
            activity.applicationStartDate,
          ) ? (
            <div className="flex items-center justify-between w-full font-semibold">
              <p>지금 신청하시면 참여하실 수 있습니다!</p>
              <Button className="px-8">신청하기</Button>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full font-semibold">
              <p>신청이 마감되었어요.</p>
              <Button
                variant="secondary"
                disabled={true}
                className="px-8 cursor-not-allowed"
              >
                신청마감
              </Button>{' '}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
