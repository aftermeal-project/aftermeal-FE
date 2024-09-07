import { FiEdit, FiTrash2 } from 'react-icons/fi';
import { ActivityLocationListResponseDto } from '../../../../types';

interface ActivityLocationCardProps {
  location: ActivityLocationListResponseDto;
  onUpdate: () => void;
  onDelete: () => void;
}

export default function ActivityLocationCard({
  location,
  onUpdate,
  onDelete,
}: ActivityLocationCardProps) {
  return (
    <div className="flex items-center justify-between p-4 transition-shadow bg-white rounded-lg shadow hover:shadow-md">
      <h2 className="text-lg font-semibold">{location.name}</h2>
      <div className="flex justify-end space-x-2">
        <button
          onClick={onUpdate}
          className="px-2 py-1 text-white bg-yellow-400 rounded hover:bg-yellow-500"
        >
          <FiEdit />
        </button>
        <button
          onClick={onDelete}
          className="px-2 py-1 text-white bg-red-500 rounded hover:bg-red-600"
        >
          <FiTrash2 />
        </button>
      </div>
    </div>
  );
}
