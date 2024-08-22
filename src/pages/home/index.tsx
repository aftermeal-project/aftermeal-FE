import { useEffect, useState } from 'react';
import { GetActivitiesAPI } from '../../libs/api/activities';
import { Activity } from '../../types/activities';
import ActivityCard from '../../components/home/card';
import { ParticipationAPI } from '../../libs/api/participation';
import { AxiosError } from 'axios';
import GetActivitiesErrorScreen from '../../components/home/error';
import { getActivitiesErrorMessages } from '../../constants/messages/getActivitiesErrorMessages';

export default function HomePage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string>('');

  function handleParticipationError(error: any) {
    if (error instanceof AxiosError) {
      const { response } = error;

      if (response?.status === 400 || response?.status === 404) {
        alert('신청할 수 없는 활동입니다.');
      }
    }
  }

  function handleFetchError(error: any) {
    const { response } = error;

    if (!response) {
      setError(getActivitiesErrorMessages.NETWORK_ERROR);
    }

    if (error instanceof AxiosError) {
      if (response.status === 500) {
        setError(getActivitiesErrorMessages.SERVER_ERROR);
      } else {
        setError(getActivitiesErrorMessages.NORMAL_ERROR);
      }
    } else {
      setError(getActivitiesErrorMessages.UNKNOWN_ERROR);
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

  async function fetchActivities() {
    try {
      const response = await GetActivitiesAPI();
      setActivities(response.data);
    } catch (error: unknown) {
      handleFetchError(error);
    }
  }

  useEffect(() => {
    fetchActivities();
  }, []);

  if (error) {
    return <GetActivitiesErrorScreen message={error} />;
  }

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
            onParticipate={() => participateInActivity(String(activity.id))}
            onCancel={() => participateInActivity(String(activity.id))}
          />
        ))}
      </div>
    </main>
  );
}
