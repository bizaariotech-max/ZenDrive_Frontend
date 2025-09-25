
import { useState } from "react"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts"

const ViolationTrendsChart = () => {
    const [selectedPeriod, setSelectedPeriod] = useState("Weekly")

    const violationData = {
        Weekly: [
            { name: "Over-speeding", value: 250, color: "#286578" },
            { name: "No Seat Belt", value: 390, color: "#699EAE" },
            { name: "Harsh Accel", value: 385, color: "#699EAE" },
            { name: "Phone Use", value: 380, color: "#699EAE" },
            { name: "Distracted Driving", value: 320, color: "#3FC1E9" },
            { name: "Lane Change", value: 420, color: "#034C63" },
            { name: "Harsh Braking", value: 340, color: "#0A7394" },
            { name: "Smoking", value: 460, color: "#519DB4" },
            { name: "Collision/Fatigues", value: 270, color: "#54717B" },
        ],
        Monthly: [
            { name: "Over-speeding", value: 1200, color: "#286578" },
            { name: "No Seat Belt", value: 1800, color: "#699EAE" },
            { name: "Harsh Accel", value: 1650, color: "#699EAE" },
            { name: "Phone Use", value: 1750, color: "#699EAE" },
            { name: "Distracted Driving", value: 2020, color: "#3FC1E9" },
            { name: "Lane Change", value: 1950, color: "#034C63" },
            { name: "Harsh Braking", value: 1400, color: "#0A7394" },
            { name: "Smoking", value: 2100, color: "#519DB4" },
            { name: "Collision/Fatigues", value: 1100, color: "#54717B" },
        ],
        Yearly: [
            { name: "Over-speeding", value: 15000, color: "#286578" },
            { name: "No Seat Belt", value: 22000, color: "#699EAE" },
            { name: "Harsh Accel", value: 19500, color: "#699EAE" },
            { name: "Phone Use", value: 21000, color: "#699EAE" },
            { name: "Distracted Driving", value: 24500, color: "#3FC1E9" },
            { name: "Lane Change", value: 23000, color: "#034C63" },
            { name: "Harsh Braking", value: 17000, color: "#0A7394" },
            { name: "Smoking", value: 25500, color: "#519DB4" },
            { name: "Collision/Fatigues", value: 13500, color: "#54717B" },
        ],
    }

    const periods = ["Weekly", "Monthly", "Yearly"]
    const currentData = violationData[selectedPeriod]

    const CustomTooltip = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div className="bg-primary text-white p-3 rounded-lg shadow-lg border relative top-0 left-0">
                    <p className="text-base font-semibold">{label}</p>
                    <p className="text-sm">
                        <span className="">Violation No. </span>
                        <span className="font-bold">{payload[0].value.toLocaleString()}</span>
                    </p>
                </div>
            )
        }
        return null
    }

    return (
        <div className="space">
            <h2 className="text-3xl font-semibold mb-6">Violation Trends</h2>

            <div className="bg-white shadow-2xl rounded-lg p-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <h3 className="text-3xl font-semibold">Violation Tracker</h3>
                    <select
                        value={selectedPeriod}
                        onChange={(e) => setSelectedPeriod(e.target.value)}
                        className="px-4 py-2 border border-border rounded-lg text-primary text-sm focus:outline-none focus:ring-2 focus:ring-primary min-w-[120px]"
                    >
                        {periods.map((period) => (
                            <option key={period} value={period}>
                                {period}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="w-full h-[500px] md:h-[550px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={currentData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#374151" opacity={0.3} />
                            <XAxis
                                dataKey="name"
                                stroke="#6B7280"
                                fontSize={12}
                                angle={-45}
                                textAnchor="end"
                                height={80}
                                interval={0}
                            />
                            <YAxis stroke="#6B7280" fontSize={12} domain={[0, "dataMax + 100"]} />
                            <Tooltip content={<CustomTooltip />} />
                            <Bar dataKey="value" radius={[4, 4, 0, 0]} stroke="#0e7490" strokeWidth={1}>
                                {currentData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry?.color} />
                                ))}
                            </Bar>

                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    )
}

export default ViolationTrendsChart
