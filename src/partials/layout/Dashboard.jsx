import React, { useState } from 'react';
import Sidebar from '../containers/Sidebar';
import Header from '../containers/Header';

const Dashboard = ({ title, children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="px-4 sm:px-6 lg:px-8 py-8 w-full mx-auto">
          <div className="sm:flex sm:justify-between sm:items-center mb-8">
            <h1 className="text-2xl">{title}</h1>

            {/* <div
             className="grid grid-flow-col sm:auto-cols-max justify-start sm:justify-end gap-2">
              <DatePicker />
            </div> */}
          </div>

          {children}
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
