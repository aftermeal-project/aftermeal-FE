import { AxiosError } from 'axios';
import { ParticipationAPI } from '../../../../libs/api/participation';
import { ActivityResponseDto } from '../../../../types';
import { ActivityCard } from '..';

interface ActivityListContainerProps {
  activities: ActivityResponseDto[];
}

export default function ActivityListContainer({
  activities,
}: ActivityListContainerProps) {
  const handleParticipationError = (error: any) => {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response?.status === 400 || response?.status === 404) {
        alert('신청할 수 없는 활동입니다.');
      }
    }
  };

  const handleParticipateInActivity = async (id: string) => {
    try {
      await ParticipationAPI(id);
      alert('참여가 완료 되었습니다.');
    } catch (error: unknown) {
      handleParticipationError(error);
    }
  };

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
          onParticipate={() => handleParticipateInActivity(String(activity.id))}
          onCancel={() => handleParticipateInActivity(String(activity.id))}
        />
      ))}
    </>
  );
}
