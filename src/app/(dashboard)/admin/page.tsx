import UserCard from '@/components/UserCard'
import React from 'react'

function AdminPage() {
  return (
    <div className="flex p4 flex-col md:flex-row">
      <div className="w-full lg:w-2/3">
      {/*User Cards */}
        <div className="flex gap-4 justify-between flex-wrap">
          <UserCard type="student"/>
          <UserCard type="teacher"/>
          <UserCard type="parent"/>
          <UserCard type="stuff"/>
        </div>

      </div>
      <div className="w-full lg:w-1/3">
      </div>
    </div>
  )
}

export default AdminPage