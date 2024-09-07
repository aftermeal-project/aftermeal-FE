import React, { useState } from 'react';
import { ActivityLocationListResponseDto } from '../../../../types';

interface ActivityLocationCardProps {
  location: ActivityLocationListResponseDto;
  onUpdate: (updatedData: ActivityLocationListResponseDto) => void;
  onDelete: (id: number) => void;
}

export default function ActivityLocationCard({
  location,
  onUpdate,
  onDelete,
}: ActivityLocationCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(location.name);

  const handleSave = () => {
    onUpdate({ id: location.id, name: name });
    setIsEditing(false);
  };

  return (
    <div className="p-4 transition-shadow border border-gray-200 rounded-lg shadow-md hover:shadow-lg">
      {isEditing ? (
        <div className="flex flex-col gap-2">
          <input
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 rounded-md bg-blue-500 px-3 py-[6px] text-white transition-colors hover:bg-blue-600"
            >
              저장
            </button>
            <button
              onClick={() => setIsEditing(false)}
              className="flex-1 rounded-md bg-gray-500 px-3 py-[6px] text-white transition-colors hover:bg-gray-600"
            >
              취소
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <h3 className="text-lg font-semibold text-gray-700">
            {location.name}
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(true)}
              className="flex-1 rounded-md bg-green-500 px-3 py-[6px] text-white transition-colors hover:bg-green-600"
            >
              수정
            </button>
            <button
              onClick={() => onDelete(location.id)}
              className="flex-1 rounded-md bg-red-500 px-3 py-[6px] text-white transition-colors hover:bg-red-600"
            >
              삭제
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
