import { ActivityResponseDto } from '../../../../types';
import TableBody from './TableBody';
import TableHeader from './TableHeader';

interface ActivityListTableProps {
  activities: ActivityResponseDto[];
}

export default function ActivityListTable({
  activities,
}: ActivityListTableProps) {
  return (
    <>
      <table className="w-full min-w-[1400px] overflow-hidden rounded-md bg-white shadow-md">
        <TableHeader />
        <TableBody activities={activities} />
      </table>
    </>
  );
}
