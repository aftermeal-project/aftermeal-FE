import { Suspense } from 'react';
import {
  ActivityListFetcher,
  ActivityListSkeleton,
  CreateActivityModal,
  ActivityListTable,
} from '../../features/activities';
import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../atoms';
import { AtomKeys } from '../../constants';
import useDeleteActivity from '../../features/activities/api/delete-activity';
import { ConfirmDeleteModal } from '../../features/modals';
import { Button } from '../button';

export default function ActivityManagementTab() {
  const resetActivityId = useResetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );
  const { deleteActivity } = useDeleteActivity();
  const activeId = useRecoilValue(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );

  const deleteModalOpen = useRecoilValue(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY_MODAL),
  );
  const [createModalOpen, setCreateModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY_MODAL),
  );

  function handleCreateActivity() {
    setCreateModalOpen(true);
  }

  return (
    <section>
      {createModalOpen && <CreateActivityModal />}
      {deleteModalOpen && (
        <ConfirmDeleteModal
          message="정말 해당 활동을 삭제하시겠습니까?"
          modalKey={AtomKeys.DELETE_ACTIVITY_MODAL}
          request={deleteActivity}
          params={String(activeId)}
          onSettled={resetActivityId}
        />
      )}
      <div className="h-full overflow-hidden">
        <div className="flex items-center justify-between mb-4">
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
