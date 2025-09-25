const VehicleRiskCard = ({ vehicleData }) => {
  const { vehicleNumber, accidents, violations, challans, age, kmTravelled, depot, dlNumber, fitnessScore } =
    vehicleData

  const fitnessLevels = [
    { label: "Useless", color: "bg-red-500", textColor: "text-white" },
    { label: "Worth", color: "bg-yellow-500", textColor: "text-white" },
    { label: "Not Good", color: "bg-orange-500", textColor: "text-white" },
    { label: "Good", color: "bg-green-400", textColor: "text-white" },
    { label: "Better", color: "bg-green-600", textColor: "text-white" },
  ]

  const getFitnessIndex = (score) => {
    if (score < 20) return 0 // Useless
    if (score < 40) return 1 // Worth
    if (score < 60) return 2 // Not Good
    if (score < 80) return 3 // Good
    return 4 // Better
  }

  const currentFitnessIndex = getFitnessIndex(fitnessScore)

  return (
    <div className="bg-white border border-gray-300 rounded-lg shadow-md p-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold">Vehicle Number</h3>
          <p className="text-sm text-muted-foreground">{vehicleNumber}</p>
        </div>
        <button className="text-primary hover:text-blue-800 text-sm font-medium">View Details</button>
      </div>

      {/* Statistics */}
      <div className="flex justify-between items-center">
        <div className="text-center">
          <div className="text-2xl font-bold ">{accidents}</div>
          <div className="text-xs text-muted-foreground">No of Accidents</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold ">{violations}</div>
          <div className="text-xs text-muted-foreground">No of Violations</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold ">{challans}</div>
          <div className="text-xs text-muted-foreground">No of Challans</div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="space-y-2">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Age/ KM Travelled</span>
          <span className="text-sm  font-medium">
            {age}/{kmTravelled} KM
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">RO/Depot : {depot}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">DL No. {dlNumber}</span>
        </div>
      </div>

      {/* Vehicle Fitness Score */}
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-foreground">Vehicle Fitness Score</h4>
        <div className="relative">
          <div className="flex rounded-none overflow-hidden">
            {fitnessLevels.map((level, index) => (
              <div
                key={level.label}
                className={`flex-1 py-2 px-3 text-xs font-medium text-center ${level.color} ${level.textColor}`}
              >
                {level.label}
              </div>
            ))}
          </div>
          <div
            className="absolute -bottom-2 transform -translate-x-1/2"
            style={{ left: `${(currentFitnessIndex + 0.5) * 20}%` }}
          >
            <div className="w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-l-transparent border-r-transparent border-t-green-500"></div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 pt-2">
        <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
          Input Filled
        </button>
        <button className="flex-1 bg-teal-600 hover:bg-teal-700 text-white py-2 px-4 rounded-lg text-sm font-medium">
          Input Filled
        </button>
      </div>
    </div>
  )
}

export default VehicleRiskCard
