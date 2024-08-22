type UserType = 'STUDENT' | 'TEACHER';

interface UserTypeSelectorProps {
  selectedType: UserType;
  onChangeType: (type: UserType) => void;
}

export default function AuthUserTypeSelector({
  selectedType,
  onChangeType,
}: UserTypeSelectorProps) {
  return (
    <fieldset className="mb-5">
      <legend className="sr-only">유저 유형 선택</legend>
      <div className="flex items-center justify-center w-full gap-5">
        <label className="flex flex-col items-center cursor-pointer">
          <input
            type="radio"
            name="type"
            value="STUDENT"
            checked={selectedType === 'STUDENT'}
            onChange={() => onChangeType('STUDENT')}
            className="hidden"
          />
          <span
            className={`block border px-5 py-2 ${selectedType === 'STUDENT' ? 'bg-indigo-600 text-white' : 'bg-gray-100'} rounded-md`}
          >
            학생
          </span>
        </label>
        <label className="flex flex-col items-center cursor-pointer">
          <input
            type="radio"
            name="type"
            value="TEACHER"
            checked={selectedType === 'TEACHER'}
            onChange={() => onChangeType('TEACHER')}
            className="hidden"
          />
          <span
            className={`block border px-5 py-2 ${selectedType === 'TEACHER' ? 'bg-indigo-600 text-white' : 'bg-gray-100'} rounded-md`}
          >
            선생님
          </span>
        </label>
      </div>
    </fieldset>
  );
}
