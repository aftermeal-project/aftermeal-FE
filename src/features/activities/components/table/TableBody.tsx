import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';
import { ActivityResponseDto } from '../../../../types';
import BodyCell from '../cell/BodyCell';
import { statusOptions, typeOptions } from '../constants/options';
import { ActionButtons } from '../../../../components/ui/admin/button';
import useUpdateActivty from '../../api/update-activity';
import { formatTime } from '../../../../utils';

interface TableBodyProps {
  activities: ActivityResponseDto[];
}

export default function TableBody({ activities }: TableBodyProps) {
  const [activeId, setActiveId] = useState<number | null>(null);
  const setModal = useSetRecoilState(ModalAtomFamily(AtomKeys.DELETE_ACTIVITY));

  const { register, handleSubmit, reset } = useForm<ActivityResponseDto>();
  const { updateActivity } = useUpdateActivty();

  function prepareActivityUpdate(id: number) {
    setActiveId(prevId => (prevId === id ? null : id));
    const activity = activities.find(activity => activity.id === id);

    if (activity) {
      reset(activity);
    }
  }

  function onValid(data: ActivityResponseDto) {
    if (activeId !== null) {
      setActiveId(null);
    }

    /**
     * 수정 api 요청을 위해 formatted data를 원본 형식으로 복구
     */
    data.applicationStartDate = formatTime({
      type: 'restore',
      date: data.applicationStartDate,
    });

    data.applicationEndDate = formatTime({
      type: 'restore',
      date: data.applicationEndDate,
    });

    updateActivity.mutate(data);
  }

  function handleCancel() {
    setActiveId(null);
    reset();
  }

  function onDelete(activityId: number) {
    setModal(true);
  }

  return (
    <tbody>
      {activities.map(activity => (
        <tr key={activity.id} className="font-bold">
          <BodyCell
            title="title"
            type="text"
            value={activity.title}
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            title="location"
            type="select"
            value={activity.location}
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            title="currentParticipants"
            type="number"
            value={activity.currentParticipants}
            isEditing={false}
            register={register}
          />
          <BodyCell
            title="maxParticipants"
            type="number"
            value={activity.maxParticipants}
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            title="status"
            type="select"
            value={activity.status}
            isEditing={activeId === activity.id}
            register={register}
            options={statusOptions}
          />
          <BodyCell
            title="type"
            type="select"
            value={activity.type}
            isEditing={activeId === activity.id}
            register={register}
            options={typeOptions}
          />
          <BodyCell
            title="scheduledDate"
            type="date"
            value={activity.scheduledDate}
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            title="applicationStartDate"
            type="time"
            value={activity.applicationStartDate}
            isEditing={activeId === activity.id}
            register={register}
          />
          <BodyCell
            title="applicationEndDate"
            type="time"
            value={activity.applicationEndDate}
            isEditing={activeId === activity.id}
            register={register}
          />
          <ActionButtons
            isEditing={activeId === activity.id}
            prepareActivityUpdate={() => prepareActivityUpdate(activity.id)}
            onDelete={() => onDelete(activity.id)}
            onUpdate={handleSubmit(onValid)}
            onCancel={handleCancel}
          />
        </tr>
      ))}
    </tbody>
  );
}
