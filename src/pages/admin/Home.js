import React from 'react'
import '../../assets/styles/home.css'
import FilterSidebar from '../../components/admin/Filters/FilterSidebar'
import Overview from '../../components/admin/Overview/Overview'
import DriveRatingQuickAction from '../../components/admin/DriveRatingQuickActions/DriveRatingQuickAction'
import ViolationTracker from '../../components/admin/ViolationTracker/ViolationTracker'
import ViolationTrackerGraph from '../../components/admin/ViolationTrackerGraph/ViolationTrackerGraph'
import KPIntigator from '../../components/admin/keyPerformance/KPIntigator'
import ViolationTrendsChart from '../../components/ViolationTrendsChart'
import RiskLevel from '../../components/admin/riskLevel/RiskLevel'
import StatusPieChart from '../../components/common/StatusPieChart'

const Home = () => {
  const driverStatusData = [
    { name: "On Duty", value: 35, color: "#FCD34D" },
    { name: "Undergoing Training", value: 20, color: "#3B82F6" },
    { name: "Undergoing Medical Treatments", value: 15, color: "#EF4444" },
    { name: "Recommended Only Day Duty", value: 12, color: "#8B5CF6" },
    { name: "Recommended Only Short Trips", value: 10, color: "#8B5CF6" },
    { name: "Recommended Off Road Duty", value: 8, color: "#6B7280" },
  ]

  const vehicleStatusData = [
    { name: "On Duty", value: 40, color: "#FCD34D" },
    { name: "Undergoing Maintenance", value: 18, color: "#3B82F6" },
    { name: "Critical Issues", value: 12, color: "#EF4444" },
    { name: "Recommended Only Day Duty", value: 15, color: "#8B5CF6" },
    { name: "Recommended Only Short Trips", value: 0, color: "#8B5CF6" },
    { name: "Recommended Off Road Duty", value: 5, color: "#6B7280" },
  ]
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

      <div className="space">
        <RiskLevel />
      </div>
      <div className="space">
        <h2 className="text-2xl font-bold mb-6">Current Status</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatusPieChart title="Driver Status" totalCount={1200} data={driverStatusData} />
          <StatusPieChart title="Vehicle Status" totalCount={1200} data={vehicleStatusData} />
        </div>
      </div>
      <ViolationTrendsChart />

    </div>
  )
}

export default Home