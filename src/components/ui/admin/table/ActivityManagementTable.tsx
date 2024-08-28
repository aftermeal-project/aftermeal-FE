import { Activity } from '../../../../pages/admin/AdminPage';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import { SetterOrUpdater, useRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';

interface ActivityManagementTableProps {
  activities: Activity[];
  setModal: SetterOrUpdater<boolean>;
}

export default function ActivityManagementTable({
  activities,
}: ActivityManagementTableProps) {
  const [_, setModal] = useRecoilState(ModalAtomFamily('confirm_delete'));

  return (
    <table className="w-full min-w-[950px] table-auto border-collapse border border-gray-200 shadow-md">
      <TableHeader />
      <TableBody activities={activities} setModal={setModal} />
    </table>
  );
}
