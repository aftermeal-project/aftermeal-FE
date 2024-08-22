import { useEffect, useState } from 'react';
import { GetActivitiesAPI } from '../../libs/api/activities';
import { Activity } from '../../types/activities';
import ActivityCard from '../../components/home/card';
import { ParticipationAPI } from '../../libs/api/participation';
import { AxiosError } from 'axios';

export default function HomePage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<boolean>(false);

  async function fetchActivities() {
    try {
      const response = await GetActivitiesAPI();
      setActivities(response.data);
    } catch {
      setError(true);
    }
  }

  function handleParticipationError(error: unknown) {
    if (error instanceof AxiosError) {
      const code = error.response?.status;

      if (code === 400 || code === 404) {
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

  useEffect(() => {
    fetchActivities();
  }, []);

  return (
    <main className="w-full px-4 py-8">
      <div className="grid max-w-screen-xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {activities.map(activity => (
          <ActivityCard
            key={activity.id}
            activityId={activity.id}
            name={activity.name}
            currentParticipants={activity.currentParticipants}
            maxParticipants={activity.maxParticipants}
            onClick={() => participateInActivity(String(activity.id))}
          />
        ))}
      </div>
    </main>
  );
}
