import { UseFormReturn } from 'react-hook-form';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { ActiveIdAtomFamily, ModalAtomFamily } from '../../../../atoms';
import { Button, FormErrorMessages, Input } from '../../../../components';
import ModalLayout from '../../../../components/layout/ModalLayout';
import { AtomKeys, signupValidationRules } from '../../../../constants';
import { UserUpdateRequestDto } from '../../../../types';
import { SelectField } from '../../../activities';
import { statusOptions, typeOptions } from '../../constants/options';
import useUpdateUser from '../../api/update-user';

interface UpdateUserModalProps {
  useForm: UseFormReturn<UserUpdateRequestDto>;
}

export default function UpdateUserModal({ useForm }: UpdateUserModalProps) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm;

  const { updateUser } = useUpdateUser();

  const activeUserId = useRecoilValue(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_USER_ID),
  );
  const resetActiveUserId = useResetRecoilState(
    ActiveIdAtomFamily(AtomKeys.ACTIVE_USER_ID),
  );

  const updateUserModalOpen = useSetRecoilState(
    ModalAtomFamily(AtomKeys.UPDATE_USER_MODAL),
  );

  function onValid(data: UserUpdateRequestDto) {
    updateUser({ userId: String(activeUserId), data: data });
    updateUserModalOpen(false);
    resetActiveUserId();
  }

  function handleModalClose() {
    updateUserModalOpen(false);
    resetActiveUserId();
  }

  const type = watch('type');

  return (
    <ModalLayout setModal={updateUserModalOpen}>
      <div
        className="p-6 mx-auto bg-white rounded-lg shadow-lg w-80"
        onClick={e => e.stopPropagation()}
      >
        <h2 className="mb-8 text-lg font-bold">유저 업데이트</h2>
        <form onSubmit={handleSubmit(onValid)}>
          <Input<UserUpdateRequestDto>
            label="이름"
            name="name"
            type="text"
            placeholder="이름"
            register={register}
            validationRules={signupValidationRules.nameValidationRules}
            margin="mb-4"
            error={errors.name}
          />
          <div className="mb-4">
            <label htmlFor="type" className="inline-block mb-2 text-base">
              유형
            </label>
            <SelectField<UserUpdateRequestDto>
              title="type"
              options={typeOptions}
              register={register}
              setValue={setValue}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="inline-block mb-2 text-base">
              상태
            </label>
            <SelectField<UserUpdateRequestDto>
              title="status"
              options={statusOptions}
              register={register}
              setValue={setValue}
            />
          </div>
          {type === 'STUDENT' && (
            <Input<UserUpdateRequestDto>
              label="기수"
              name="generationNumber"
              type="number"
              placeholder="기수"
              register={register}
              validationRules={signupValidationRules.generationValidationRules}
              margin="mb-4"
              error={errors.generationNumber}
            />
          )}
          <FormErrorMessages
            errors={errors}
            fields={
              type === 'STUDENT'
                ? ['name', 'type', 'status', 'generationNumber']
                : ['name', 'status', 'generationNumber']
            }
          />
          <div className="flex justify-between w-full mt-11">
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
