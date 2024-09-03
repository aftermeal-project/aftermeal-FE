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
import moment from 'moment';

interface TableBodyProps {
  activities: ActivityResponseDto[];
}

export default function TableBody({ activities }: TableBodyProps) {
  const { updateActivity } = useUpdateActivty();
  const [activeId, setActiveId] = useState<number | null>(null);
  const setModal = useSetRecoilState(ModalAtomFamily(AtomKeys.DELETE_ACTIVITY));
  const { register, handleSubmit, reset, setValue } =
    useForm<ActivityResponseDto>();

  const activeSelectedCell = (id: number) => {
    setActiveId(prevId => (prevId === id ? null : id));
    const activity = activities.find(activity => activity.id === id);

    if (activity) {
      reset(activity);
    }
  };

  const onDelete = () => {
    setModal(true);
  };

  const onValid = (data: ActivityResponseDto) => {
    if (activeId !== null) {
      setActiveId(null);
    }

    data.applicationStartDate = formatTime({
      type: 'restore',
      time: data.applicationStartDate,
    });

    data.applicationEndDate = formatTime({
      type: 'restore',
      time: data.applicationEndDate,
    });

    if (moment(data.applicationStartDate).isAfter(data.applicationEndDate)) {
      alert('신청 시작 시간은 신청 종료 시간보다 빨라야 합니다.');
      return;
    }

    if (
      data.type === 'LUNCH' &&
      moment(data.applicationStartDate).format('A') === 'PM'
    ) {
      alert('점심 시간은 오후일 수 없습니다.');
      return;
    }

    if (
      data.type === 'DINNER' &&
      moment(data.applicationStartDate).format('A') === 'AM'
    ) {
      alert('저녁 시간은 오전일 수 없습니다.');
      return;
    }

    if (data.maxParticipants < data.currentParticipants) {
      alert('최대 참가자는 현재 참가자 수보다 적을 수 없습니다.');
      return;
    }

    updateActivity.mutate(data);
  };

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
            isEditing={activeId === activity.id}
            value={activity.applicationStartDate}
            register={register}
            setValue={setValue}
          />
          <BodyCell
            title="applicationEndDate"
            type="time"
            value={activity.applicationEndDate}
            isEditing={activeId === activity.id}
            register={register}
            setValue={setValue}
          />
          <ActionButtons
            isEditing={activeId === activity.id}
            onDelete={onDelete}
            onUpdate={handleSubmit(onValid)}
            activeCell={() => activeSelectedCell(activity.id)}
            setActiveId={setActiveId}
            reset={reset}
          />
        </tr>
      ))}
    </tbody>
  );
}
