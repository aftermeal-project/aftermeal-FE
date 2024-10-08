import { ActivityLocationListResponseDto } from '../../../../types';
import { useState } from 'react';
import { ActivityLocationCard } from '../card';
import { useSetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';
import useUpdateActivityLocation from '../../api/update-activity-location';
import { SearchBar } from '../../../../components';

interface ActivityLocationListProps {
  locations: ActivityLocationListResponseDto[];
}

export default function ActivityLocationList({
  locations,
}: ActivityLocationListProps) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const { updateActivityLocation } = useUpdateActivityLocation();

  const setActiveLocationId = useSetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_LOCATION_ID),
  );

  const setDeleteModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY_LOCATION_MODAL),
  );

  const filteredLocations = Array.isArray(locations)
    ? locations.filter(location =>
        location.name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : [];

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = (locationId: number) => {
    setActiveLocationId(locationId);
    setDeleteModalOpen(true);
  };

  return (
    <section>
      <SearchBar
        searchValue={searchTerm}
        onSearchChange={handleSearchChange}
        placeholder="장소 검색 ..."
      />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.isArray(locations) && filteredLocations.length > 0 ? (
          filteredLocations.map(location => (
            <ActivityLocationCard
              key={crypto.randomUUID()}
              location={location}
              onUpdate={updateActivityLocation}
              onDelete={() => handleDelete(location.id)}
            />
          ))
        ) : (
          <h1 className="text-md py-3 font-bold">검색 결과가 없습니다!</h1>
        )}
      </div>
    </section>
  );
}
