import React, { useEffect, useState } from "react";
import SectionHeader from "../../../components/common/SectionHeader";
import FormInput from "../../../components/common/FormInput";
import FormButton from "../../../components/common/FormButton";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify";
import { DataGrid } from "@mui/x-data-grid";
import DatagridRowAction from "../../../components/common/DatagridRowAction";
import { __getStationMasterList } from "../../../utils/api/commonApi";

// ✅ Validation schema
const validationSchema = Yup.object({
    StationId: Yup.string().required("Station is required"),
    DashCamId: Yup.string().required("Dash Cam is required"),
    VehicleId: Yup.string().required("Vehicle is required"),
    SimCardNumber: Yup.string().required("SIM Card Number is required"),
});

const DashCamAllocate = () => {
    const [paginationModel, setPaginationModel] = useState({
        page: 0,
        pageSize: 10,
    });
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [allocation, setAllocation] = useState({
        loading: false,
        allocationList: [],
    });
    const [station,setStation] = useState({
        loading:false,
        stationList:[]
    })

    // ✅ DataGrid Columns
    const columns = [
        {
            field: "_id",
            headerName: "Sr. No",
            minWidth: 90,
            headerAlign: "center",
            align: "center",
            headerClassName: "health-table-header-style",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => {
                const rowIndex = params.api.getSortedRowIds().indexOf(params.id);
                return (
                    paginationModel.page * paginationModel.pageSize +
                    (rowIndex % paginationModel.pageSize) +
                    1
                );
            },
        },
        {
            field: "StationId",
            headerName: "Station",
            flex: 1,
            align: "center",
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.StationId || "N/A"}</span>,
        },
        {
            field: "DashCamId",
            headerName: "Dash Cam",
            flex: 1,
            align: "center",
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.DashCamId || "N/A"}</span>,
        },
        {
            field: "VehicleId",
            headerName: "Vehicle",
            flex: 1,
            align: "center",
            headerClassName: "health-table-header-style",
            renderCell: (params) => <span>{params.row?.VehicleId || "N/A"}</span>,
        },
        {
            field: "SimCardNumber",
            headerName: "SIM Card Number",
            flex: 1,
            align: "center",
            headerClassName: "health-table-header-style",
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 100,
            align: "center",
            headerAlign: "center",
            headerClassName: "health-table-header-style",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => (
                <DatagridRowAction
                    row={params.row}
                    onEdit={() => handleEdit(params.row)}
                    onDelete={() => handleDelete(params.row)}
                />
            ),
        },
    ];

      //====== function to get the station master list ======\\
    const getStationMasterList = async () => {
        try {
            setStation((prev)=>({...prev,loading:true}))
            const response = await __getStationMasterList();
            setStation((prev)=>({...prev,stationList:response,loading:false}))
        } catch (error) {
            console.error("Error fetching station master list:", error);
            setStation((prev)=>({...prev,loading:false}))
            return [];
        }
    }
    useEffect(() => {
        getStationMasterList();
    }, []);


    // ✅ Formik
    const formik = useFormik({
        initialValues: {
            StationId: "",
            DashCamId: "",
            VehicleId: "",
            SimCardNumber: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (editId) {
                // update
                setAllocation((prev) => ({
                    ...prev,
                    allocationList: prev.allocationList.map((item) =>
                        item._id === editId ? { ...item, ...values } : item
                    ),
                }));
                toast.success("Dash Cam allocation updated successfully");
                setEditId(null);
            } else {
                // add
                const newRow = { ...values, _id: Date.now().toString() };
                setAllocation((prev) => ({
                    ...prev,
                    allocationList: [...prev.allocationList, newRow],
                }));
                toast.success("Dash Cam allocation added successfully");
            }
            resetForm();
        },
    });

    // ✅ Edit handler
    const handleEdit = (row) => {
        setEditId(row._id);
        formik.setValues({
            StationId: row.StationId,
            DashCamId: row.DashCamId,
            VehicleId: row.VehicleId,
            SimCardNumber: row.SimCardNumber,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ✅ Delete handler
    const handleDelete = (row) => {
        setAllocation((prev) => ({
            ...prev,
            allocationList: prev.allocationList.filter(
                (item) => item._id !== row._id
            ),
        }));
        toast.success("Deleted successfully");
    };

    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Dash Cam Allocation"
                description="Add or update dash cam allocation with detailed fields."
            />

            {/* ---------- FORM ---------- */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Station */}
                    <FormInput
                        label="Select a Station"
                        name="StationId"
                        type="select"
                        value={formik.values.StationId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.StationId && Boolean(formik.errors.StationId)}
                        helperText={formik.touched.StationId && formik.errors.StationId}
                        options={station?.stationList}
                    />

                    {/* Dash Cam */}
                    <FormInput
                        label="Select a Dash Cam"
                        name="DashCamId"
                        type="select"
                        value={formik.values.DashCamId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.DashCamId && Boolean(formik.errors.DashCamId)}
                        helperText={formik.touched.DashCamId && formik.errors.DashCamId}
                        options={[
                            { _id: "1", lookup_value: "Dash Cam A" },
                            { _id: "2", lookup_value: "Dash Cam B" },
                        ]}
                    />

                    {/* Vehicle */}
                    <FormInput
                        label="Select a Vehicle"
                        name="VehicleId"
                        type="select"
                        value={formik.values.VehicleId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.VehicleId && Boolean(formik.errors.VehicleId)}
                        helperText={formik.touched.VehicleId && formik.errors.VehicleId}
                        options={[
                            { _id: "1", lookup_value: "Vehicle A" },
                            { _id: "2", lookup_value: "Vehicle B" },
                        ]}
                    />

                    {/* SIM Card Number */}
                    <FormInput
                        label="SIM Card Number"
                        name="SimCardNumber"
                        type="text"
                        value={formik.values.SimCardNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                            formik.touched.SimCardNumber &&
                            Boolean(formik.errors.SimCardNumber)
                        }
                        helperText={
                            formik.touched.SimCardNumber && formik.errors.SimCardNumber
                        }
                    />
                </div>
                <div className="mt-4">
                    <FormButton disable={isLoading}>
                        {isLoading
                            ? editId
                                ? "Updating..."
                                : "Adding..."
                            : editId
                                ? "Update Dash Cam Allocation"
                                : "Add Dash Cam Allocation"}
                    </FormButton>
                </div>
            </form>

            {/* ---------- DATA GRID ---------- */}
            <div className="bg-white pb-2 rounded-xl my-16" style={{ width: "100%" }}>
                <DataGrid
                    rows={allocation?.allocationList || []}
                    columns={columns}
                    loading={allocation?.loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row?._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[]}
                />
            </div>
        </div>
    );
};

export default DashCamAllocate;
