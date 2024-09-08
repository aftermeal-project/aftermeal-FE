import { UseFormReturn } from 'react-hook-form';
import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../../../atoms';
import { Button, Input, ModalLayout } from '../../../../components';
import { AtomKeys, validationMessages } from '../../../../constants';
import { ActivityResponseDto } from '../../../../types';
import { SelectField } from '../select';
import { statusOptions, typeOptions } from '../../constants/options';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import { formatTime } from '../../../../utils';
import moment from 'moment';
import useUpdateActivty from '../../api/update-activity';

function validateActivity(data: ActivityResponseDto): string | null {
  const isTitleInValid = data.title.length > 20 || data?.title.length < 2;
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

interface UpdateActivityModalProps {
  useForm: UseFormReturn<ActivityResponseDto>;
}

export default function UpdateActivityModal({
  useForm,
}: UpdateActivityModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm;

  const resetActiveId = useResetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_ACTIVITY_ID),
  );
  const { updateActivity } = useUpdateActivty();

  const updateActivityModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.UPDATE_ACTIVITY_MODAL),
  );

  const onValid = (data: ActivityResponseDto) => {
    data.applicationStartDate = formatTime({
      type: 'restore',
      time: String(data.applicationStartDate),
    });
    data.applicationEndDate = formatTime({
      type: 'restore',
      time: String(data.applicationEndDate),
    });

    const validationError = validateActivity(data);

    if (validationError) {
      alert(validationError);
    } else {
      updateActivity.mutate(data);
      resetActiveId();
      updateActivityModalOpen(false);
      reset();
    }
  };

  const handleModalClose = () => {
    updateActivityModalOpen(false);
    reset();
  };

  return (
    <ModalLayout setModal={updateActivityModalOpen}>
      <div
        className="p-6 mx-auto bg-white rounded-lg shadow-lg w-96"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-8 text-lg font-bold">활동 수정</h2>
        <form onSubmit={handleSubmit(onValid)}>
          <Tabs>
            <TabList>
              <Tab>기본 정보 수정</Tab>
              <Tab>일정 수정</Tab>
            </TabList>

            <TabPanel className="mt-5">
              <Input<ActivityResponseDto>
                label="활동명"
                name="title"
                type="text"
                placeholder="활동명"
                register={register}
                margin="mb-4"
                error={errors.title}
              />
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="inline-block mb-2 text-base"
                >
                  장소
                </label>
                <SelectField<ActivityResponseDto>
                  title="location"
                  options={[]}
                  register={register}
                  setValue={setValue}
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="location"
                  className="inline-block mb-2 text-base"
                >
                  활동 유형
                </label>
                <SelectField<ActivityResponseDto>
                  title="type"
                  options={typeOptions}
                  register={register}
                />
              </div>
              <Input<ActivityResponseDto>
                label="최대 참가자"
                name="maxParticipants"
                type="number"
                placeholder="최대 참가자"
                register={register}
                margin="mb-4"
                error={errors.maxParticipants}
              />
              <div className="mb-4">
                <label htmlFor="status" className="inline-block mb-2 text-base">
                  진행 상태
                </label>
                <SelectField<ActivityResponseDto>
                  title="status"
                  options={statusOptions}
                  register={register}
                />
              </div>
            </TabPanel>

            <TabPanel className="mt-5">
              <Input<ActivityResponseDto>
                label="일정"
                name="scheduledDate"
                type="date"
                placeholder="일정"
                register={register}
                margin="mb-4"
                error={errors.scheduledDate}
              />
              <Input<ActivityResponseDto>
                label="신청 시작 시간"
                name="applicationStartDate"
                type="time"
                placeholder="신청 시작 시간"
                register={register}
                margin="mb-4"
                error={errors.applicationStartDate}
              />
              <Input<ActivityResponseDto>
                label="신청 마감 시간"
                name="applicationEndDate"
                type="time"
                placeholder="신청 마감 시간"
                register={register}
                margin="mb-4"
                error={errors.applicationEndDate}
              />
            </TabPanel>
          </Tabs>
          <div className="flex justify-end w-full mt-11 gap-x-5">
            <Button
              type="button"
              onClick={handleModalClose}
              variant="secondary"
            >
              취소
            </Button>
            <Button type="submit">수정</Button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
}
