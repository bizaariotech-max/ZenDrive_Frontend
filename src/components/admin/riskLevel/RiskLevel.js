import React, { useState } from 'react'
import VehicleRiskCard from '../../VehicleRiskCard'

const RiskLevel = () => {
    const [selectedRiskLevel, setSelectedRiskLevel] = useState("High-risk")
    const [selectedCategory, setSelectedCategory] = useState("Driver")
    const [selectedVehicleType, setSelectedVehicleType] = useState("Vehicle")

    const vehicleRiskData = {
        "High-risk": [
            {
                vehicleNumber: "UP 54 H 0354",
                accidents: 20,
                violations: 25,
                challans: 220,
                age: 20,
                kmTravelled: "5.6",
                depot: "Lucknow",
                dlNumber: "DL54H546D",
                fitnessScore: 65,
            },
            {
                vehicleNumber: "UP 54 H 0354",
                accidents: 20,
                violations: 25,
                challans: 220,
                age: 20,
                kmTravelled: "5.6",
                depot: "Lucknow",
                dlNumber: "DL54H546D",
                fitnessScore: 65,
            },
            {
                vehicleNumber: "UP 54 H 0354",
                accidents: 20,
                violations: 25,
                challans: 220,
                age: 20,
                kmTravelled: "5.6",
                depot: "Lucknow",
                dlNumber: "DL54H546D",
                fitnessScore: 65,
            },
        ],
        "Medium-risk": [
            {
                vehicleNumber: "UP 54 H 0355",
                accidents: 12,
                violations: 15,
                challans: 120,
                age: 15,
                kmTravelled: "4.2",
                depot: "Lucknow",
                dlNumber: "DL54H547D",
                fitnessScore: 75,
            },
            {
                vehicleNumber: "UP 54 H 0356",
                accidents: 10,
                violations: 12,
                challans: 100,
                age: 12,
                kmTravelled: "3.8",
                depot: "Lucknow",
                dlNumber: "DL54H548D",
                fitnessScore: 78,
            },
        ],
        "Low-risk": [
            {
                vehicleNumber: "UP 54 H 0357",
                accidents: 5,
                violations: 8,
                challans: 50,
                age: 8,
                kmTravelled: "2.1",
                depot: "Lucknow",
                dlNumber: "DL54H549D",
                fitnessScore: 85,
            },
        ],
    }

    const riskLevels = ["High-risk", "Medium-risk", "Low-risk"]
    const currentRiskData = vehicleRiskData[selectedRiskLevel]
    return (
        <div className="mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
                <h2 className="text-2xl font-bold">Risk Level</h2>

                <div className="flex flex-col sm:flex-row gap-4">
                    {/* Risk Level Filter */}
                    <div className="flex gap-2">
                        {riskLevels.map((level) => (
                            <label key={level} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="riskLevel"
                                    value={level}
                                    checked={selectedRiskLevel === level}
                                    onChange={(e) => setSelectedRiskLevel(e.target.value)}
                                    className="hidden"
                                />
                                <div
                                    className={`flex items-center gap-2 rounded-lg transition-all ${selectedRiskLevel === level
                                            ? "text-primary border-primary"
                                            : "text-muted-foreground border-border "
                                        }`}
                                >
                                    <div
                                        className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${selectedRiskLevel === level ? "border-primary" : "border-muted-foreground"
                                            }`}
                                    >
                                        {selectedRiskLevel === level && (
                                            <div className="w-3 h-3 rounded-full bg-primary"></div>
                                        )}
                                    </div>
                                    <span className="text-base font-medium">{level}</span>
                                </div>
                            </label>
                        ))}
                    </div>

                    {/* Dropdown Filters */}
                    <div className="flex gap-2">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Driver">Driver</option>
                            <option value="All Drivers">All Drivers</option>
                        </select>
                        <select
                            value={selectedVehicleType}
                            onChange={(e) => setSelectedVehicleType(e.target.value)}
                            className="px-4 py-2 bg-card border border-border rounded-lg text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        >
                            <option value="Vehicle">Vehicle</option>
                            <option value="All Vehicles">All Vehicles</option>
                        </select>
                    </div>
                </div>
            </div>

            {/* Vehicle Risk Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {currentRiskData.map((vehicle, index) => (
                    <VehicleRiskCard key={index} vehicleData={vehicle} />
                ))}
            </div>
        </div>
    )
}

export default RiskLevel