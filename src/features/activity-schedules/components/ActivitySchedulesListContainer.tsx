import { AxiosError } from 'axios';
import { ParticipationAPI } from '../../../libs/api/participation';
import { ActivityScheduleCard } from '../../../components/ui/home';
import { ActivityScheduleListResponseDto } from '../../../types';

interface ActivitySchedulesListContainerProps {
  activitySchedules: ActivityScheduleListResponseDto[];
}

export default function ActivitySchedulesListContainer({
  activitySchedules,
}: ActivitySchedulesListContainerProps) {
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
      {activitySchedules.map(schedule => (
        <ActivityScheduleCard
          key={schedule.id}
          id={schedule.id}
          title={schedule.title}
          maxParticipants={schedule.maxParticipants}
          currentParticipants={schedule.currentParticipants}
          status={schedule.status}
          type={schedule.type}
          scheduledDate={schedule.scheduledDate}
          applicationStartDate={schedule.applicationStartDate}
          applicationEndDate={schedule.applicationEndDate}
          onParticipate={() => participateInActivity(String(schedule.id))}
          onCancel={() => participateInActivity(String(schedule.id))}
        />
      ))}
    </>
  );
}
