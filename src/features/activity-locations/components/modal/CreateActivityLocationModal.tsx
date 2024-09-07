import { useForm } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';
import { ModalAtomFamily } from '../../../../atoms';
import { FormErrorMessages, Input } from '../../../../components/@global';
import ModalLayout from '../../../../components/@global/layout/ModalLayout';
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

  function onValid(data: ActivityLocationCreationRequestDto) {
    createActivityLocation.mutate(data, {
      onError: () => {
        alert(errorMessages.UNKNOWN_ERROR);
      },
      onSettled: () => {
        createActivityLocationModalOpen(false);
        reset();
      },
    });
  }

  function handleModalClose() {
    createActivityLocationModalOpen(false);
    reset();
  }

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
            <button
              type="button"
              onClick={handleModalClose}
              className="px-4 py-2 text-gray-700 bg-gray-300 rounded-md hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-white bg-blue-500 rounded-md hover:bg-blue-600"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
}
