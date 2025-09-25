import React, { useState } from 'react'
import KPICard from '../../common/KPICard'
import StatusPieChart from '../../common/StatusPieChart'
import RiskLevel from '../riskLevel/RiskLevel'

const KPIntigator = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("This Week")

    // Sample KPI data for different time periods
    const kpiData = {
        "This Week": [
            { title: "Accident Reduction", value: 95, oldValue: 85, newValue: 95 },
            { title: "Violations", value: 95, oldValue: 88, newValue: 95 },
            { title: "Challans", value: 95, oldValue: 82, newValue: 95 },
            { title: "Fatalities", value: 95, oldValue: 90, newValue: 95 },
            { title: "Injuries Reductions", value: 95, oldValue: 87, newValue: 95 },
            { title: "Financial Loss (Direct)", value: 95, oldValue: 83, newValue: 95 },
            { title: "Financial Loss (Indirect)", value: 95, oldValue: 89, newValue: 95 },
            { title: "DL Suspensions", value: 95, oldValue: 91, newValue: 95 },
            { title: "Vehicle Seizers", value: 95, oldValue: 86, newValue: 95 },
        ],
        "This Month": [
            { title: "Accident Reduction", value: 92, oldValue: 80, newValue: 92 },
            { title: "Violations", value: 88, oldValue: 75, newValue: 88 },
            { title: "Challans", value: 94, oldValue: 85, newValue: 94 },
            { title: "Fatalities", value: 90, oldValue: 82, newValue: 90 },
            { title: "Injuries Reductions", value: 93, oldValue: 88, newValue: 93 },
            { title: "Financial Loss (Direct)", value: 89, oldValue: 78, newValue: 89 },
            { title: "Financial Loss (Indirect)", value: 91, oldValue: 84, newValue: 91 },
            { title: "DL Suspensions", value: 87, oldValue: 79, newValue: 87 },
            { title: "Vehicle Seizers", value: 96, oldValue: 89, newValue: 96 },
        ],
        "This Quarter": [
            { title: "Accident Reduction", value: 89, oldValue: 75, newValue: 89 },
            { title: "Violations", value: 85, oldValue: 70, newValue: 85 },
            { title: "Challans", value: 91, oldValue: 80, newValue: 91 },
            { title: "Fatalities", value: 87, oldValue: 78, newValue: 87 },
            { title: "Injuries Reductions", value: 90, oldValue: 83, newValue: 90 },
            { title: "Financial Loss (Direct)", value: 86, oldValue: 72, newValue: 86 },
            { title: "Financial Loss (Indirect)", value: 88, oldValue: 79, newValue: 88 },
            { title: "DL Suspensions", value: 84, oldValue: 74, newValue: 84 },
            { title: "Vehicle Seizers", value: 93, oldValue: 85, newValue: 93 },
        ],
        "This Year": [
            { title: "Accident Reduction", value: 86, oldValue: 68, newValue: 86 },
            { title: "Violations", value: 82, oldValue: 65, newValue: 82 },
            { title: "Challans", value: 88, oldValue: 75, newValue: 88 },
            { title: "Fatalities", value: 84, oldValue: 72, newValue: 84 },
            { title: "Injuries Reductions", value: 87, oldValue: 78, newValue: 87 },
            { title: "Financial Loss (Direct)", value: 83, oldValue: 67, newValue: 83 },
            { title: "Financial Loss (Indirect)", value: 85, oldValue: 74, newValue: 85 },
            { title: "DL Suspensions", value: 81, oldValue: 69, newValue: 81 },
            { title: "Vehicle Seizers", value: 90, oldValue: 80, newValue: 90 },
        ],
    }
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

    const periods = ["This Week", "This Month", "This Quarter", "This Year"]
    const currentData = kpiData[selectedPeriod]

    return (
        <>
            <div className="space">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
                    <h1 className="text-2xl font-bold">Key Performance Indicators (KPIs)</h1>

                    {/* Period Filter */}
                    <div className="flex flex-wrap gap-2">
                        {periods.map((period) => (
                            <label key={period} className="flex items-center flex-wrap cursor-pointer">
                                <input
                                    type="radio"
                                    name="period"
                                    value={period}
                                    checked={selectedPeriod === period}
                                    onChange={(e) => setSelectedPeriod(e.target.value)}
                                    className="hidden"
                                />
                                <div
                                    className={`flex items-center gap-2 rounded-lg  transition-all ${selectedPeriod === period
                                            ? "text-primary border-primary"
                                            : "text-muted-foreground border-border "
                                        }`}
                                >
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedPeriod === period ? "border-primary" : "border-muted-foreground"
                                            }`}
                                    >
                                        {selectedPeriod === period && (
                                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                                        )}
                                    </div>
                                    <span className="text-base font-medium">{period}</span>
                                </div>
                            </label>
                        ))}
                    </div>
                </div>

                {/* KPI Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentData.map((kpi, index) => (
                        <KPICard
                            key={index}
                            title={kpi.title}
                            value={kpi.value}
                            oldValue={kpi.oldValue}
                            newValue={kpi.newValue}
                            period={selectedPeriod}
                        />
                    ))}
                </div>
            </div>
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
        </>
    )
}

export default KPIntigator