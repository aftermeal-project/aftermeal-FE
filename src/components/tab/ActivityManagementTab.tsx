import { Suspense } from 'react';
import {
  ActivityListFetcher,
  ActivityListSkeleton,
  CreateActivityModal,
  ActivityListTable,
} from '../../features/activities';
import { useRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../atoms';
import { AtomKeys } from '../../constants';
import { Button } from '../../components';

export default function ActivityManagementTab() {
  const [createModalOpen, setCreateModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY_MODAL),
  );

  const handleCreateActivity = () => {
    setCreateModalOpen(true);
  };

  return (
    <section>
      {createModalOpen && <CreateActivityModal />}
      <div className="h-full overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">활동 관리</h1>
          <Button
            type="button"
            onClick={handleCreateActivity}
            variant="primary"
            size="medium"
          >
            활동 추가
          </Button>
        </div>
        <div className="overflow-x-auto">
          <Suspense fallback={<ActivityListSkeleton type="Table" />}>
            <ActivityListFetcher>
              {activities => <ActivityListTable activities={activities} />}
            </ActivityListFetcher>
          </Suspense>
        </div>
      </div>
    </section>
  );
}
