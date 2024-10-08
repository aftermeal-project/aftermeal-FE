import { ActivityListResponseDto } from '../../../../../types';
import moment from 'moment';
import 'moment/locale/ko';
import { useState } from 'react';
import ListTab from '../../tab/ListTab';
import { Activity } from '../item';
import NoActivity from './NoActivity';
import { getTypeLabel } from '../../../../../utils';
interface ActivityListContainerProps {
  activities: ActivityListResponseDto[] | null;
}

export default function ActivityListContainer({
  activities,
}: ActivityListContainerProps) {
  const getToday = () => {
    return moment().format('YYYY년 MM월 DD일 dddd');
  };
  const getCurrentHour = () => {
    const currentHour = moment().hour();
    return currentHour <= 13 ? 'LUNCH' : 'DINNER';
  };

  const [selectedTab, setSelectedTab] = useState<string>(getCurrentHour);

  const filteredActivities = Array.isArray(activities)
    ? activities.filter(activity => activity.type === selectedTab)
    : [];

  return (
    <section>
      <div className="mb-9 mt-5 flex items-center justify-between">
        <div className="w-fit rounded-md bg-green-400 p-2">
          <h1 className="text-[19px] font-bold tracking-tighter text-white">
            {getToday()}
          </h1>
        </div>
        <ListTab selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </div>
      {Array.isArray(activities) && activities.length > 0 ? (
        <>
          {filteredActivities.length > 0 ? (
            <>
              {filteredActivities.map(activity => (
                <Activity
                  key={activity.id}
                  id={activity.id}
                  title={activity.title}
                  type={activity.type}
                  location={String(activity.location)}
                  status={activity.status}
                  maxParticipants={activity.maxParticipants}
                  currentParticipants={activity.currentParticipants}
                />
              ))}
            </>
          ) : (
            <NoActivity text={'오늘 ' + getTypeLabel(selectedTab) + '은'} />
          )}
        </>
      ) : (
        <NoActivity text={'오늘은'} />
      )}
    </section>
  );
}
