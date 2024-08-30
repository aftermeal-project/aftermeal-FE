import { ActivityListResponseDto } from '../../../types';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

interface ActivityListTableProps {
  activities: ActivityListResponseDto[];
}

export default function ActivityListTable({
  activities,
}: ActivityListTableProps) {
  return (
    <table className="w-full min-w-[950px] table-auto border-collapse border border-gray-200 shadow-md">
      <TableHeader />
      <TableBody activities={activities} />
    </table>
  );
}
