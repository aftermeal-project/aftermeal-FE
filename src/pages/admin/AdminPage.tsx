import { useState } from 'react';
import {
  AdminPageSidebar,
  ActivityManagementTab,
} from '../../components/ui/admin';
import { ActivityListResponseDto, Tab } from '../../types';

const activities: ActivityListResponseDto[] = [
  {
    id: 1,
    name: '축구',
    location: '운동장',
    maxParticipants: 18,
  },
  {
    id: 2,
    name: '배드민턴',
    location: '강당',
    maxParticipants: 10,
  },
  {
    id: 3,
    name: '보드게임',
    location: '상담실',
    maxParticipants: 5,
  },
  {
    id: 4,
    name: '당구',
    location: '당구장',
    maxParticipants: 4,
  },
];

export default function AdminPage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('activities');

  return (
    <div className="flex h-screen">
      <AdminPageSidebar
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
      />
      <main className="flex-1 p-6 overflow-hidden bg-gray-100">
        {selectedTab === 'activities' && (
          <ActivityManagementTab activities={activities} />
        )}
        {selectedTab === 'activity-schedules' && <></>}
        {selectedTab === 'users' && <></>}
      </main>
    </div>
  );
}
