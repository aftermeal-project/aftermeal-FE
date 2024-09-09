import React from 'react';
import { ActivityDetailResponseDto } from '../../../../types'; // 경로 맞게 수정
import { FaUsers, FaCalendarAlt, FaMapMarkerAlt, FaTag } from 'react-icons/fa';
import { format } from 'date-fns';

interface ActivityDetailProps {
  activity: ActivityDetailResponseDto;
}

export default function ActivityDetail({ activity }: ActivityDetailProps) {
  const formattedDate = (date: string) =>
    format(new Date(date), 'yyyy-MM-dd HH:mm');

  const isApplicationOpen =
    new Date() >= new Date(activity.applicationStartDate) &&
    new Date() <= new Date(activity.applicationEndDate);

  return (
    <div className="grid w-full max-w-screen-xl grid-cols-1 gap-6 px-4 py-8 mx-auto rounded-lg md:grid-cols-3">
      {/* 왼쪽: 활동 정보 */}
      <div className="p-6 bg-white rounded-md shadow-md md:col-span-2">
        {/* 제목과 상태 */}
        <div className="flex items-center justify-between mb-9">
          <h1 className="text-3xl font-bold">{activity.title}</h1>
          <span
            className={`rounded-full px-4 py-2 text-white ${
              activity.status === 'SCHEDULED'
                ? 'bg-blue-500'
                : activity.status === 'IN_PROGRESS'
                  ? 'bg-green-500'
                  : activity.status === 'CANCELED'
                    ? 'bg-red-500'
                    : 'bg-gray-500'
            }`}
          >
            {activity.status}
          </span>
        </div>

        {/* 기본 정보 */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div className="flex items-center space-x-3">
            <FaMapMarkerAlt className="text-xl" />
            <span className="text-lg">{activity.location}</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaCalendarAlt className="text-xl" />
            <span className="text-lg">
              날짜: {formattedDate(activity.scheduledDate)}
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <FaTag className="text-xl" />
            <span className="text-lg">타입: {activity.type}</span>
          </div>
          <div className="flex items-center space-x-3">
            <FaUsers className="text-xl" />
            <span className="text-lg">
              참가자: {activity.participants.length}/{activity.maxParticipants}
            </span>
          </div>
        </div>

        {/* 참가자 목록 */}
        <div className="mt-20">
          <h2 className="mb-3 text-xl font-semibold">참가자 목록</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {activity.participants.map((participant, index) => (
              <div
                key={index}
                className="flex items-center p-4 space-x-4 bg-white border rounded-lg shadow-sm"
              >
                <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full">
                  {String(participant.displayName).charAt(0)}
                </div>
                <div>
                  <p className="text-lg font-medium">
                    {participant.displayName}
                  </p>
                  <p className="text-sm text-gray-500">참여 중</p>{' '}
                  {/* 상태 표시 추가 가능 */}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 오른쪽: 신청 관련 섹션 */}
      <div className="h-80 rounded-lg bg-white p-6 shadow-md md:h-[23rem]">
        {/* 고정된 높이 */}
        <h2 className="mb-3 text-xl font-semibold">신청 정보</h2>
        <div className="flex flex-col space-y-4">
          <div>
            <FaCalendarAlt className="inline-block mr-2" />
            <span className="text-lg font-medium">신청 기간:</span>
            <div>
              {formattedDate(activity.applicationStartDate)} ~{' '}
              {formattedDate(activity.applicationEndDate)}
            </div>
          </div>
          <div>
            <FaMapMarkerAlt className="inline-block mr-2" />
            <span className="text-lg font-medium">장소:</span>{' '}
            {activity.location}
          </div>

          <div className="mt-11">
            <button
              className={`w-full rounded-md px-4 py-2 text-white ${
                isApplicationOpen
                  ? 'bg-blue-500 hover:bg-blue-600'
                  : 'cursor-not-allowed bg-gray-400'
              }`}
              disabled={!isApplicationOpen}
            >
              {isApplicationOpen ? '신청하기' : '신청 불가'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
