import { useEffect, useState } from 'react';
import { GetActivitiesAPI } from '../../libs/api/activities';
import { Activity } from '../../types/activities';
import ActivityCard from '../../components/home/card';
import { ParticipationAPI } from '../../libs/api/participation';
import { AxiosError } from 'axios';
import { getActivitiesErrorMessages } from '../../constants/messages/getActivitiesErrorMessages';
import ErrorScreen from '../../components/@global/error';
import SkeletonActivityCard from '../../components/home/card/skeleton';

export default function HomePage() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState(true);

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
      return;
    }

    if (error instanceof AxiosError) {
      // interceptor에서 기본적으로 handling 되지만, UI 처리를 위해 중복적으로 handling
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

  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await GetActivitiesAPI();
        setActivities(response.data);
      } catch (error: unknown) {
        handleFetchError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchActivities();
  }, []);

  if (error) {
    return <ErrorScreen title={'Oops!'} description={error} />;
  }

  return (
    <main className="w-full px-4 py-8">
      <div className="grid max-w-screen-xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <SkeletonActivityCard key={index} />
            ))
          : activities.map(activity => (
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
