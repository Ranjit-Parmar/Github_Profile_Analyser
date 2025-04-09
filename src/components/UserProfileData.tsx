import UserDetails from './UserDetails';
import UserRepos from './UserRepos';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@radix-ui/react-tabs';
import { useState } from 'react';

const UserProfileData = () => {
  // Manage the selected tab state
  const [selectedTab, setSelectedTab] = useState("userdetails");

  return (
    <>
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full mx-auto">
        <TabsList className="flex justify-center items-center mx-auto mb-6">
          <TabsTrigger
            value="userdetails"
            className={`${selectedTab === 'userdetails' ? 'bg-gray-100' : ''} px-4 py-2 font-semibold text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none`}
          >
            User Details
          </TabsTrigger>
          <TabsTrigger
            value="userrepos"
            className={`${selectedTab === 'userrepos' ? 'bg-gray-100' : ''} px-4 py-2 font-semibold text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none`}
          >
            User Repository
          </TabsTrigger>  
        </TabsList>

        <TabsContent value="userdetails" className="px-4 py-6 rounded-lg">
          <UserDetails />
        </TabsContent>

        <TabsContent value="userrepos" className="px-4 py-6 rounded-lg mt-4">
          <UserRepos />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default UserProfileData;
