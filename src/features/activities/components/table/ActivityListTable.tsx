import { ActivityResponseDto } from '../../../../types';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import { UseFormReturn } from 'react-hook-form';

interface ActivityListTableProps {
  useForm: UseFormReturn<ActivityResponseDto>;
  activities: ActivityResponseDto[];
}

export default function ActivityListTable({
  useForm,
  activities,
}: ActivityListTableProps) {
  return (
    <>
      <table className="w-full min-w-[1400px] overflow-hidden rounded-md bg-white shadow-md">
        <TableHeader />
        <TableBody useForm={useForm} activities={activities} />
      </table>
    </>
  );
}
