import { ActivityListResponseDto } from '../../../../../types';
import moment from 'moment';
import 'moment/locale/ko';
import ListTab from '../../tab/ListTab';
import { Activity } from '../item';
import NoActivity from './NoActivity';
import { getTypeLabel } from '../../../../../utils';
import { useRecoilValue } from 'recoil';
import { CurrentActivityTypeAtom } from '../../../../../atoms';
interface ActivityListContainerProps {
  activities: ActivityListResponseDto[] | null;
}

export default function ActivityListContainer({
  activities,
}: ActivityListContainerProps) {
  const currentActivityType = useRecoilValue(CurrentActivityTypeAtom);

  const getToday = () => {
    return moment().format('YYYY년 MM월 DD일 dddd');
  };

  return (
    <section>
      <div className="mb-9 mt-5 flex items-center justify-between">
        <div className="w-fit rounded-md bg-green-400 p-2">
          <h1 className="text-[19px] font-bold tracking-tighter text-white">
            {getToday()}
          </h1>
        </div>
        <ListTab />
      </div>
      {Array.isArray(activities) && (
        <>
          {activities.length > 0 ? (
            <>
              {activities.map(activity => (
                <Activity
                  key={activity.id}
                  id={activity.id}
                  title={activity.title}
                  type={activity.type}
                  location={String(activity.location)}
                  maxParticipants={activity.maxParticipants}
                  currentParticipants={activity.currentParticipants}
                />
              ))}
            </>
          ) : (
            <NoActivity
              text={'오늘 ' + getTypeLabel(currentActivityType) + '은'}
            />
          )}
        </>
      )}
    </section>
  );
}
