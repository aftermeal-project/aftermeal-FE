import { Suspense } from 'react';
import { FiPlus } from 'react-icons/fi'; // react-icons 사용
import {
  ActivityLocationList,
  ActivityLocationListFetcher,
  ActivityLocationListSkeleton,
  CreateActivityLocationModal,
} from '../../features/activity-locations';
import { useRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../atoms';
import { AtomKeys } from '../../constants';
import { Button } from '../button';

export default function ActivityLocationManagementTab() {
  const [createLocationModalOpen, setCreateLocationModalOpen] = useRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY_LOCATION_MODAL),
  );

  const handleCreateLocation = () => {
    setCreateLocationModalOpen(true);
  };

  return (
    <div>
      {createLocationModalOpen && <CreateActivityLocationModal />}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">장소 관리</h1>
        <Button type="button" icon={<FiPlus />} onClick={handleCreateLocation}>
          장소 추가
        </Button>
      </div>
      <Suspense fallback={<ActivityLocationListSkeleton />}>
        <ActivityLocationListFetcher>
          {locations => <ActivityLocationList locations={locations} />}
        </ActivityLocationListFetcher>
      </Suspense>
    </div>
  );
}
