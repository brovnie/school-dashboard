import React from 'react'

function Pagination() {
  return (
    <div className="p-4 flex justify-between text-gray-500">
        <button className="py-4 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Prev</button>
        <div className="text-sm flex items-center gap-2">
            <button className="px-2 rounded-sm bg-sky">1</button>
            <button className="px-2 rounded-sm">2</button>
            <button className="px-2 rounded-sm">3</button>
            <button className="px-2 rounded-sm">...</button>
        </div>
        <button className="py-4 px-4 rounded-md bg-slate-200 text-xs font-semibold disabled:opacity-50 disabled:cursor-not-allowed">Next</button>

    </div>
  )
}

export default Pagination