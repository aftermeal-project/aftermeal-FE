import { ActivityDetailResponseDto } from '../../../../../types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { Button } from '../../../../../components';
import moment from 'moment';
import {
  formatDate,
  formatTime,
  getStatusLabel,
  getTypeLabel,
} from '../../../../../utils';
import { User } from '../../../../users';

interface AdminActivityDetailsPageProps {
  activity: ActivityDetailResponseDto;
}

export default function AdminActivityDetailsPage({
  activity,
}: AdminActivityDetailsPageProps) {
  function getFormattedTitle(date: string, type: string, title: string) {
    const formattedDate = moment(date).format('YYYY년 MM월 DD일 dddd');
    const typeLabel = getTypeLabel(type);
    return `${formattedDate} ${typeLabel} ${title}`;
  }

  return (
    <div
      className="mx-auto min-h-screen w-full max-w-[1000px] rounded-lg bg-white p-6 shadow-lg"
      onClick={e => e.stopPropagation()}
    >
      <div className="flex items-center justify-between mb-9">
        <h2 className="text-3xl font-bold text-gray-800">
          {getFormattedTitle(
            activity.scheduledDate,
            activity.type,
            activity.title,
          )}
        </h2>
        <div className="flex gap-x-4">
          <Button type="button" variant="primary">
            수정
          </Button>
          <Button type="button" variant="danger">
            삭제
          </Button>
        </div>
      </div>

      <Tabs>
        <TabList className="border-b border-gray-300 gap-x-2">
          <Tab>기본 정보</Tab>
          <Tab>일정 정보</Tab>
        </TabList>

        <TabPanel className="p-2 mt-4">
          <div className="grid grid-cols-1 gap-y-2">
            <div className="bg-white rounded-lg">
              <p className="font-semibold">활동명</p>
              <span className="text-gray-700">{activity.title}</span>
              <hr className="my-2" />
            </div>
            <div className="bg-white rounded-lg">
              <p className="font-semibold">장소</p>
              <span className="text-gray-700">{activity.location}</span>
              <hr className="my-2" />
            </div>
            <div className="bg-white rounded-lg">
              <p className="font-semibold">활동 유형</p>
              <span className="text-gray-700">
                {getTypeLabel(activity.type)}
              </span>
              <hr className="my-2" />
            </div>
            <div className="bg-white rounded-lg">
              <p className="font-semibold">진행 상태</p>
              <span className="text-gray-700">
                {getStatusLabel(activity.status)}
              </span>
              <hr className="my-2" />
            </div>
            <div className="bg-white rounded-lg">
              <p className="font-semibold">최대 참가자</p>
              <span className="text-gray-700">{activity.maxParticipants}</span>
            </div>
          </div>

          <div className="mt-8">
            <p className="mb-2 font-bold">참가자 목록</p>
            <hr />
            {activity.participations.map(item => (
              <User
                key={item.id}
                user={item.user}
                onDelete={() => console.log('d')}
              />
            ))}
          </div>
        </TabPanel>

        <TabPanel className="p-2">
          <div className="grid grid-cols-1 gap-y-2">
            <div className="bg-white rounded-lg">
              <p className="font-semibold">일정</p>
              <span className="text-gray-700">
                {formatDate(activity.scheduledDate)}
              </span>
              <hr className="my-2" />
            </div>
            <div className="bg-white rounded-lg">
              <p className="font-semibold">신청 시작 시간</p>
              <span className="text-gray-700">
                {formatTime({
                  type: 'readable',
                  time: activity.applicationStartDate,
                })}
              </span>
              <hr className="my-2" />
            </div>
            <div className="bg-white rounded-lg">
              <p className="font-semibold">신청 마감 시간</p>
              <span className="text-gray-700">
                {formatTime({
                  type: 'readable',
                  time: activity.applicationEndDate,
                })}
              </span>
            </div>
          </div>
        </TabPanel>
      </Tabs>
    </div>
  );
}
