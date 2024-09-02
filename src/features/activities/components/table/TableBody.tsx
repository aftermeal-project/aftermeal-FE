import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActionButtons } from '../../../../components/ui/admin/button';
import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';
import { ActivityResponseDto } from '../../../../types';
import BodyCell from './BodyCell';

interface TableBodyProps {
  activities: ActivityResponseDto[];
}

export default function TableBody({ activities }: TableBodyProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const setMoal = useSetRecoilState(ModalAtomFamily(AtomKeys.DELETE_ACTIVITY));

  const { register, handleSubmit, reset } = useForm<ActivityResponseDto>({
    defaultValues: {},
  });

  const onUpdateActivity = (id: number) => {
    setActiveId(prevId => (prevId === id ? null : id));
    const activity = activities.find(activity => activity.id === id);
    if (activity) {
      reset(activity);
    }
  };

  function onValid(data: ActivityResponseDto) {
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
          <BodyCell
            value={activity.title}
            title="title"
            type="text"
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            value={activity.location}
            title="location"
            type="text"
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            value={
              activity.currentParticipants + '/' + activity.maxParticipants
            }
            title="maxParticipants"
            type="number"
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            value={activity.status}
            title="status"
            type="select"
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            value={activity.type}
            title="type"
            type="select"
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            value={activity.scheduledDate}
            title="scheduledDate"
            type="date"
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            value={activity.applicationStartDate}
            title="applicationStartDate"
            type="time"
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            value={activity.applicationEndDate}
            title="applicationEndDate"
            type="time"
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
