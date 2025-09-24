import { BarChart, Bar, ResponsiveContainer, } from "recharts"

const KPICard = ({ title, value, oldValue, newValue, }) => {
    const chartData = [
        { name: "Old", value: oldValue },
        { name: "New", value: newValue },
    ]
    return (
        <div className="rounded-lg p-6 shadow-md border-gray-300 bg-white transition-colors">
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <h3 className="text-lg font-medium  mb-2 text-balance">{title}</h3>
                    <div className="text-4xl font-bold mb-1">{value}</div>
                </div>

                <div className="w-28 h-28 ml-4 bg-secondary flex items-center rounded-full justify-center">
                    <div className="border-black h-16 w-16 flex items-center justify-center border-l-2 border-b-2 rounded-bl-sm">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 2 }}>
                                {/* ✅ Show axis lines */}


                                <Bar
                                    dataKey="value"
                                    fill="#000000"
                                    radius={[2, 2, 2, 2]}
                                    stroke="#000000"
                                    strokeWidth={1}
                                    label={{
                                        position: "top",  
                                        fontSize: 12,
                                        fill: "#1f2937",
                                        fontWeight: 700,
                                    }}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default KPICard