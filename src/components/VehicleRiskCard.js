import FormButton from "./common/FormButton"

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
                    <h3 className="font-semibold text-xl">Vehicle Number</h3>
                    <p className="text-sm text-muted-foreground">{vehicleNumber}</p>
                </div>
                <button className="text-primary hover:text-blue-800 text-base underline font-medium">View Details</button>
            </div>

            {/* Statistics */}
            <div className="flex justify-between items-center">
                <div className="">
                    <h4 className="text-2xl font-bold leading-3">{accidents} <span className="text-sm text-muted-foreground font-normal">No of Accidents</span></h4>
                </div>
                <div className="">
                    <h4 className="text-2xl font-bold leading-3">{violations}  <span className="text-sm text-muted-foreground font-normal">No of Violations</span></h4>
                </div>
                <div className="">
                    <h4 className="text-2xl font-bold leading-3">{challans} <span className="text-sm text-muted-foreground font-normal">No of Challans</span></h4>
                </div>
            </div>

            {/* Additional Info */}
            <div className="grid grid-cols-2 gap-1">
                <div className="flex justify-center items-center rounded gap-2 flex-col shadow-[0_0_14px_rgba(0,0,0,0.15)] px-1 py-2">
                    <h3 className="text-sm font-normal">Age/ KM Travelled</h3>
                    <span className="text-xl  font-semibold">
                        {age}/{kmTravelled} KM
                    </span>
                </div>
                <div className="flex justify-center  flex-col">

                    <div className="p-2 shadow-[0_0_14px_rgba(0,0,0,0.15)] rounded flex-col mb-2">
                        <span className="text-sm font-normal">RO/Depot : {depot}</span>
                    </div>

                    <div className="p-2 shadow-[0_0_14px_rgba(0,0,0,0.15)] rounded flex-col">
                        <span className="text-sm font-normal">DL No. {dlNumber}</span>
                    </div>


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
                <FormButton className="flex-1">
                    Input Filled
                </FormButton>
                <FormButton className="flex-1">
                    Input Filled
                </FormButton>
            </div>
        </div>
    )
}

export default VehicleRiskCard
