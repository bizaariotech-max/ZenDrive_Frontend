import React, { useEffect, useState } from 'react'
import ViolationHistoryCard from './ViolationHistoryCard'
import icon1 from "../../../assets/images/svg/Collisions.svg"
import icon2 from "../../../assets/images/svg/Overspeeding.svg"
import icon3 from "../../../assets/images/svg/harsh-braking.svg"
import icon4 from "../../../assets/images/svg/Cornering.svg"
import icon5 from "../../../assets/images/svg/Fatigue.svg"
import icon6 from "../../../assets/images/svg/Distraction.svg"
import icon7 from "../../../assets/images/svg/phone-callling.svg"
import { DataGrid } from '@mui/x-data-grid'
import FormInput from '../../common/FormInput'
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Button, Dialog, DialogContent, DialogTitle } from '@mui/material'
import { __postApiData } from '../../../utils/api'
import { __formatDate, } from '../../../utils/api/constantfun'

const ViolationHistory = () => {
    const [assetType, setAssetType] = useState("68cb9d1f07f450963b4cbd22")
    const [selectedViolationCategory, setSelectedViolationCategory] = useState("Choose")
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 5 });
    const [violationType, setViolationType] = useState(null)
    const [evidenceValue, setEvidenceValue] = useState(null)
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [selectedPeriod, setSelectedPeriod] = useState("This month")
    const [violationHistoryData, setViolationHistoryData] = useState({
        eventType: [
            {
                title: "Collisions",
                icon: icon1,
                eventType: [
                    "forwardCollisionAlarm",
                    "vehicleDistanceTooCloseToFrontVehicleAlarm",
                    "pedestrianCollisionAlarm",
                ]
            },
            {
                title: "Overspeeding",
                icon: icon2,
                eventType: ["overspeeding"],
            },
            {
                title: "Harsh Braking",
                icon: icon3,
                eventType: ["harshBraking"],
            },
            {
                title: "Cornering",
                icon: icon4,
                eventType: ["cornering"],
            },
            {
                title: "Fatigue",
                icon: icon5,
                eventType: ["fatigueDriving"],
            },
            {
                title: "Distraction",
                icon: icon6,
                eventType: ["distraction"],
            },
            {
                title: "Phone Calling",
                icon: icon7,
                eventType: ["phoneCalling"],
            },
        ],
        evidenceList: [],
    })
    const [formData, setFormData] = useState({
        fromDate: "",
        toDate: "",
    })

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData((prev) => ({
            ...prev,
            [name]: value ? new Date(value).toISOString() : "", // store in ISO format
        }));
    };
    const periods = ["Today", "This week", "This month"]
    const [currentEvidenceIndex, setCurrentEvidenceIndex] = useState(0);

    const handleNextEvidence = () => {
        if (currentEvidenceIndex < (evidenceValue?.length || 0) - 1) {
            setCurrentEvidenceIndex((prev) => prev + 1);
        }
    };

    const handlePrevEvidence = () => {
        if (currentEvidenceIndex > 0) {
            setCurrentEvidenceIndex((prev) => prev - 1);
        }
    };

    const columns = [
        {
            field: 'id', headerName: 'S.No.', width: 90, headerClassName: "health-table-header-style", headerAlign: "center", align: "center", sortable: false, filterable: false, disableColumnMenu: true, renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return paginationModel.page * paginationModel.pageSize + (rowIndex % paginationModel.pageSize) + 1;
            },
        },
        { field: 'dateTimeStamp', headerName: 'Date/Time', minWidth: 170, headerClassName: "health-table-header-style", renderCell: (params) => <span>{__formatDate(params.row?.dateTimeStamp) || "N/A"}</span>, },
        {
            field: 'Evidence', headerName: 'Evidence', minWidth: 170, headerClassName: "health-table-header-style", renderCell: (params) => (
                <Button variant='contained' size='small' className="cursor-pointer" sx={{ color: "white", bgcolor: "var(--primary)" }} onClick={() => {
                    setEvidenceValue(params.row.videoUrl)
                    setOpen(true);
                }} >View Evidence</Button>
            ),
        },
        { field: 'address', headerName: 'Location',minWidth: 170,flex:1,  headerClassName: "health-table-header-style", renderCell: (params) => <span>{params.row?.address || "N/A"}</span>, },
    ]

    const handleKnowMore = (violationType) => {
        let selectedViolation = violationHistoryData?.eventType?.find(v => v.title === violationType);
        setViolationType(selectedViolation);
    }

    const handleClose = () => {
        setOpen(false);
    };

    const getViolationHistoryList = async () => {
        try {
            setLoading(true);
            const res = await __postApiData("/api/v1/app/fetchViolationEvents", {
                filter: {
                    eventType: violationType?.eventType ? violationType?.eventType : {},
                    dayWise: violationType?.eventType && selectedPeriod,
                    fromDate: formData?.fromDate,
                    toDate: formData?.toDate
                },
                page: paginationModel.page + 1,
                limit: paginationModel.pageSize
            });

            if (!violationType?.eventType) {
                const eventCounts = Object.fromEntries(res?.data?.data?.eventArray || []);
                setViolationHistoryData((prevData) => ({
                    ...prevData,
                    eventType: prevData.eventType.map((item) => {
                        const count = item.eventType.reduce(
                            (acc, type) => acc + (eventCounts[type] || 0),
                            0
                        );
                        return { ...item, count };
                    }),
                }));
            } else {
                setViolationHistoryData((prevData) => ({
                    ...prevData,
                    evidenceList: res?.data?.data || [],
                    totalCount: res?.data?.totalDocuments || 0,
                }));
            }
            setLoading(false);
        } catch (error) {
            setLoading(false);
            console.log("error", error);
        }
    };


    useEffect(() => {
        getViolationHistoryList();
    }, [violationType?.eventType, paginationModel.page, paginationModel.pageSize, selectedPeriod, formData?.fromDate, formData?.toDate]);


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
                            <label key={level._id} className="flex items-center cursor-pointer">
                                <input
                                    type="radio"
                                    name="riskLevel"
                                    value={level._id}
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
                            <option disabled>Select an option</option>
                            <option value="All Drivers">All Drivers</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="flex flex-row gap-6 mb-6 overflow-auto hide-scrollbar py-4">
                {violationHistoryData?.eventType?.map((violation, index) => (
                    <ViolationHistoryCard
                        key={index}
                        icon={violation.icon}
                        title={violation.title}
                        count={violation.count || "N/A"}  // default to 0 if undefined
                        onKnowMore={() => handleKnowMore(violation.title)}
                    />
                ))}
            </div>

            {violationType && (<div className="pb-2 my-8">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 py-6">
                    <h1 className="text-3xl font-semibold">{violationType?.title} History</h1>

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

                <div className="flex justify-between flex-col md:flex-row mb-6">
                    <div className='flex md:items-end flex-col md:flex-row gap-2'>
                        <FormInput label="From" type="date" name={"fromDate"} value={formData?.fromDate ? formData.fromDate.split("T")[0] : ""} onChange={handleChange} />
                        <FormInput label="To" type="date" name={"toDate"} value={formData?.toDate ? formData.toDate.split("T")[0] : ""} onChange={handleChange} />
                        <button className='bg-primary text-white px-4 py-2 rounded-lg ' onClick={()=>{
                            setPaginationModel({ page: 0, pageSize: 5 })
                            setFormData({
                                ...formData,
                                fromDate: "",
                                toDate: ""
                            })
                        }}>Reset</button>
                    </div>
                    <FormInput label="Search" type="text" placeholder={"Search..."} />
                </div>

                <DataGrid
                    rows={violationHistoryData?.evidenceList || []}
                    columns={columns}
                    loading={loading}
                    autoHeight
                    pagination
                    paginationMode="server"
                    getRowId={(row) => row._id}
                    rowCount={violationHistoryData?.totalCount || 0}
                    pageSizeOptions={[5, 10, 20, 50]}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                />

            </div>)}

            <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
                <DialogTitle className="flex justify-between items-center">
                    <span>
                        {violationType?.title} Evidence{" "}
                        {evidenceValue?.length > 0 &&
                            `(${currentEvidenceIndex + 1} / ${evidenceValue.length})`}
                    </span>
                    <IconButton onClick={handleClose} size="small">
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent className="flex flex-col items-center">
                    {evidenceValue?.length > 0 ? (
                        <>
                            <video
                                key={currentEvidenceIndex}
                                width="100%"
                                height="auto"
                                controls
                                autoPlay
                            >
                                <source src={evidenceValue[currentEvidenceIndex]} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>

                            {/* Navigation buttons */}
                            <div className="flex justify-between w-full mt-4">
                                <Button
                                    variant="outlined"
                                    onClick={handlePrevEvidence}
                                    disabled={currentEvidenceIndex === 0}
                                >
                                    Previous
                                </Button>
                                <Button
                                    variant="outlined"
                                    onClick={handleNextEvidence}
                                    disabled={currentEvidenceIndex === evidenceValue.length - 1}
                                >
                                    Next
                                </Button>
                            </div>
                        </>
                    ) : (
                        <p>No evidence available</p>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}

export default ViolationHistory
