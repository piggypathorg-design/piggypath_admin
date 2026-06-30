import React from 'react';
import ProfileTopBar from '../components/profile/ProfileTopBar';
import ProfileIdentityCard from '../components/profile/ProfileIdentityCard';
import FinancialSkillRadar from '../components/profile/FinancialSkillRadar';
import XpGrowthChart from '../components/profile/XpGrowthChart';
import ActivityCalendar from '../components/profile/ActivityCalendar';
import FriendsSearchList from '../components/profile/FriendsSearchList';
import JourneyCollection from '../components/profile/JourneyCollection';
import MessagesPanel from '../components/profile/MessagesPanel';
import BadgesAndCollections from '../components/profile/BadgesAndCollections';
import AccountAndSettings from '../components/profile/AccountAndSettings';

const ProfilePage = () => {
  return (
    <div className="w-full min-h-screen pb-[80px]"> {/* Add bottom padding for the nav bar */}
      {/* Top Bar */}
      <ProfileTopBar />

      <div className="max-w-[1400px] mx-auto px-6 py-8">
        
        {/* 2-Column Section */}
        <div className="flex flex-col lg:flex-row gap-8 items-stretch mb-6">
          
          {/* Left Column */}
          <div className="w-full lg:w-[45%] flex flex-col min-w-0 shrink-0">
            <ProfileIdentityCard />
            <JourneyCollection />
            <FriendsSearchList />
            <MessagesPanel />
          </div>

          {/* Right Column */}
          <div className="w-full lg:w-[55%] flex flex-col min-w-0">
            <FinancialSkillRadar />
            <ActivityCalendar />
            <XpGrowthChart />
          </div>
          
        </div>

        {/* Full Width Sections */}
        <div className="flex flex-col">
          <BadgesAndCollections />
          <AccountAndSettings />
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
