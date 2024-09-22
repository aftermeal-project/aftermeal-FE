import { Button } from '../../../../../components';

interface ButtonFieldProps {
  mode: string;
  onUpdate?: () => void;
  onDelete?: () => void;
  onSave?: () => void;
  onCancel?: () => void;
}

export default function ButtonField({
  mode,
  onUpdate,
  onDelete,
  onSave,
  onCancel,
}: ButtonFieldProps) {
  return (
    <div className="flex justify-end w-full h-10 mt-10 gap-x-4">
      {mode === 'Read' && (
        <>
          <Button type="button" variant="primary" onClick={onUpdate}>
            수정
          </Button>
          <Button type="button" variant="danger" onClick={onDelete}>
            삭제
          </Button>
        </>
      )}

      {mode === 'Update' && (
        <>
          <Button type="submit" variant="primary" onClick={onSave}>
            확인
          </Button>
          <Button type="button" variant="secondary" onClick={onCancel}>
            취소
          </Button>
        </>
      )}
    </div>
  );
}
