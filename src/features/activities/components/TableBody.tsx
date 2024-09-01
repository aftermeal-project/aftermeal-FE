import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActionButtons } from '../../../components/ui/admin/button';
import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../atoms';
import { AtomKeys } from '../../../constants';
import { ActivityListResponseDto } from '../../../types';
import UpdateTableCell from './UpdateTableCell';

interface TableBodyProps {
  activities: ActivityListResponseDto[];
}

export default function TableBody({ activities }: TableBodyProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const setMoal = useSetRecoilState(ModalAtomFamily(AtomKeys.DELETE_ACTIVITY));

  const { register, handleSubmit, reset } = useForm<ActivityListResponseDto>({
    defaultValues: {},
  });

  const onUpdateActivity = (id: number) => {
    setActiveId(prevId => (prevId === id ? null : id));
    const activity = activities.find(activity => activity.id === id);
    if (activity) {
      reset(activity);
    }
  };

  function onValid(data: ActivityListResponseDto) {
    if (activeId !== null) {
      setActiveId(null);
    }
  }

  function handleCancel() {
    setActiveId(null);
    reset();
  }

  function onDeleteActivity(activityId: number) {
    setMoal(true);
  }

  return (
    <tbody>
      {activities.map(activity => (
        <tr key={activity.id}>
          <td className="px-2 py-2 border border-gray-200">{activity.id}</td>
          <UpdateTableCell
            value={activity.title}
            title="title"
            type="text"
            isEditing={activeId === activity.id}
            register={register}
          />
          <UpdateTableCell
            value={activity.maxParticipants}
            title="maxParticipants"
            type="number"
            isEditing={activeId === activity.id}
            register={register}
          />
          <UpdateTableCell
            value={activity.location}
            title="location"
            type="select"
            isEditing={activeId === activity.id}
            register={register}
          />
          <ActionButtons
            isEditing={activeId === activity.id}
            onUpdate={() => onUpdateActivity(activity.id)}
            onDelete={() => onDeleteActivity(activity.id)}
            onSave={handleSubmit(onValid)}
            onCancel={handleCancel}
          />
        </tr>
      ))}
    </tbody>
  );
}
