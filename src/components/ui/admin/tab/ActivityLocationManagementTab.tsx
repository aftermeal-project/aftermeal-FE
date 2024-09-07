import { Suspense } from 'react';
import { FiPlus } from 'react-icons/fi'; // react-icons 사용
import {
  ActivityLocationList,
  ActivityLocationListFetcher,
  ActivityLocationListSkeleton,
  CreateActivityLocationModal,
} from '../../../../features/activity-locations';
import { useRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';

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
        <button
          onClick={handleCreateLocation}
          className="flex items-center rounded bg-blue-500 px-3 py-[6px] text-white hover:bg-blue-600"
        >
          <FiPlus className="mr-1" />
          장소 추가
        </button>
      </div>
      <Suspense fallback={<ActivityLocationListSkeleton />}>
        <ActivityLocationListFetcher>
          {locations => <ActivityLocationList locations={locations} />}
        </ActivityLocationListFetcher>
      </Suspense>
    </div>
  );
}
