import { FaEdit, FaTrashAlt, FaSave, FaTimes } from 'react-icons/fa';
import Button from './Button';

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
            <Button type="button" icon={<FaSave />} onClick={onSave}>
              저장
            </Button>
            <Button
              type="button"
              icon={<FaTimes />}
              onClick={onCancel}
              variant="danger"
            >
              취소
            </Button>
          </>
        ) : (
          <>
            <Button
              type="button"
              icon={<FaEdit />}
              onClick={onUpdate}
              variant="yellow"
            >
              수정
            </Button>
            <Button
              type="button"
              icon={<FaTrashAlt />}
              onClick={onDelete}
              variant="danger"
            >
              삭제
            </Button>
          </>
        )}
      </div>
    </td>
  );
}
