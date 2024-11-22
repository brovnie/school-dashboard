import Announcements from '@/components/Announcements'
import EventCalendar from '@/components/EventCalendar'
import React from 'react'

const StudentPage = () => {
  return (
    <div className="p-4 flex gap-4 flex-col xl:flex-row">
      <div className='w-full xl:w-2/3'></div>
      <div className="w-full xl:w-1/3 flex flex-col gap-8">
      <EventCalendar/>
      <Announcements/>
      </div>
    </div>
  )
}

export default StudentPage