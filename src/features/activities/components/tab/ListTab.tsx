import { Dispatch, SetStateAction } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';

type Tab = {
  id: string;
  label: string;
};

const tabs: Tab[] = [
  { id: 'LUNCH', label: '점심' },
  { id: 'DINNER', label: '저녁' },
];

interface ListTabProps {
  selectedTab: string;
  setSelectedTab: Dispatch<SetStateAction<string>>;
}

export default function ListTab({ selectedTab, setSelectedTab }: ListTabProps) {
  const handleTabClick = (id: string) => {
    setSelectedTab(id);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="flex px-1 py-1 space-x-2 bg-gray-200 rounded-full">
        {tabs.map(tab => (
          <button
            key={tab.id}
            className={`rounded-full px-3.5 py-1.5 ${
              selectedTab === tab.id
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
