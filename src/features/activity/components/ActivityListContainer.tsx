import { AxiosError } from 'axios';
import { ParticipationAPI } from '../../../libs/api/participation';
import { Activity } from '../../../types/activities';
import { ActivityCard } from '../../../components/ui/home';

interface ActivityListContainerProps {
  activities: Activity[];
}

export default function ActivityListContainer({
  activities,
}: ActivityListContainerProps) {
  function handleParticipationError(error: any) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response?.status === 400 || response?.status === 404) {
        alert('신청할 수 없는 활동입니다.');
      }
    }
  }

  async function participateInActivity(id: string) {
    try {
      await ParticipationAPI(id);
      alert('참여가 완료 되었습니다.');
    } catch (error: unknown) {
      handleParticipationError(error);
    }
  }

  return (
    <>
      {activities.map(activity => (
        <ActivityCard
          key={activity.id}
          activityId={activity.id}
          name={activity.name}
          currentParticipants={activity.currentParticipants}
          maxParticipants={activity.maxParticipants}
          onParticipate={() => participateInActivity(String(activity.id))}
          onCancel={() => participateInActivity(String(activity.id))}
        />
      ))}
    </>
  );
}
