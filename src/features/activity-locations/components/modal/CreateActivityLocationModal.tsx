import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import { Button, FormErrorMessages, Input } from '../../../../components';
import ModalLayout from '../../../../components/layout/ModalLayout';
import {
  AtomKeys,
  createActivityValidationRules,
  errorMessages,
} from '../../../../constants';
import { ActivityLocationCreationRequestDto } from '../../../../types';
import useCreateActivityLocation from '../../api/create-activitiy-location';

export default function CreateActivityLocationModal() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ActivityLocationCreationRequestDto>();

  const { createActivityLocation } = useCreateActivityLocation();

  const createActivityLocationModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY_LOCATION_MODAL),
  );

  const onValid = (data: ActivityLocationCreationRequestDto) => {
    createActivityLocation.mutate(data, {
      onError: () => {
        alert(errorMessages.UNKNOWN_ERROR);
      },
      onSettled: () => {
        createActivityLocationModalOpen(false);
        reset();
      },
    });
  };

  const handleModalClose = () => {
    createActivityLocationModalOpen(false);
    reset();
  };

  return (
    <ModalLayout setModal={createActivityLocationModalOpen}>
      <div
        className="p-6 mx-auto bg-white rounded-lg shadow-lg w-80"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-8 text-lg font-bold">장소 추가</h2>
        <form onSubmit={handleSubmit(onValid)}>
          <Input<ActivityLocationCreationRequestDto>
            label="장소명"
            name="name"
            type="text"
            placeholder="장소명"
            register={register}
            validationRules={createActivityValidationRules.titleValidationRules}
            margin="mb-4"
            error={errors.name}
          />
          <FormErrorMessages errors={errors} fields={['name']} />
          <div className="flex justify-between w-full mt-11">
            <Button
              type="button"
              onClick={handleModalClose}
              variant="secondary"
            >
              취소
            </Button>
            <Button type="submit" onClick={handleModalClose}>
              추가
            </Button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
}
