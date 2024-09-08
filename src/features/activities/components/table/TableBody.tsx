import { UseFormReturn } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../../../atoms';
import { AtomKeys } from '../../../../constants';
import { ActivityResponseDto } from '../../../../types';
import BodyCell from './BodyCell';
import { Dropdown } from '../../../../components';
import { formatTime } from '../../../../utils';

interface TableBodyProps {
  useForm: UseFormReturn<ActivityResponseDto>;
  activities: ActivityResponseDto[];
}

export default function TableBody({ useForm, activities }: TableBodyProps) {
  const { reset } = useForm;

  const setActiveId = useSetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );

  const deleteModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY_MODAL),
  );

  const activityModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.UPDATE_ACTIVITY_MODAL),
  );

  const calculatePercentage = (part: number, whole: number): string => {
    return '(' + ((part / whole) * 100).toFixed(2) + '%)';
  };

  const settingUpdateActivityModalFormValue = (activityId: number) => {
    const selectedActivity = activities.find(
      activity => activity.id === activityId,
    );

    const formatStartDate = formatTime({
      type: 'format',
      time: String(selectedActivity?.applicationStartDate),
    });

    const formatEndDate = formatTime({
      type: 'format',
      time: String(selectedActivity?.applicationEndDate),
    });

    reset({
      ...selectedActivity,
      applicationStartDate: formatStartDate,
      applicationEndDate: formatEndDate,
    });
  };

  const handleUpdate = (activityId: number) => {
    settingUpdateActivityModalFormValue(activityId);
    setActiveId(activityId);
    activityModalOpen(true);
  };

  const handleDelete = (activityId: number) => {
    setActiveId(activityId);
    deleteModalOpen(true);
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
