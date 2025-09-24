import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from "recharts"

const StatusPieChart = ({title, totalCount, data,}) => {
    const CustomLegend = ({ payload }) => {
        return (
            <div className="flex flex-wrap gap-x-4 gap-y-2 justify-center mt-4">
                {payload.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: entry.color }} />
                        <span className="text-sm text-muted-foreground">{entry.value}</span>
                    </div>
                ))}
            </div>
        )
    }
    return (
        <div className="bg-white border border-gray-300  shadow-md rounded-lg p-6">
            <div className="mb-4">
                <h3 className="text-lg font-semibold">{title}  <span className="text-sm text-muted-foreground">
                    (Total no {title.split(" ")[0].toLowerCase()}: {totalCount})
                </span></h3>
               
            </div>

            <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart width={350} height={350}>
                        <Pie data={data} cx="50%" cy="45%" labelLine={false} outerRadius={100} fill="#8884d8" dataKey="value">
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color}  />
                            ))}
                        </Pie>
                        <Legend content={<CustomLegend />} />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default StatusPieChart