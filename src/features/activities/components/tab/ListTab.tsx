import { FaSun, FaMoon } from 'react-icons/fa';
import { useRecoilState } from 'recoil';
import { CurrentActivityTypeAtom } from '../../../../atoms';
import { ActivityListResponseDtoType } from '../../../../types';

type Tab = {
  id: ActivityListResponseDtoType;
  label: string;
};

const tabs: Tab[] = [
  { id: 'LUNCH', label: '점심' },
  { id: 'DINNER', label: '저녁' },
];

export default function ListTab() {
  const [currentActivityType, setCurrentActivityType] = useRecoilState(
    CurrentActivityTypeAtom,
  );

  const handleTabClick = (id: ActivityListResponseDtoType) => {
    setCurrentActivityType(id);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex space-x-2 rounded-full bg-gray-200 px-1 py-1">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`rounded-full px-3.5 py-1.5 ${
              currentActivityType === tab.id
                ? 'bg-white font-semibold text-black'
                : 'text-gray-500'
            }`}
            onClick={() => handleTabClick(tab.id)}
          >
            <div className="flex items-center gap-x-1">
              {tab.label === '점심' ? (
                <>
                  <FaSun className="text-yellow-500" />
                  <p>점심</p>
                </>
              ) : (
                <>
                  <FaMoon className="text-blue-600" />
                  <p>저녁</p>
                </>
              )}
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
