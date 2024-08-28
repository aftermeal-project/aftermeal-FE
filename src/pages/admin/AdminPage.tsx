import { useState } from 'react';
import {
  AdminPageSidebar,
  ActivityManagementTab,
} from '../../components/ui/admin';

type Activity = {
  id: number;
  name: string;
  location: string;
  participants: number;
  maxParticipants: number;
  status: 'planned' | 'ongoing' | 'completed';
};

const activities: Activity[] = [
  {
    id: 1,
    name: '축구',
    location: '운동장',
    participants: 10,
    maxParticipants: 18,
    status: 'planned',
  },
  {
    id: 2,
    name: '배드민턴',
    location: '강당',
    participants: 8,
    maxParticipants: 10,
    status: 'ongoing',
  },
  {
    id: 3,
    name: '보드게임',
    location: '상담실',
    participants: 5,
    maxParticipants: 5,
    status: 'completed',
  },
  {
    id: 4,
    name: '당구',
    location: '당구장',
    participants: 3,
    maxParticipants: 4,
    status: 'ongoing',
  },
];

export type Tab = 'activity' | 'activity-schedules' | 'users';

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('activity');

  return (
    <div className="flex h-screen">
      <AdminPageSidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <main className="flex-1 overflow-hidden bg-gray-100 p-6">
        {selectedTab === 'activity' && (
          <ActivityManagementTab activities={activities} />
        )}
        {selectedTab === 'activity-schedules' && <></>}
        {selectedTab === 'users' && <></>}
      </main>
    </div>
  );
}
