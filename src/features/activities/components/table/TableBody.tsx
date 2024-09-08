import { useForm, UseFormSetValue } from 'react-hook-form';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../../../atoms';
import { AtomKeys, validationMessages } from '../../../../constants';
import { ActivityResponseDto, Option } from '../../../../types';
import BodyCell from './BodyCell';
import { statusOptions, typeOptions } from '../../constants/options';
import { ActionButtons, Dropdown } from '../../../../components';
import useUpdateActivity from '../../api/update-activity';
import { formatTime } from '../../../../utils';
import moment from 'moment';
import { useState } from 'react';

function validateActivity(data: ActivityResponseDto): string | null {
  const isTitleInValid = data.title.length > 20 || data.title.length < 2;
  const isLocationInValid = data.location === 'none';
  const isStartAfterEnd = moment(data.applicationStartDate).isAfter(
    data.applicationEndDate,
  );
  const isLunchPM =
    data.type === 'LUNCH' &&
    moment(data.applicationStartDate).format('A') === 'PM';
  const isDinnerAM =
    data.type === 'DINNER' &&
    moment(data.applicationStartDate).format('A') === 'AM';
  const isMaxParticipantsLess = data.maxParticipants < data.currentParticipants;

  if (isStartAfterEnd) return validationMessages.START_BEFORE_END;
  if (isLunchPM) return validationMessages.LUNCH_PM_ERROR;
  if (isDinnerAM) return validationMessages.DINNER_AM_ERROR;
  if (isMaxParticipantsLess)
    return validationMessages.MAX_PARTICIPANTS_LESS_THAN_CURRENT;
  if (isTitleInValid) return validationMessages.TITLE_LENGTH_ERROR;
  if (isLocationInValid) return validationMessages.INVALID_LOCATION;

  return null;
}

interface TableBodyProps {
  activities: ActivityResponseDto[];
}

export default function TableBody({ activities }: TableBodyProps) {
  const { updateActivity } = useUpdateActivity();
  const [manageMode, setManageMode] = useState<'update' | 'delete'>('update');

  const { register, handleSubmit, reset, setValue } =
    useForm<ActivityResponseDto>();

  const [activeId, setActiveId] = useRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );
  const resetActiveId = useResetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );

  const deleteModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY_MODAL),
  );

  const activityModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.UPDATE_ACTIVITY_MODAL),
  );

  const handleUpdate = (activityId: number) => {
    setActiveId(activityId);
    const selectedActivity = activities.find(
      activity => activity.id === activityId,
    );
    if (selectedActivity) {
      reset(selectedActivity);
      activityModalOpen(true);
    }
  };

  const handleDelete = (activityId: number) => {
    setManageMode('delete');
    setActiveId(activityId);
    deleteModalOpen(true);
  };

  const handleSubmitTable = (data: ActivityResponseDto) => {
    data.applicationStartDate = formatTime({
      type: 'restore',
      time: data.applicationStartDate,
    });
    data.applicationEndDate = formatTime({
      type: 'restore',
      time: data.applicationEndDate,
    });

    const validationError = validateActivity(data);

    if (validationError) {
      alert(validationError);
    } else {
      updateActivity.mutate(data);
      resetActiveId();
    }
  };

  const calculatePercentage = (part: number, whole: number): string => {
    return '(' + ((part / whole) * 100).toFixed(2) + '%)';
  };

  return (
    <tbody>
      {activities.map(activity => (
        <tr
          key={activity.id}
          className="border-b border-gray-200 hover:bg-gray-100"
        >
          <td className="px-4 py-2">
            <BodyCell title="scheduledDate" value={activity.scheduledDate} />
          </td>
          <td className="px-4 py-2">
            <BodyCell title="title" value={activity.title} />
          </td>
          <td className="px-4 py-2">
            <BodyCell title="location" value={activity.location} />
          </td>
          <td className="px-4 py-2">
            <BodyCell title="type" value={activity.type} />
          </td>
          <td className="px-4 py-2">
            <BodyCell title="status" value={activity.status} />
          </td>
          <td className="px-4 py-2">
            <BodyCell
              title="applicationStartDate"
              value={activity.applicationStartDate}
            />
          </td>
          <td className="px-4 py-2">
            <BodyCell
              title="applicationEndDate"
              value={activity.applicationEndDate}
            />
          </td>
          <td className="px-4 py-2">
            <BodyCell
              title="maxParticipants"
              value={
                activity.currentParticipants +
                '/' +
                activity.maxParticipants +
                '명 ' +
                calculatePercentage(
                  activity.currentParticipants,
                  activity.maxParticipants,
                )
              }
            />
          </td>
          <td className="px-4 py-2">
            <Dropdown
              onUpdate={() => handleUpdate(activity.id)}
              onDelete={() => handleDelete(activity.id)}
            />
          </td>
        </tr>
      ))}
    </tbody>
  );
}
