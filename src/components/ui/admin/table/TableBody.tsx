import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ActionButtons } from '../button';
import UpdateTableCell from '../cell/UpdateTableCell';
import { Activity } from '../../../../pages/admin/AdminPage';

interface TableBodyProps {
  activities: Activity[];
}

export default function TableBody({ activities }: TableBodyProps) {
  const [activeId, setActiveId] = useState<number | null>(null);

  const { register, handleSubmit, reset } = useForm<Activity>({
    defaultValues: {},
  });

  const onUpdateActivity = (id: number) => {
    setActiveId(prevId => (prevId === id ? null : id));
    const activity = activities.find(activity => activity.id === id);
    if (activity) {
      reset(activity);
    }
  };

  function onValid(data: Activity) {
    if (activeId !== null) {
      setActiveId(null);
    }
  }

  function handleCancel() {
    setActiveId(null);
    reset();
  }

  function onDeleteActivity(activityId: number) {}

  return (
    <tbody>
      {activities.map(activity => (
        <tr key={activity.id}>
          <td className="border border-gray-200 px-2 py-2">{activity.id}</td>
          <UpdateTableCell
            value={activity.name}
            name="name"
            type="text"
            isEditing={activeId === activity.id}
            register={register}
          />
          <UpdateTableCell
            value={activity.maxParticipants}
            name="maxParticipants"
            type="number"
            isEditing={activeId === activity.id}
            register={register}
          />
          <UpdateTableCell
            value={activity.location}
            name="location"
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
