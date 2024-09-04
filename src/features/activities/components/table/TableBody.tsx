import { useForm, UseFormSetValue } from 'react-hook-form';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { ActiveIdAtom, ModalAtomFamily } from '../../../../atoms';
import { AtomKeys, validationMessages } from '../../../../constants';
import { ActivityResponseDto, Option } from '../../../../types';
import BodyCell from '../cell/BodyCell';
import { statusOptions, typeOptions } from '../constants/options';
import { ActionButtons } from '../../../../components/ui/admin/button';
import useUpdateActivity from '../../api/update-activity';
import { formatTime } from '../../../../utils';
import moment from 'moment';

function checkActivityValidation(data: ActivityResponseDto): string | null {
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
  const { register, handleSubmit, reset, setValue } =
    useForm<ActivityResponseDto>();

  const { updateActivity } = useUpdateActivity();

  const [activeId, setActiveId] = useRecoilState(ActiveIdAtom);
  const resetActiveId = useResetRecoilState(ActiveIdAtom);
  const setDeleteActivityModal = useSetRecoilState(
    ModalAtomFamily(AtomKeys.DELETE_ACTIVITY),
  );

  const cells: {
    title: keyof ActivityResponseDto;
    type: string;
    options?: Option[];
    isUpdating?: boolean;
    setValue?: UseFormSetValue<ActivityResponseDto>;
  }[] = [
    { title: 'title', type: 'text' },
    { title: 'location', type: 'select' },
    {
      title: 'currentParticipants',
      type: 'number',
      isUpdating: false,
    },
    { title: 'maxParticipants', type: 'number' },
    { title: 'status', type: 'select', options: statusOptions },
    { title: 'type', type: 'select', options: typeOptions },
    { title: 'scheduledDate', type: 'date' },
    { title: 'applicationStartDate', type: 'time', setValue },
    { title: 'applicationEndDate', type: 'time', setValue },
  ];

  const selectActivity = (activityId: number) => {
    setActiveId(activityId);
    const selectedActivity = activities.find(
      activity => activity.id === activityId,
    );
    if (selectedActivity) {
      reset(selectedActivity);
    }
  };

  const onValid = (data: ActivityResponseDto) => {
    data.applicationStartDate = formatTime({
      type: 'restore',
      time: data.applicationStartDate,
    });
    data.applicationEndDate = formatTime({
      type: 'restore',
      time: data.applicationEndDate,
    });

    const validationError = checkActivityValidation(data);

    if (validationError) {
      alert(validationError);
    } else {
      updateActivity.mutate(data);
      resetActiveId();
    }
  };

  const onDelete = (activityId: number) => {
    setActiveId(activityId);
    setDeleteActivityModal(true);
  };

  return (
    <tbody>
      {activities.map(activity => (
        <tr key={activity.id} className="text-sm font-bold">
          {cells.map(cell => (
            <BodyCell
              key={cell.title}
              title={cell.title}
              type={cell.type}
              value={activity[cell.title]}
              isUpdating={cell.isUpdating !== false && activeId === activity.id}
              register={register}
              options={cell.options}
              setValue={cell.setValue}
            />
          ))}
          <ActionButtons
            isUpdating={activeId === activity.id}
            startUpdating={() => selectActivity(activity.id)}
            onUpdate={handleSubmit(onValid)}
            onDelete={() => onDelete(activity.id)}
            onCancel={() => reset()}
          />
        </tr>
      ))}
    </tbody>
  );
}
