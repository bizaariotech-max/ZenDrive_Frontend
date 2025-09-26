import React, { useState } from 'react'
import ViolationHistoryCard from './ViolationHistoryCard'

const ViolationHistory = () => {
     const [assetType, setAssetType] = useState("68cb9d1f07f450963b4cbd22")
     const [selectedViolationCategory, setSelectedViolationCategory] = useState("Choose")
    const violationHistoryData = [
        {
            title: "Collisions",
            count: 1200,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zM12 17c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zM15.1 8H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z" />
                </svg>
            ),
        },
        {
            title: "Overspeeding",
            count: 1200,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            ),
        },
        {
            title: "Harsh Braking",
            count: 1300,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
            ),
        },
        {
            title: "Cornering",
            count: 1300,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 11H7l3-3 3 3h-2v8h-2v-8zm1-9C4.48 2 0 6.48 0 12s4.48 10 10 10 10-4.48 10-10S15.52 2 10 2z" />
                </svg>
            ),
        },
        {
            title: "Fatigue",
            count: 1200,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            ),
        },
        {
            title: "Distraction",
            count: 1200,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
            ),
        },
        {
            title: "Phone Calling",
            count: 1300,
            icon: (
                <svg className="w-6 h-6 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                </svg>
            ),
        },
    ]

    const handleKnowMore = (violationType) => {
        console.log(`Know more clicked for: ${violationType}`)
        // Add navigation or modal logic here
    }
    return (
        <>
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8 mt-6">
                <h2 className="text-3xl font-semibold">Violation History</h2>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Risk Level Filter */}
                    <div className="flex gap-2">
                        {[{
                            "_id": "68cb9d1f07f450963b4cbd22",
                            "lookup_type": "asset_type",
                            "lookup_value": "Driver",
                        },
                        {
                            "_id": "68cb9d3b07f450963b4cbd3a",
                            "lookup_type": "asset_type",
                            "lookup_value": "Vehicle",
                        }].map((level) => (
                            <label key={level} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="riskLevel"
                                    value={level}
                                    checked={assetType === level?._id}
                                    onChange={(e) => setAssetType(e.target.value)}
                                    className="hidden"
                                />
                                <div
                                    className={`flex items-center gap-2 rounded-lg transition-all ${assetType === level?._id
                                        ? "text-primary border-primary"
                                        : "text-muted-foreground border-border "
                                        }`}
                                >
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${assetType === level?._id ? "border-primary" : "border-muted-foreground"
                                            }`}
                                    >
                                        {assetType === level?._id && (
                                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                                        )}
                                    </div>
                                    <span className="text-base font-medium">{level?.lookup_value}</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    {/* Dropdown Filters */}
                    <div className="flex gap-2">
                        <select
                            value={selectedViolationCategory}
                            onChange={(e) => setSelectedViolationCategory(e.target.value)}
                            className="px-4 py-2  border border-gray-300 rounded-lg text-muted-foreground text-base focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option selected disabled>Select an option</option>
                            <option value="All Drivers">All Drivers</option>
                        </select>
                    </div>
                </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-6">
                {violationHistoryData.map((violation, index) => (
                    <ViolationHistoryCard
                        key={index}
                        icon={violation.icon}
                        title={violation.title}
                        count={violation.count}
                        onKnowMore={() => handleKnowMore(violation.title)}
                    />
                ))}
            </div>
        </>
    )
}

export default ViolationHistory