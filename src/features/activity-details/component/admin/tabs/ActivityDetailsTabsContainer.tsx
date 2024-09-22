import { ActivityDetailResponseDto } from '../../../../../types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BasicTab, ScheduleTab, UserTab } from '.';
import { TabType } from '../details/AdminActivityDetails';

interface ActivityDetailsTabsContainerProps {
  activity: ActivityDetailResponseDto;
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
}

export default function ActivityDetailsTabsContainer({
  activity,
  setTab,
}: ActivityDetailsTabsContainerProps) {
  const handleTabClick = (tab: TabType) => {
    setTab(tab);
  };

  return (
    <Tabs>
      <TabList className="gap-x-2 border-b border-gray-300">
        <Tab onClick={() => handleTabClick('Basic')}>기본 정보</Tab>
        <Tab onClick={() => handleTabClick('Schedule')}>일정 정보</Tab>
        <Tab onClick={() => handleTabClick('User')}>참가자 목록</Tab>
      </TabList>

      <TabPanel className="mt-8 px-3">
        <BasicTab
          title={activity.title}
          location={activity.location}
          type={activity.type}
          status={activity.status}
          maxParticipants={activity.maxParticipants}
        />
      </TabPanel>

      <TabPanel className="px-3">
        <ScheduleTab
          scheduledDate={activity.scheduledDate}
          applicationStartDate={activity.applicationStartDate}
          applicationEndDate={activity.applicationEndDate}
        />
      </TabPanel>

      <TabPanel className="px-3">
        <UserTab participations={activity.participations} />
      </TabPanel>
    </Tabs>
  );
}
