import React from 'react'

const Announcements = () => {
  return (
    <div className='bg-white p-4 rounded-md'>
        <div className='flex items-center justify-between'>
            <h2 className="text-xl font-semibold">Announcements</h2>
            <span className="text-xs text-gray-400">View All</span>
        </div>
        <div className='flex flex-col gap-4 mt-4'>
            <div className="bg-sky rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium">Lorem ipsum dolor sit.</h3>
                    <span className='text-xs text-gray-400 bg-white rounded-md py-1 px-1'>2025-01-01</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit ...</p>
            </div>
            <div className="bg-purpleLight rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium">Lorem ipsum dolor sit.</h3>
                    <span className='text-xs text-gray-400 bg-white rounded-md py-1 px-1'>2025-01-01</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit ...</p>

            </div>
            <div className="bg-yellowLight rounded-md p-4">
                <div className="flex items-center justify-between">
                    <h3 className="font-medium">Lorem ipsum dolor sit.</h3>
                    <span className='text-xs text-gray-400 bg-white rounded-md py-1 px-1'>2025-01-01</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">Lorem ipsum dolor sit ...</p>

            </div>
        </div>
    </div>
  )
}

export default Announcements