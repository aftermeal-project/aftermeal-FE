import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import {
  Button,
  FormErrorMessages,
  Input,
  ModalLayout,
} from '../../../../components';
import {
  AtomKeys,
  createActivityValidationRules,
  errorMessages,
  validationMessages,
} from '../../../../constants';
import { ActivityCreationRequestDto } from '../../../../types';
import useCreateActivity from '../../api/create-activitiy';
import { SelectField } from '../select';
import { typeOptions } from '../../constants/options';

export default function CreateActivityModal() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    setError,
    formState: { errors },
  } = useForm<ActivityCreationRequestDto>({
    defaultValues: {
      title: '',
      maxParticipants: 2,
    },
  });

  const { createActivity } = useCreateActivity();

  const createActivityModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY_MODAL),
  );

  const onValid = (data: ActivityCreationRequestDto) => {
    if (!data.location) {
      setError('location', {
        message: validationMessages.INVALID_LOCATION,
      });
      return;
    }

    const { location, ...rest } = data;

    const createActivityData = {
      activityLocationId: Number(data.location),
      ...rest,
    };

    createActivity.mutate(createActivityData, {
      onError: () => {
        alert(errorMessages.UNKNOWN_ERROR);
      },
      onSettled: () => {
        createActivityModalOpen(false);
        reset();
      },
    });
  };

  const handleModalClose = () => {
    createActivityModalOpen(false);
    reset();
  };

  return (
    <ModalLayout setModal={createActivityModalOpen}>
      <div
        className="mx-auto w-80 rounded-lg bg-white p-6 shadow-lg"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-8 text-lg font-bold">활동 추가</h2>
        <form onSubmit={handleSubmit(onValid)}>
          <Input<ActivityCreationRequestDto>
            label="활동명"
            name="title"
            type="text"
            placeholder="활동명"
            register={register}
            validationRules={createActivityValidationRules.titleValidationRules}
            margin="mb-4"
            error={errors.title}
          />
          <div className="mb-4">
            <label htmlFor="location" className="mb-2 inline-block text-base">
              장소
            </label>
            <SelectField<ActivityCreationRequestDto>
              title="location"
              options={[]}
              register={register}
              setValue={setValue}
            />
          </div>
          <Input<ActivityCreationRequestDto>
            label="최대 참가자"
            name="maxParticipants"
            type="number"
            placeholder="최대 참가자"
            register={register}
            validationRules={
              createActivityValidationRules.maxParticipantsValidationRules
            }
            margin="mb-4"
            error={errors.maxParticipants}
          />
          <div className="mb-4">
            <label htmlFor="location" className="mb-2 inline-block text-base">
              세션 유형
            </label>
            <SelectField<ActivityCreationRequestDto>
              title="type"
              options={typeOptions}
              register={register}
            />
          </div>
          <Input<ActivityCreationRequestDto>
            label="일정"
            name="scheduledDate"
            type="date"
            placeholder="일정"
            register={register}
            validationRules={
              createActivityValidationRules.scheduledDateValidationRules
            }
            margin="mb-4"
            error={errors.scheduledDate}
          />
          <FormErrorMessages
            errors={errors}
            fields={[
              'title',
              'location',
              'maxParticipants',
              'type',
              'scheduledDate',
            ]}
          />
          <div className="mt-11 flex w-full justify-between">
            <Button
              type="button"
              onClick={handleModalClose}
              variant="secondary"
            >
              취소
            </Button>
            <Button type="submit">추가</Button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
}
