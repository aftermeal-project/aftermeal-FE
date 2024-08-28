import { useRecoilState } from 'recoil';
import ModalLayout from '../../@global/layout/ModalLayout';
import { useForm, SubmitHandler } from 'react-hook-form';
import { ModalAtomFamily } from '../../../atoms';
import { AtomKeys } from '../../../constants';

interface ActivityFormValues {
  name: string;
  maxParticipants: number;
  location: string;
}

export default function CreateActivityModal() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ActivityFormValues>({
    defaultValues: {
      name: '',
      maxParticipants: 0,
      location: '',
    },
  });

  const [_, setModal] = useRecoilState(
    ModalAtomFamily(AtomKeys.CREATE_ACTIVITY),
  );

  const onSubmit: SubmitHandler<ActivityFormValues> = data => {
    setModal(false);
  };

  function handleModalClose() {
    setModal(false);
  }

  return (
    <ModalLayout setModal={setModal}>
      <div className="mx-auto max-w-sm rounded-lg bg-white p-6 shadow-lg">
        <h2 className="mb-4 text-lg font-bold">활동 추가</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              이름
            </label>
            <input
              type="text"
              {...register('name', { required: '이름은 필수입니다.' })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              최대 참가자 수
            </label>
            <input
              type="number"
              {...register('maxParticipants', {
                required: '최대 참가자 수는 필수입니다.',
                min: {
                  value: 1,
                  message: '최대 참가자 수는 1 이상이어야 합니다.',
                },
              })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.maxParticipants && (
              <p className="mt-1 text-sm text-red-500">
                {errors.maxParticipants.message}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              장소
            </label>
            <input
              type="text"
              {...register('location', { required: '장소는 필수입니다.' })}
              className="mt-1 w-full rounded-md border border-gray-300 px-3 py-2"
            />
            {errors.location && (
              <p className="mt-1 text-sm text-red-500">
                {errors.location.message}
              </p>
            )}
          </div>
          <div className="mt-4 flex justify-end space-x-2">
            <button
              type="button"
              onClick={handleModalClose}
              className="rounded-md bg-gray-300 px-4 py-2 text-gray-700 hover:bg-gray-400"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
            >
              추가
            </button>
          </div>
        </form>
      </div>
    </ModalLayout>
  );
}
