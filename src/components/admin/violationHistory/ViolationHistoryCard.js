import React from 'react'

const ViolationHistoryCard = ({ icon, title, count, onKnowMore }) => {
  return (
    <div><div className="rounded-lg p-6 shadow-md border-gray-300 bg-white transition-colors">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">{icon}</div>
          <div>
            <h3 className="font-semibold  text-lg">{title}</h3>
            <p className="text-sm font-normal   mt-1">{count.toLocaleString()}</p>
          </div>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={onKnowMore}
          className="text-primary hover:text-primary/80 text-sm font-medium flex items-center gap-1 transition-colors"
        >
          Know More
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div></div>
  )
}

export default ViolationHistoryCard