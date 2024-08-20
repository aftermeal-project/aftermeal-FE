import { useEffect, useState } from 'react';
import { GetActivitiesAPI } from '../../libs/api/activities';
import { Activity } from '../../types/activities';
import ActivityCard from '../../components/home/card';

export default function HomePage() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    const getActivities = async () => {
      try {
        const response = await GetActivitiesAPI();
        setActivities(response.data);
      } catch {
        throw new Error('Failed to get activities data');
      }
    };

    getActivities();
  }, []);
  return (
    <main className="w-full px-4 py-8">
      <div className="grid max-w-screen-xl grid-cols-1 gap-6 mx-auto sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {activities.map(activity => (
          <ActivityCard
            key={activity.id}
            id={activity.id}
            name={activity.name}
            currentParticipants={activity.currentParticipants}
            maxParticipants={activity.maxParticipants}
          />
        ))}
      </div>
    </main>
  );
}
