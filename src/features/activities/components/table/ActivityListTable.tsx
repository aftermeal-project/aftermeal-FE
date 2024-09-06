import { ActivityResponseDto } from '../../../../types';
import { TableHeader, TableBody } from '.';

interface ActivityListTableProps {
  activities: ActivityResponseDto[];
}

export default function ActivityListTable({
  activities,
}: ActivityListTableProps) {
  return (
    <table className="w-full min-w-[1600px] table-auto border-collapse border border-gray-200 shadow-md">
      <TableHeader />
      <TableBody activities={activities} />
    </table>
  );
}
