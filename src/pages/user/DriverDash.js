import React from 'react'
import FitnessAssessment from '../../components/admin/FitnessAssessment/FitnessAssessment '
import DriverHabits from '../../components/admin/DriverHabits/DriverHabits'
import HealthAssessment from '../../components/admin/HealthAssessment/HealthAssessment'
import DriverHealthStatistics from '../../components/admin/DriverHealthStatistics/DriverHealthStatistics'
import TopVioletears from '../../components/admin/TopVioletears/TopVioletears'
import ImpactStudy from '../../components/admin/ImpactStudy/ImpactStudy'

const DriverDash = () => {
    return (
        <div className='p-4'>
            <FitnessAssessment />
            <DriverHabits />
            <HealthAssessment />
            <DriverHealthStatistics />
            <TopVioletears />
            <ImpactStudy />
        </div>
    )
}

export default DriverDash