import { useRecoilValue } from 'recoil';
import { ActivityResponseDto } from '../../../../types';
import TableBody from './TableBody';
import TableHeader from './TableHeader';
import { ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';
import { UpdateActivityModal } from '../modal';

interface ActivityListTableProps {
  activities: ActivityResponseDto[];
}

export default function ActivityListTable({
  activities,
}: ActivityListTableProps) {
  const updateActivityModalOpen = useRecoilValue(
    ModalAtomFamily(AtomKeys.UPDATE_ACTIVITY_MODAL),
  );

  return (
    <>
      {updateActivityModalOpen && <UpdateActivityModal />}
      <table className="w-full min-w-[1400px] overflow-hidden rounded-md bg-white shadow-md">
        <TableHeader />
        <TableBody activities={activities} />
      </table>
    </>
  );
}
