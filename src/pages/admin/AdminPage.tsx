import { useState } from 'react';
import {
  AdminPageSidebar,
  ActivityManagement,
} from '../../components/ui/admin';

interface Activity {
  id: number;
  name: string;
  participants: number;
  maxParticipants: number;
  status: 'planned' | 'ongoing' | 'completed';
}

const activities: Activity[] = [
  {
    id: 1,
    name: '축구',
    participants: 20,
    maxParticipants: 30,
    status: 'ongoing',
  },
  {
    id: 2,
    name: '게임',
    participants: 15,
    maxParticipants: 20,
    status: 'planned',
  },
  {
    id: 3,
    name: '농구',
    participants: 10,
    maxParticipants: 15,
    status: 'completed',
  },
];

export type Tab = 'activities' | 'users' | 'participants';

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('activities');

  return (
    <div className="flex h-screen">
      <AdminPageSidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <main className="flex-1 bg-gray-100 p-6">
        {selectedTab === 'activities' && (
          <ActivityManagement activities={activities} />
        )}
        {selectedTab === 'users' && <></>}
        {selectedTab === 'participants' && <></>}
      </main>
    </div>
  );
}
