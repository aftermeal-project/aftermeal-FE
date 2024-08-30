import { ActivityListResponseDto } from '../../../../types';
import { TableHeader, TableBody } from '.';

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
