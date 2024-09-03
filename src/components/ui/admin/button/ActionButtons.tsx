import { SetStateAction } from 'react';
import { UseFormReset } from 'react-hook-form';
import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import { ActivityResponseDto } from '../../../../types';

interface ActionButtonsProps {
  isEditing: boolean;
  onDelete: () => void;
  onUpdate: () => void;
  activeCell: () => void;
  setActiveId: React.Dispatch<SetStateAction<number | null>>;
  reset: UseFormReset<ActivityResponseDto>;
}

export default function ActionButtons({
  isEditing,
  onDelete,
  onUpdate,
  activeCell,
  setActiveId,
  reset,
}: ActionButtonsProps) {
  function onCancel() {
    setActiveId(null);
    reset();
  }

  return (
    <td className="border border-gray-200 px-4 py-2 text-center">
      <div className="flex items-center gap-x-2">
        {isEditing ? (
          <>
            <button
              type="button"
              onClick={onUpdate}
              className="flex items-center gap-x-2 rounded-md bg-green-500 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-green-600"
            >
              <FaSave className="text-white" />
              저장
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-x-2 rounded-md bg-red-500 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-red-600"
            >
              <FaTimes className="text-white" />
              취소
            </button>
          </>
        ) : (
          <>
            <button
              onClick={activeCell}
              className="flex items-center gap-x-2 rounded-md bg-yellow-500 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-yellow-600"
            >
              <FaEdit className="text-white" />
              수정
            </button>
            <button
              onClick={onDelete}
              className="flex items-center gap-x-2 rounded-md bg-red-500 px-3 py-1 text-sm font-semibold text-white shadow hover:bg-red-600"
            >
              <FaTrashAlt className="text-white" />
              삭제
            </button>
          </>
        )}
      </div>
    </td>
  );
}
