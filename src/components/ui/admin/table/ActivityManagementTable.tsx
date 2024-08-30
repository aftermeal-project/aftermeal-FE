import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { ActivityListResponseDto } from '../../../../types';

interface ActivityManagementTableProps {
  activities: ActivityListResponseDto[];
}

export default function ActivityManagementTable({
  activities,
}: ActivityManagementTableProps) {
  return (
    <table className="w-full min-w-[950px] table-auto border-collapse border border-gray-200 shadow-md">
      <TableHeader />
      <TableBody activities={activities} />
    </table>
  );
}
