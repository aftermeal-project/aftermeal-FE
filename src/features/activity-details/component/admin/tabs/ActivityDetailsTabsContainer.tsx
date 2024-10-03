import { ActivityDetailResponseDto } from '../../../../../types';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import { BasicTab, ScheduleTab, UserTab } from '.';
import { TabType } from '../details/AdminActivityDetails';
import 'react-tabs/style/react-tabs.css';

interface ActivityDetailsTabsContainerProps {
  activity: ActivityDetailResponseDto;
  setTab: React.Dispatch<React.SetStateAction<TabType>>;
}

export default function zaActivityDetailsTabsContainer({
  activity,
  setTab,
}: ActivityDetailsTabsContainerProps) {
  const handleTabClick = (tab: TabType) => {
    setTab(tab);
  };

  return (
    <Tabs>
      <TabList>
        <Tab onClick={() => handleTabClick('Basic')}>기본 정보</Tab>
        <Tab onClick={() => handleTabClick('Schedule')}>일정 정보</Tab>
        <Tab onClick={() => handleTabClick('User')}>참가자 목록</Tab>
      </TabList>

      <TabPanel className="px-3 mt-8">
        <BasicTab
          title={activity.title}
          location={activity.location}
          type={activity.type}
          maxParticipants={activity.maxParticipants}
        />
      </TabPanel>

      <TabPanel className="px-3">
        <ScheduleTab
          scheduledDate={activity.scheduledDate}
          applicationStartAt={activity.applicationStartAt}
          applicationEndAt={activity.applicationEndAt}
        />
      </TabPanel>

      <TabPanel className="px-3">
        <UserTab participations={activity.participations} />
      </TabPanel>
    </Tabs>
  );
}
