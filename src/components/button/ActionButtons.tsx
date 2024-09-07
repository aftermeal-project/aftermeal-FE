import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';

interface ActionButtonsProps {
  isUpdating: boolean;
  onSave: () => void;
  onUpdate: () => void;
  onDelete: () => void;
  onCancel: () => void;
}

export default function ActionButtons({
  isUpdating,
  onSave,
  onUpdate,
  onDelete,
  onCancel,
}: ActionButtonsProps) {
  return (
    <td className="px-4 py-2 text-center border border-gray-200">
      <div className="flex items-center gap-x-2">
        {isUpdating ? (
          <>
            <button
              type="button"
              onClick={onSave}
              className="flex items-center px-3 py-1 text-sm font-semibold text-white bg-green-500 rounded-md shadow gap-x-2 hover:bg-green-600"
            >
              <FaSave className="text-white" />
              저장
            </button>
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-md shadow gap-x-2 hover:bg-red-600"
            >
              <FaTimes className="text-white" />
              취소
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={onUpdate}
              className="flex items-center px-3 py-1 text-sm font-semibold text-white bg-yellow-500 rounded-md shadow gap-x-2 hover:bg-yellow-600"
            >
              <FaEdit className="text-white" />
              수정
            </button>
            <button
              type="button"
              onClick={onDelete}
              className="flex items-center px-3 py-1 text-sm font-semibold text-white bg-red-500 rounded-md shadow gap-x-2 hover:bg-red-600"
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
