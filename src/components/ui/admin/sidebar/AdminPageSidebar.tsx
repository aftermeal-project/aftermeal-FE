import { FaUsers, FaClipboardList, FaUserCog } from 'react-icons/fa';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { useState } from 'react';
import { Tab } from '../../../../pages/admin/AdminPage';

interface AdminPageSidebarProps {
  selectedTab: Tab;
  setSelectedTab: React.Dispatch<React.SetStateAction<Tab>>;
}

export default function AdminPageSidebar({
  selectedTab,
  setSelectedTab,
}: AdminPageSidebarProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <aside
      className={`h-full bg-gray-900 text-white ${
        isSidebarOpen ? 'w-64' : 'w-20'
      } transition-all duration-300`}
    >
      <div className="flex items-center justify-between p-4">
        <h1 className={`text-xl font-bold ${!isSidebarOpen && 'hidden'}`}>
          Admin Panel
        </h1>
        <button onClick={handleToggleSidebar} className="text-white">
          {isSidebarOpen ? (
            <AiOutlineClose size={24} />
          ) : (
            <AiOutlineMenu size={24} />
          )}
        </button>
      </div>
      <nav className="mt-4">
        <ul>
          <li
            className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-700 ${
              selectedTab === 'activities' ? 'bg-gray-700' : ''
            }`}
            onClick={() => setSelectedTab('activities')}
          >
            <FaClipboardList size={20} />
            <span className={`ml-4 ${!isSidebarOpen && 'hidden'}`}>
              활동 관리
            </span>
          </li>

          <li
            className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-700 ${
              selectedTab === 'users' ? 'bg-gray-700' : ''
            }`}
            onClick={() => setSelectedTab('users')}
          >
            <FaUsers size={20} />
            <span className={`ml-4 ${!isSidebarOpen && 'hidden'}`}>
              사용자 관리
            </span>
          </li>

          <li
            className={`flex cursor-pointer items-center px-4 py-2 hover:bg-gray-700 ${
              selectedTab === 'participants' ? 'bg-gray-700' : ''
            }`}
            onClick={() => setSelectedTab('participants')}
          >
            <FaUserCog size={20} />
            <span className={`ml-4 ${!isSidebarOpen && 'hidden'}`}>
              참가자 관리
            </span>
          </li>
        </ul>
      </nav>
    </aside>
  );
}
