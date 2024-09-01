import { AxiosError } from 'axios';
import { ParticipationAPI } from '../../../libs/api/participation';
import { ActivityListResponseDto } from '../../../types';
import ActivityCard from './ActivityCard';

interface ActivityListContainerProps {
  activities: ActivityListResponseDto[];
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
          id={activity.id}
          title={activity.title}
          maxParticipants={activity.maxParticipants}
          currentParticipants={activity.currentParticipants}
          location={activity.location}
          status={activity.status}
          type={activity.type}
          scheduledDate={activity.scheduledDate}
          applicationStartDate={activity.applicationStartDate}
          applicationEndDate={activity.applicationEndDate}
          onParticipate={() => participateInActivity(String(activity.id))}
          onCancel={() => participateInActivity(String(activity.id))}
        />
      ))}
    </>
  );
}
