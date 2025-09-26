import React from 'react'
import LiveFleetTracking2 from '../../components/admin/LiveFleetTracking2/LiveFleetTracking2'
import DangerousDriving from '../../components/admin/DangerousDriving/DangerousDriving'
import ViolationHistory from '../../components/admin/violationHistory'

const CommandCenter = () => {
    return (
        <div className='p-4'>
            <ViolationHistory />
            <LiveFleetTracking2 />
            <DangerousDriving />
        </div>
    )
}

export default CommandCenter