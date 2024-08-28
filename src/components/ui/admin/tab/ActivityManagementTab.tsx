import { Activity } from '../../../../pages/admin/AdminPage';
import ActivityManagementTable from '../table/ActivityManagementTable';

interface ActivityManagementTabProps {
  activities: Activity[];
}

export default function ActivityManagementTab({
  activities,
}: ActivityManagementTabProps) {
  function onCreateActivity() {}

  console.log(activities);

  return (
    <div className="h-full overflow-hidden">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-2xl font-bold">활동 관리</h1>
        <button
          className="rounded-md bg-green-500 px-3 py-[0.4rem] text-white"
          onClick={onCreateActivity}
        >
          활동 추가
        </button>
      </div>
      <div className="overflow-x-auto">
        <ActivityManagementTable activities={activities} />
      </div>
    </div>
  );
}
