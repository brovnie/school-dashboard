import Announcements from '@/components/Announcements'
import AttendanceChart from '@/components/AttendanceChart'
import CountChart from '@/components/CountChart'
import EventCalendar from '@/components/EventCalendar'
import FinanceChart from '@/components/FinanceChart'
import UserCard from '@/components/UserCard'
import React from 'react'

function AdminPage() {
  return (
    <div className="flex p4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3 flex flex-col gap-8">
      {/* User Cards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student"/>
          <UserCard type="teacher"/>
          <UserCard type="parent"/>
          <UserCard type="stuff"/>
        </div>
        {/* Charts Middle*/}
        <div className="flex gap-4 flex-col lg:flex-row">
           {/* Radial Bar Chart*/}
           <div className="w-full lg:w-1/3 h-[450px]">
            <CountChart/>
           </div>
           {/* Bar Chart*/}
           <div className="w-full lg:w-2/3 h-[450px]">
            <AttendanceChart/>
           </div>
        </div>
        <div className="w-full h-[500px]">
          <FinanceChart/>
        </div>
      </div>
      <div className="w-full lg:w-1/3 flex flex-col gap-8">
      <EventCalendar/>
      <Announcements/>
      </div>
    </div>
  )
}

export default AdminPage