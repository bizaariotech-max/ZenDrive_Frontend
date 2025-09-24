import React from 'react'
import '../../assets/styles/home.css'
import FilterSidebar from '../../components/admin/Filters/FilterSidebar'
import Overview from '../../components/admin/Overview/Overview'
import DriveRatingQuickAction from '../../components/admin/DriveRatingQuickActions/DriveRatingQuickAction'
import ViolationTracker from '../../components/admin/ViolationTracker/ViolationTracker'
import ViolationTrackerGraph from '../../components/admin/ViolationTrackerGraph/ViolationTrackerGraph'
import KPIntigator from '../../components/admin/keyPerformance/KPIntigator'

const Home = () => {
  return (
    <div className='p-4'>
      <FilterSidebar />
      <Overview />
      <DriveRatingQuickAction />
      <KPIntigator /> 
      {/* <LiveFleetTracking2 />
      <DangerousDriving /> */}
      <ViolationTracker />
      <ViolationTrackerGraph />
     
    </div>
  )
}

export default Home