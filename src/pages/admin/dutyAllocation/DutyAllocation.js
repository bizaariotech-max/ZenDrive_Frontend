import React, { useEffect, useState } from 'react'
import SectionHeader from '../../../components/common/SectionHeader'
import FormInput from '../../../components/common/FormInput'
import FormButton from '../../../components/common/FormButton'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { __postApiData } from '../../../utils/api'
import { toast } from 'react-toastify'
import { DataGrid } from '@mui/x-data-grid'
import DatagridRowAction from '../../../components/common/DatagridRowAction'


const validationSchema = Yup.object({
    RouteId: Yup.string().required("Route is required"),
    DateOfTrip: Yup.date().required("Date of Trip is required"),
    StartTimeOfTrip: Yup.string().required("Start time is required"),
    VehicleId: Yup.string().required("Vehicle is required"),
    DriverId: Yup.string().required("Driver is required"),
    ConductorId: Yup.string().required("Conductor is required"),
})

const DutyAllocation = () => {
    const [paginationModel, setPaginationModel] = useState({ page: 0, pageSize: 10 });
    const [isLoading, setIsLoading] = useState(false);
    const [editId, setEditId] = useState(null);
    const [routeData, setRouteData] = useState({
        loading: false,
        routeList: [],
    });
    const [dutty, setDuty] = useState({
        loading: false,
        dutyAllocationList: [],
    })

    const columns = [
        {
            field: "_id",
            headerName: "Sr. No",
            minWidth: 90,
            align: "center",
            headerClassName: "health-table-header-style",
            align: "center",
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
            field: "RouteId",
            headerName: "Route",
            flex: 1,
            headerClassName: "health-table-header-style",
            align: "center",
            renderCell: (params) => (
                <span>{params.row?.RouteId || "N/A"}</span>
            ),
        },
        {
            field: "DateOfTrip",
            headerName: "Date of Trip",
            flex: 1,
            headerClassName: "health-table-header-style",
            align: "center",
        },
        {
            field: "StartTimeOfTrip",
            headerName: "Start Time",
            flex: 1,
            headerClassName: "health-table-header-style",
            align: "center",
        },
        {
            field: "VehicleId",
            headerName: "Vehicle",
            headerClassName: "health-table-header-style",
            align: "center",
            flex: 1,
        },
        {
            field: "DriverId",
            headerName: "Driver",
            headerClassName: "health-table-header-style",
            align: "center",
            flex: 1,
        },
        {
            field: "ConductorId",
            headerName: "Conductor",
            headerClassName: "health-table-header-style",
            align: "center",
            flex: 1,
        },
        {
            field: "actions",
            headerName: "Actions",
            flex: 1,
            minWidth: 100,
            headerClassName: "health-table-header-style",
            align: "center",
            headerAlign: "center",
            sortable: false,
            filterable: false,
            disableColumnMenu: true,
            renderCell: (params) => <DatagridRowAction row={params.row} onEdit={() => handleEdit(params.row)} onDelete={() => handleDelete(params.row)} />,
        }

    ];
    const formik = useFormik({
        initialValues: {
            RouteId: "",
            DateOfTrip: "",
            StartTimeOfTrip: "",
            VehicleId: "",
            DriverId: "",
            ConductorId: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { resetForm }) => {
            if (editId) {
                // update existing row
                setDuty((prev) => ({
                    ...prev,
                    dutyAllocationList: prev.dutyAllocationList.map((item) =>
                        item._id === editId ? { ...item, ...values } : item
                    ),
                }));
                toast.success("Duty allocation updated successfully");
                setEditId(null);
            } else {
                // add new row
                const newRow = {
                    ...values,
                    _id: Date.now().toString(),
                };
                setDuty((prev) => ({
                    ...prev,
                    dutyAllocationList: [...prev.dutyAllocationList, newRow],
                }));
                toast.success("Duty allocation added successfully");
            }
            resetForm();
        },
    });

    //============== Function to get the list of route master ============\\
    const getRouteMasterList = async () => {
        try {
            setRouteData((prevData) => ({ ...prevData, loading: true }));
            const res = await __postApiData('/api/v1/admin/GetRoute');
            if (res.response && res.response.response_code === "200") {
                setRouteData((prevData) => ({
                    ...prevData,
                    routeList: res?.data?.map(item => ({ lookup_value: item?.StationId?.StationName, ...item })) || [],
                }));
            } else {
                toast.error(res.response ? res.response?.response_message : "Failed to fetch data");
            }
        } catch (err) {
            toast.error("Failed to fetch data");
        } finally {
            setRouteData((prevData) => ({ ...prevData, loading: false }));
        }
    }
    useEffect(() => {
        getRouteMasterList();
    }, []);

    // ======== Edit handler =========
    const handleEdit = (row) => {
        setEditId(row._id);
        formik.setValues({
            RouteId: row.RouteId,
            DateOfTrip: row.DateOfTrip,
            StartTimeOfTrip: row.StartTimeOfTrip,
            VehicleId: row.VehicleId,
            DriverId: row.DriverId,
            ConductorId: row.ConductorId,
        });
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // ======== Delete handler =========
    const handleDelete = (row) => {
        setDuty((prev) => ({
            ...prev,
            dutyAllocationList: prev?.dutyAllocationList.filter(
                (item) => item._id !== row._id
            ),
        }));
        toast.success("Deleted successfully");
    };
    return (
        <div className="p-4 bg-white">
            <SectionHeader
                title="Duty Allocation"
                description="Add or update duty allocation with detailed fields."
            />

            {/* ---------- FORM ---------- */}
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 mt-8 shadow-lg rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Route selection */}
                    <FormInput
                        label="Select a route"
                        name="RouteId"
                        type='select'
                        value={formik.values.RouteId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.RouteId && Boolean(formik.errors.RouteId)}
                        helperText={formik.touched.RouteId && formik.errors.RouteId}
                        options={routeData?.routeList}
                    />

                    {/* Date of Trip */}
                    <FormInput
                        label="Date of Trip"
                        name="DateOfTrip"
                        type="date"
                        value={formik.values.DateOfTrip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.DateOfTrip && Boolean(formik.errors.DateOfTrip)}
                        helperText={formik.touched.DateOfTrip && formik.errors.DateOfTrip}
                    />

                    {/* ===== Start Time of Trip ====*/}
                    <FormInput
                        label="Start Time of Trip"
                        name="StartTimeOfTrip"
                        type="time"
                        value={formik.values.StartTimeOfTrip}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.StartTimeOfTrip && Boolean(formik.errors.StartTimeOfTrip)}
                        helperText={formik.touched.StartTimeOfTrip && formik.errors.StartTimeOfTrip}
                    />

                    {/* selection a Vehicle */}
                    <FormInput
                        label="Select a vehicle"
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

                    {/* Selection a Driver */}
                    <FormInput
                        label="Select a driver"
                        name="DriverId"
                        type="select"
                        value={formik.values.DriverId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.DriverId && Boolean(formik.errors.DriverId)}
                        helperText={formik.touched.DriverId && formik.errors.DriverId}
                        options={[
                            { _id: "1", lookup_value: "Driver A" },
                            { _id: "2", lookup_value: "Driver B" },
                        ]}
                    />

                    {/* Selection a Conductor */}
                    <FormInput
                        label="Select a conductor"
                        name="ConductorId"
                        type="select"
                        value={formik.values.ConductorId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.ConductorId && Boolean(formik.errors.ConductorId)}
                        helperText={formik.touched.ConductorId && formik.errors.ConductorId}
                        options={[
                            { _id: "1", lookup_value: "conductor A" },
                            { _id: "2", lookup_value: "conductor B" },
                        ]}
                    />

                </div>
                <div className="mt-4">
                    <FormButton disable={isLoading}>
                        {isLoading ? (editId ? "Updating..." : "Adding...") : editId ? "Update Duty Allocation" : "Add Duty Allocation"}
                    </FormButton>
                </div>
            </form>
            <div className="bg-white pb-2 rounded-xl my-16 " style={{ width: '100%' }}>
                <DataGrid
                    rows={dutty?.dutyAllocationList || []}
                    columns={columns}
                    loading={dutty?.loading}
                    autoHeight
                    pagination
                    getRowId={(row) => row?._id}
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[]}
                />

            </div>
        </div>
    )
}

export default DutyAllocation