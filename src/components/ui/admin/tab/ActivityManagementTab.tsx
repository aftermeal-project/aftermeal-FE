import { ActivityListResponseDto } from '../../../../types';
import { TableHeader, TableBody } from '../table';

interface ActivityManagementTabProps {
  activities: ActivityListResponseDto[];
}

export default function ActivityManagementTab({
  activities,
}: ActivityManagementTabProps) {
  return (
    <table className="w-full min-w-[950px] table-auto border-collapse border border-gray-200 shadow-md">
      <TableHeader />
      <TableBody activities={activities} />
    </table>
  );
}
